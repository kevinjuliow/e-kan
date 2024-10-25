package com.example.backend.repositories;

import com.example.backend.models.PenjualModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface PenjualRepo extends JpaRepository<PenjualModel , UUID> {
    Optional<PenjualModel> findByEmail(String email);
}
