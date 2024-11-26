package com.example.backend.services;

import com.example.backend.models.*;
import com.example.backend.repositories.CartItemRepo;
import com.example.backend.repositories.ItemRepo;
import com.example.backend.repositories.NotaTransaksiRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class NotaTransaksiService {

    private final NotaTransaksiRepo notaRepository;

    private final CartItemRepo cartRepository;

    private final ItemRepo itemRepository;

    @Transactional
    public NotaTransaksiModel createTransactionFromCart(PembeliModel pembeli) {
        List<CartItemModel> cartItems = cartRepository.findByPembeliAndIsCheckedTrue(pembeli).get();

        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Keranjang kosong!");
        }

        NotaTransaksiModel nota = new NotaTransaksiModel();
        nota.setPembeli(pembeli);

        double totalHarga = 0.0;

        for (CartItemModel cartItem : cartItems) {
            ItemModel item = cartItem.getItem();

            // Update item stock
            item.reduceStock(cartItem.getJumlah_item());
            itemRepository.save(item);

            // Create NotaDetail
            NotaDetailModel detail = new NotaDetailModel();
            detail.setNotaTransaksi(nota);
            detail.setItem(item);
            detail.setJumlahItem(cartItem.getJumlah_item());
            detail.setHarga(item.getHarga());

            nota.getNotaDetails().add(detail);
            totalHarga += detail.getJumlahItem() * detail.getHarga();
        }

        nota.setTotalHarga(totalHarga);
        notaRepository.save(nota);

        // Clear the cart after transaction
        cartRepository.deleteByPembeli(pembeli);

        return nota;
    }


    @Transactional
    public NotaTransaksiModel createTransactionDirect(PembeliModel pembeli, UUID itemId, int quantity) {
        ItemModel item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("Item tidak ditemukan!"));

        if (item.getStock() < quantity) {
            throw new IllegalArgumentException("Stok tidak cukup untuk item: " + item.getNama());
        }

        item.reduceStock(quantity);
        itemRepository.save(item);

        NotaTransaksiModel nota = new NotaTransaksiModel();
        nota.setPembeli(pembeli);

        NotaDetailModel detail = new NotaDetailModel();
        detail.setNotaTransaksi(nota);
        detail.setItem(item);
        detail.setJumlahItem(quantity);
        detail.setHarga(item.getHarga());

        nota.getNotaDetails().add(detail);
        nota.setTotalHarga(detail.getJumlahItem() * detail.getHarga());
        return notaRepository.save(nota);
    }


    public NotaTransaksiModel getTransactionById(UUID id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Transaksi tidak ditemukan!"));
    }
}
