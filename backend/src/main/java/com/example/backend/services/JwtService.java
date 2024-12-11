package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    @Autowired
    PenjualRepo penjualRepo ;

    @Autowired
    PembeliRepo pembeliRepo ;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        extraClaims.put("userType", getUserType(userDetails));
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token) && isUserTypeValid(token, userDetails);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String getUserType(UserDetails userDetails) {
        if (userDetails instanceof PembeliModel) {
            return "PEMBELI";
        } else if (userDetails instanceof PenjualModel) {
            return "PENJUAL";
        }
        throw new IllegalArgumentException("Unknown user type");
    }

    public String extractUserType(String token) {
        return extractClaim(token, claims -> claims.get("userType", String.class));
    }

    private boolean isUserTypeValid(String token, UserDetails userDetails) {
        String tokenUserType = extractUserType(token);
        String actualUserType = getUserType(userDetails);
        return tokenUserType.equals(actualUserType);
    }

    public String extractUsernameFromExpiredToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            return e.getClaims().getSubject();
        }
    }

    public Object validateWebSocketToken(String token) {
        try {
            if (token == null || token.isEmpty()) {
                throw new GlobalExceptionHandler.UnauthorizedAccessException("Token is null or empty");
            }

            String username = extractUsername(token);

            // Determine user type
            String userType = extractUserType(token);

            if ("PENJUAL".equals(userType)) {
                // Assuming you have a PenjualRepository or Service
                PenjualModel penjual = penjualRepo.findByEmail(username)
                        .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Penjual not found"));

                // Additional token validation
                if (!isTokenValid(token, penjual)) {
                    throw new GlobalExceptionHandler.UnauthorizedAccessException("Invalid token for Penjual");
                }

                return penjual;
            } else if ("PEMBELI".equals(userType)) {
                // Assuming you have a PembeliRepository or Service
                PembeliModel pembeli = pembeliRepo.findByEmail(username)
                        .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found"));

                // Additional token validation
                if (!isTokenValid(token, pembeli)) {
                    throw new GlobalExceptionHandler.UnauthorizedAccessException("Invalid token for Pembeli");
                }

                return pembeli;
            } else {
                throw new GlobalExceptionHandler.UnauthorizedAccessException("Unknown user type");
            }
        } catch (Exception e) {
            throw new GlobalExceptionHandler.UnauthorizedAccessException("Token validation failed: " + e.getMessage());
        }
    }
}