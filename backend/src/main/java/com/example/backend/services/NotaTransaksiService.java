package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.CartItemModel;
import com.example.backend.models.NotaTransaksiModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.CartItemRepo;
import com.example.backend.repositories.NotaTransaksiRepo;
import com.example.backend.repositories.PembeliRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NotaTransaksiService {
    private final NotaTransaksiRepo repo ;
    private final CartItemRepo cartItemRepo ;
    private final PembeliRepo pembeliRepo ;

    public List<CartItemModel> getByID(UUID notaId, UUID pembeliId) {
        NotaTransaksiModel existNota = repo.findById(notaId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Nota does not exist"));

        List<CartItemModel> cartItems = cartItemRepo.findByNotaTransaksi(existNota).get();

        boolean isOwner = cartItems.stream()
                .anyMatch(item -> item.getPembeli().getId_pembeli().equals(pembeliId));

        if (!isOwner) {
            throw new GlobalExceptionHandler.UnauthorizedException("You are not authorized to access this nota");
        }
        return cartItems;
    }

    public List<NotaTransaksiModel> getAll (UUID pembeliId) {
        PembeliModel pembeli = pembeliRepo.findById(pembeliId).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("pembeli not found")
        );
        List<CartItemModel> cartItems = cartItemRepo.findByPembeli(pembeli).get();

        return cartItems.stream()
                .map(CartItemModel::getNotaTransaksi)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }


    public NotaTransaksiModel createNota (UUID pembeliId) {
        PembeliModel pembeli = pembeliRepo.findById(pembeliId).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("pembeli not found")
        );
        List<CartItemModel> checkedCartItems = cartItemRepo.findByPembeliAndIsCheckedTrue(pembeli).get();

        if (checkedCartItems.isEmpty()) {
            throw new GlobalExceptionHandler.BadRequestException("No items selected for nota");
        }

        NotaTransaksiModel newNota = NotaTransaksiModel.builder()
                .build();

        repo.save(newNota);

        checkedCartItems.forEach(item -> {
            item.setNotaTransaksi(newNota);
            item.setIsChecked(false);
        });

        cartItemRepo.saveAll(checkedCartItems);
        return newNota;
    }

}
