package com.example.backend.repositories;

import com.example.backend.models.InvoiceModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceModel, UUID> {
    Optional<List<InvoiceModel>> findByPembeli (PembeliModel model);
    Optional<InvoiceModel> findByIdInvoiceAndStatus(UUID idInvoice, String status);

    List<InvoiceModel> findByStatusAndTanggalPembelianBefore(
            String status,
            Date cutoffDate
    );
    @Modifying
    @Transactional
    @Query("DELETE FROM InvoiceDetailModel idm WHERE idm.item.id_item = :itemId")
    void deleteInvoiceDetailsByItemId(@Param("itemId") UUID itemId);

    @Query("SELECT DISTINCT i FROM InvoiceModel i " +
            "JOIN i.invoiceDetails id " +
            "JOIN id.item item " +
            "WHERE item.penjual = :penjual AND i.status = :status " +
            "ORDER BY i.tanggalPembelian DESC")
    List<InvoiceModel> findInvoicesByItemPenjualAndStatus(
            @Param("penjual") PenjualModel penjual,
            @Param("status") String status
    );
}
