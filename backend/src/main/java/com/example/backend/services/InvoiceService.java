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
import java.util.Optional;
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
    public InvoiceModel createTransactionFromCart(PembeliModel pembeli , AlamatPembeliModel alamat) {
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
        invoice.setAlamat(alamat);

        invoiceRepo.save(invoice);


        cartRepository.deleteByPembeli(pembeli);

        return invoice;
    }


    @Transactional
    public InvoiceModel createTransactionDirect(PembeliModel pembeli, UUID itemId, int quantity , AlamatPembeliModel alamat) {
        ItemModel item = itemRepository.findById(itemId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Item tidak ditemukan!"));

        if (item.getStock() < quantity) {
            throw new IllegalArgumentException("Stok tidak cukup untuk item: " + item.getNama());
        }

        item.reduceStock(quantity);
        itemRepository.save(item);

        InvoiceModel invoice = new InvoiceModel();
        invoice.setPembeli(pembeli);
        invoice.setAlamat(alamat);

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
        InvoiceModel invoice = invoiceRepo.findByIdInvoiceAndStatus(id , "pending").orElseThrow(
                ()-> new GlobalExceptionHandler.BadRequestException("Id not found / invoice already been paid")
        );
        invoiceRepo.delete(invoice);
    }


    @Transactional
    public void updatePaymentUrlAndToken (InvoiceModel model , String url , String token) {
        if(!url.equals("") && !token.equals("")){
            model.setPaymentUrl(url);
            model.setPaymentToken(token);
            invoiceRepo.save(model);
        }
    }

    @Transactional
    public InvoiceModel markInvoiceAsPaid (UUID id_invoice , UUID id_pembeli) {
        InvoiceModel invoice = invoiceRepo.findById(id_invoice).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Invoice not found")
        );
        if (!invoice.getPembeli().getId_pembeli().equals(id_pembeli)) {
            new GlobalExceptionHandler.UnauthorizedAccessException("Unauthorized pembeli , only owner can verify");
        }
        invoice.setStatus("paid");
        return invoice;
    }
}
