package com.example.backend.repositories;

import com.example.backend.models.RefreshTokenModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepo extends JpaRepository<RefreshTokenModel , UUID> {
    Optional<RefreshTokenModel> findByToken (String token);
    Optional<RefreshTokenModel> findByUsernameAndUserType (String username , String userType);
}
