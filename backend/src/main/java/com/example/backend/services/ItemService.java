package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.repositories.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepo repo ;
    private final PenjualRepo repoPenjual ;
    private final InvoiceRepo invoiceRepo ;
    private final ItemPicturesRepo itemPicturesRepo ;
    private final CartItemRepo cartItemRepo ;


    public List<ItemModel> getAllItems() {
        return repo.findAll();
    }

    public List<ItemModel> getAllItemsByPenjual(UUID id) {
        PenjualModel penjual =  repoPenjual.findById(id).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Penjual not found with id: " + id));

        return repo.findByPenjual(penjual).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("No item found with penjual id : " + id)
        );
    }
    public ItemModel saveItem(ItemModel input) {
        return repo.save(input);
    }

    public ItemModel getById(UUID id) {
        return repo.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Item not found with id: " + id));
    }

    @Transactional
    public ItemModel updateItem(ItemModel input , UUID id) {
        ItemModel existingItem = repo.findById(id).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Item not found with id: " + id)
        );
        if (input.getPenjual() == null ||
                existingItem.getPenjual() == null ||
                !input.getPenjual().getIdPenjual().equals(existingItem.getPenjual().getIdPenjual())) {
            throw new GlobalExceptionHandler.UnauthorizedAccessException("Unauthorized - Only the owner can edit this item");
        }

        if(input.getNama() != null) {
            existingItem.setNama(input.getNama());
        }
        if(input.getJenis_habitat() != null) {
            existingItem.setJenis_habitat(input.getJenis_habitat());
        }
        if(input.getJenis_bibit() != null) {
            existingItem.setJenis_bibit(input.getJenis_bibit());
        }
        if(input.getStock() != existingItem.getStock() && input.getStock() >= 0) {
            existingItem.setStock(input.getStock());
        }
        if(input.getHarga() != null) {
            existingItem.setHarga(input.getHarga());
        }
        if(input.getTipe_penjualan() != null && !input.getTipe_penjualan().equals(existingItem.getTipe_penjualan())) {
            existingItem.setTipe_penjualan(input.getTipe_penjualan());
        }
        return repo.save(existingItem);
    }

    @Transactional
    public void deleteItem(UUID id, PenjualModel penjual) {
        ItemModel existingItem = repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Item not found with id: " + id)
        );
        if (penjual == null ||
                existingItem.getPenjual() == null ||
                !existingItem.getPenjual().getIdPenjual().equals(penjual.getIdPenjual())) {
            throw new GlobalExceptionHandler.UnauthorizedAccessException("Unauthorized - Only the owner can delete this item");
        }

        invoiceRepo.deleteInvoiceDetailsByItemId(id);
        itemPicturesRepo.deleteByItemId(id);
        cartItemRepo.deleteCartItemModelByItemId(id);

        repo.deleteById(id);
    }
}
