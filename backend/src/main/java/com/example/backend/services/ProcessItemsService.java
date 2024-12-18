package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.*;
import com.example.backend.repositories.InvoiceRepo;
import com.example.backend.repositories.ProcessItemsRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProcessItemsService {

    private final InvoiceRepo invoiceRepo;
    private final ProcessItemsRepo processItemsRepo ;

    @Transactional
    public List<ProcessItemsModel> getAllProcessedItems(PenjualModel penjual) {
      return processItemsRepo.findAllByItemModel_PenjualOrderByIdInvoice(penjual)
              .orElseThrow(()-> new GlobalExceptionHandler.ResourceNotFoundException("This penjual have no items to be processed"));
    }


    @Transactional
    public void saveAllPaidItems(UUID idInvoice) {
        InvoiceModel invoice = invoiceRepo.findByIdInvoiceAndStatus(idInvoice , "PAID")
                .orElseThrow(()-> new GlobalExceptionHandler.ResourceNotFoundException("Invoice not found / invoice not yet been paid"));


        List<ProcessItemsModel> processItems = invoice.getInvoiceDetails().stream().map(detail -> {

            ProcessItemsModel processItem = new ProcessItemsModel();
            processItem.setIdInvoice(invoice.getIdInvoice());
            processItem.setPembeliModel(invoice.getPembeli());
            processItem.setItemModel(detail.getItem());

            return processItem;

        }).collect(Collectors.toList());
        processItemsRepo.saveAll(processItems);
    }


    @Transactional
    public void deleteAllByIdInvoice(UUID idInvoice) {
        processItemsRepo.findAllByIdInvoice(idInvoice).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("invoice not found")
        );
        processItemsRepo.deleteAllByIdInvoice(idInvoice);
    }

    @Transactional
    public List<ProcessItemsModel> updateDeliveryByIdInvoice(UUID idInvoice , PenjualModel penjualModel) {
        List<ProcessItemsModel> processItemsList = processItemsRepo.findAllByIdInvoiceAndItemModel_Penjual(idInvoice , penjualModel)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Invoice not found"));

        processItemsList.forEach(processItemsModel -> processItemsModel.setDelivered(true));

        return processItemsRepo.saveAll(processItemsList);
    }

}
