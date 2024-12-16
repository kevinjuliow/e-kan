package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.models.RefreshTokenModel;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
import com.example.backend.repositories.RefreshTokenRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Autowired
    private RefreshTokenRepo repo ;
    @Autowired
    private JwtService jwtService ;
    @Autowired
    private PembeliRepo pembeliRepo ;
    @Autowired
    private PenjualRepo penjualRepo ;

    @Value("${security.jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    public RefreshTokenModel createRefreshToken(UserDetails userDetails) {
        RefreshTokenModel refreshToken = new RefreshTokenModel();

        if (userDetails instanceof PembeliModel pembeli) {
            refreshToken.setUsername(pembeli.getUsername());
            refreshToken.setUserType("PEMBELI");
        } else if (userDetails instanceof PenjualModel penjual) {
            refreshToken.setUsername(penjual.getUsername());
            refreshToken.setUserType("PENJUAL");
        } else {
            throw new IllegalArgumentException("Unknown user type");
        }

        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenExpiration));

        return repo.save(refreshToken);
    }

    public String generateNewAccessToken(UserDetails userDetails) {
        RefreshTokenModel refreshToken = findOrCreateRefreshToken(userDetails);

        if (refreshToken.getExpiryDate().compareTo(Instant.now()) < 0) {
            repo.delete(refreshToken);
            throw new RuntimeException("Refresh token expired");
        }

        return jwtService.generateToken(userDetails);
    }


    private RefreshTokenModel findOrCreateRefreshToken(UserDetails userDetails) {

        String userType;
        if (userDetails instanceof PembeliModel) {
            userType =  "PEMBELI";
        }
        else if (userDetails instanceof PenjualModel) {
            userType =  "PENJUAL";
        }
        else {
            throw  new GlobalExceptionHandler.InvalidDataException("invalid user type");
        }

        Optional<RefreshTokenModel> existingToken = repo
                .findByUsernameAndUserType(userDetails.getUsername(), userType);


        if (existingToken.isPresent() &&
                existingToken.get().getExpiryDate().isAfter(Instant.now())) {
            return existingToken.get();
        }

        return createRefreshToken(userDetails);
    }


    public void revokeRefreshToken(String token) {
        RefreshTokenModel refreshToken = repo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token not found"));
        refreshToken.setRevoked(true);
        repo.save(refreshToken);
    }

}
