package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.models.RefreshTokenModel;
import com.example.backend.services.RefreshTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("auth")
public class RefreshTokenController {
    private final RefreshTokenService service ;


    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResp<String>> refreshToken(Authentication authentication) {
        try {
            // Get the current user details from the Authentication object
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // You'll need to modify your generateNewAccessToken method to accept UserDetails
            String newAccessToken = service.generateNewAccessToken(userDetails);

            // Assuming ApiResp is your custom response wrapper
            return ResponseEntity.ok(
                    new ApiResp<>(
                            HttpStatus.OK.value(),
                            "Token refreshed successfully",
                            newAccessToken
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), null));
        }
    }
}
