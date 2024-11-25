package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.cartItemDtos.CartItemDto;
import com.example.backend.models.CartItemModel;
import com.example.backend.models.NotaTransaksiModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.NotaTransaksiService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("nota")
@AllArgsConstructor
public class NotaTransaksiController {

    private final NotaTransaksiService service;

    private final DtoMapper mapper ;
    @GetMapping("/{notaId}")
    public ResponseEntity<ApiResp<List<CartItemDto>>> showNota (@PathVariable  UUID notaId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel pembeli) {
            List<CartItemModel> list = service.getByID(notaId , pembeli.getId_pembeli());

            return ResponseEntity.ok(
                    new ApiResp<>(
                            HttpStatus.OK.value(),
                            "Success Retrieve Nota",
                            list.stream().map(mapper::toCartItemDto).collect(Collectors.toList())
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResp<>(
                        HttpStatus.UNAUTHORIZED.value(),
                        "Unauthorized",
                        null
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResp<List<NotaTransaksiModel>>> indexNota () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel pembeli) {

            List<NotaTransaksiModel> listNota = service.getAll(pembeli.getId_pembeli());

            return ResponseEntity.ok(
                    new ApiResp<>(
                            HttpStatus.OK.value(),
                            "Success Retrieve Nota",
                            listNota
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResp<>(
                        HttpStatus.UNAUTHORIZED.value(),
                        "Unauthorized",
                        null
                )
        );
    }


    @PostMapping
    public ResponseEntity<ApiResp<NotaTransaksiModel>> store () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel pembeli) {
            NotaTransaksiModel nota = service.createNota(pembeli.getId_pembeli());

            return ResponseEntity.ok(
                    new ApiResp<>(
                            HttpStatus.OK.value(),
                            "Success Create nota",
                            nota
                    )
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResp<>(
                        HttpStatus.UNAUTHORIZED.value(),
                        "Unauthorized",
                        null
                )
        );
    }

}
