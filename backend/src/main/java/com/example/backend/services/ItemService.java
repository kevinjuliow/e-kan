package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.ItemModel;
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

}
