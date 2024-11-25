package com.example.backend.repositories;

import com.example.backend.models.NotaTransaksiModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotaTransaksiRepo extends JpaRepository<NotaTransaksiModel , UUID> {
}
