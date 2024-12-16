package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "refresh_token")
public class RefreshTokenModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_refresh_token;

    @Column(unique = true , nullable = false)
    private String token ;

    @Column
    private String username ;

    @Column(nullable = false)
    private String userType ;

    @Column(nullable = false)
    private Instant expiryDate;

    @Column
    private boolean revoked = false;
}
