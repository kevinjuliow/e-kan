package com.example.backend.repositories;

import com.example.backend.models.InvoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceModel, UUID> {
}
