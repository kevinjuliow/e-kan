package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.ItemRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ItemService {
    private final ItemRepo repo ;


    public List<ItemModel> getAllItems() {
        return repo.findAll();
    }

    public ItemModel getByID(UUID id) {
        Optional<ItemModel> items = repo.findById(id) ;
        if (items.isPresent()) {
            return items.get() ;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND , "Items Not Found");
    }

    public ItemModel saveItem(ItemModel input) {
        return repo.save(input);
    }

    public ItemModel getById(UUID id) {
        return repo.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Item not found with id: " + id));
    }

    public ItemModel updateItem(ItemModel input , UUID id) {
        ItemModel existingItem = repo.findById(id).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Item not found with id: " + id)
        );
        if (input.getPenjual() == null ||
                existingItem.getPenjual() == null ||
                !input.getPenjual().getId_penjual().equals(existingItem.getPenjual().getId_penjual())) {
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
        return repo.save(existingItem);
    }
}
