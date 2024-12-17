package com.example.backend.repositories;

import com.example.backend.models.PenjualModel;
import com.example.backend.models.ProcessItemsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ProcessItemsRepo extends JpaRepository<ProcessItemsModel , UUID> {
    Optional< List<ProcessItemsModel> > findAllByIdInvoice(UUID invoiceId);
    Optional< List<ProcessItemsModel> > findAllByItemModel_PenjualOrderByIdInvoice(PenjualModel penjualModel);
    void deleteAllByIdInvoice(UUID invoiceId);
}
