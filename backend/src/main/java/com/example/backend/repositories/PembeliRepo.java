package com.example.backend.repositories;

import com.example.backend.models.PembeliModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface PembeliRepo extends JpaRepository<PembeliModel , UUID> {

}
