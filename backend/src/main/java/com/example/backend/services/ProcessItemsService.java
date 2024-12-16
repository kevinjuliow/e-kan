package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.InvoiceDetailModel;
import com.example.backend.models.InvoiceModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.models.ProcessItemsModel;
import com.example.backend.repositories.InvoiceRepo;
import com.example.backend.repositories.ProcessItemsRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProcessItemsService {

    private final InvoiceRepo invoiceRepo;
    private final ProcessItemsRepo processItemsRepo ;

    @Transactional
    public List<ProcessItemsModel> getAllProcessedItems(PenjualModel penjual) {
        List<InvoiceModel> invoices = invoiceRepo.findInvoicesByItemPenjualAndStatus(
                penjual,
                "PAID"
        );

        List<ProcessItemsModel> processItemsList = new ArrayList<>();

        for (InvoiceModel invoice : invoices) {
            List<InvoiceDetailModel> filteredDetails = invoice.getInvoiceDetails().stream()
                    .filter(detail -> detail.getItem().getPenjual().getIdPenjual().equals(penjual.getIdPenjual()))
                    .toList();

            // Create a ProcessItemsModel for each filtered item
            for (InvoiceDetailModel detail : filteredDetails) {
                ProcessItemsModel processItem = ProcessItemsModel.builder()
                        .idInvoice(invoice.getIdInvoice())
                        .pembeliModel(invoice.getPembeli())
                        .itemModel(detail.getItem())
                        .build();

                processItemsList.add(processItem);
            }
        }

        processItemsRepo.saveAll(processItemsList);

        return processItemsList;
    }


    @Transactional
    public void deleteAllByIdInvoice(UUID idInvoice) {
        processItemsRepo.findAllByIdInvoice(idInvoice).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("invoice not found")
        );
        processItemsRepo.deleteAllByIdInvoice(idInvoice);
    }
}
