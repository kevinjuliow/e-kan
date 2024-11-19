package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.CartItemModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.CartItemRepo;
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


    public void delete (UUID id ) {
        try {
            repo.deleteById(id);
        }catch (Exception e) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("ID Not Found");
        }
    }

    public CartItemModel saveCartItem (CartItemModel model) {
        return repo.save(model);
    }

//    public CartItemModel update (CartItemModel input)` {
//        CartItemModel existItem = repo.findById(input.getId_cart()).orElseThrow(
//                () -> new GlobalExceptionHandler.ResourceNotFoundException("Not Found"));
//
//
//
//
//    }



}
