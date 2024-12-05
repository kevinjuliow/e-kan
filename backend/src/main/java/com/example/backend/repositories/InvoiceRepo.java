package com.example.backend.repositories;

import com.example.backend.models.InvoiceModel;
import com.example.backend.models.PembeliModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceModel, UUID> {
    Optional<List<InvoiceModel>> findByPembeli (PembeliModel model);
//    Optional<List<InvoiceModel>> findByPembeli_Id_pembeli(UUID uuid);
//    void delete(UUID idInvoice);
}
