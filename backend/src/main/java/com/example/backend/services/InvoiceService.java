package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.*;
import com.example.backend.repositories.CartItemRepo;
import com.example.backend.repositories.ItemRepo;
import com.example.backend.repositories.InvoiceRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class InvoiceService {

    private final InvoiceRepo invoiceRepo;

    private final CartItemRepo cartRepository;

    private final ItemRepo itemRepository;


    public List<InvoiceModel> getAllInvoice (PembeliModel model) {
        return invoiceRepo.findByPembeli(model).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Invoice not found with pembeli with id : " + model.getId_pembeli())
        );
    }

    @Transactional
    public InvoiceModel createTransactionFromCart(PembeliModel pembeli) {
        List<CartItemModel> cartItems = cartRepository.findByPembeliAndIsCheckedTrue(pembeli).get();

        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Keranjang kosong!");
        }

        InvoiceModel invoice = new InvoiceModel();
        invoice.setPembeli(pembeli);

        double totalHarga = 0.0;

        for (CartItemModel cartItem : cartItems) {
            ItemModel item = cartItem.getItem();

            // Update item stock
            item.reduceStock(cartItem.getJumlah_item());
            itemRepository.save(item);

            // Create NotaDetail
            InvoiceDetailModel detail = new InvoiceDetailModel();
            detail.setInvoice(invoice);
            detail.setItem(item);
            detail.setJumlahItem(cartItem.getJumlah_item());
            detail.setHarga(item.getHarga());

            invoice.getInvoiceDetails().add(detail);
            totalHarga += detail.getJumlahItem() * detail.getHarga();
        }

        invoice.setTotalHarga(totalHarga);
        invoiceRepo.save(invoice);


        cartRepository.deleteByPembeli(pembeli);

        return invoice;
    }


    @Transactional
    public InvoiceModel createTransactionDirect(PembeliModel pembeli, UUID itemId, int quantity) {
        ItemModel item = itemRepository.findById(itemId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Item tidak ditemukan!"));

        if (item.getStock() < quantity) {
            throw new IllegalArgumentException("Stok tidak cukup untuk item: " + item.getNama());
        }

        item.reduceStock(quantity);
        itemRepository.save(item);

        InvoiceModel invoice = new InvoiceModel();
        invoice.setPembeli(pembeli);

        InvoiceDetailModel detail = new InvoiceDetailModel();
        detail.setInvoice(invoice);
        detail.setItem(item);
        detail.setJumlahItem(quantity);
        detail.setHarga(item.getHarga());

        invoice.getInvoiceDetails().add(detail);
        invoice.setTotalHarga(detail.getJumlahItem() * detail.getHarga());
        return invoiceRepo.save(invoice);
    }


    public InvoiceModel getTransactionById(UUID id) {
        return invoiceRepo.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Transaksi tidak ditemukan!"));
    }

    @Transactional
    public void deleteInvoice (UUID id) {
        //Notes : Only paid=false invoices are able to be deleted
//        invoiceRepo.deleteByIdInvoiceAndPaidFalse(id);
    }
}
