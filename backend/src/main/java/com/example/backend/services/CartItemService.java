package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.dtos.cartItemDtos.CartItemDto;
import com.example.backend.models.CartItemModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.CartItemRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CartItemService {
    private CartItemRepo repo ;

    public List<CartItemModel> getAll(PembeliModel model) {
        return repo.findByPembeli(model)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Not Found"));
    }

    public CartItemModel getById (UUID id ) {
        return repo.findById(id).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Cart item not found with id : " + id )
        );
    }


    public void delete (UUID id ) {
        try {
            repo.deleteById(id);
        }catch (Exception e) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("ID Not Found");
        }
    }

    public CartItemModel saveCartItem (CartItemModel model) {
        repo.findByItem(model.getItem()).ifPresent(existingItem -> {
            throw new GlobalExceptionHandler.ResourceAlreadyExistsException("Item already exists in cart");
        });
        return repo.save(model);
    }

    @Transactional
    public CartItemModel update (CartItemDto input , UUID id){
        CartItemModel existItem = repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Cart Item"));

        if (existItem.getIsChecked() != input.getIsChecked()) {
            existItem.setIsChecked(input.getIsChecked());
        }

        if ((existItem.getJumlah_item() != input.getJumlah_item()) && (input.getJumlah_item() != 0) ) {
            existItem.setJumlah_item(input.getJumlah_item());
        }
        return existItem;
    }



}
