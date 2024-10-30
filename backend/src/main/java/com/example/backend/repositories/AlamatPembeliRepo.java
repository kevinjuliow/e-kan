package com.example.backend.repositories;

import com.example.backend.models.AlamatPembeliModel;
import com.example.backend.models.PembeliModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AlamatPembeliRepo extends JpaRepository<AlamatPembeliModel , UUID> {
    Optional<List<AlamatPembeliModel>> findByPembeli (PembeliModel pembeli);
}
