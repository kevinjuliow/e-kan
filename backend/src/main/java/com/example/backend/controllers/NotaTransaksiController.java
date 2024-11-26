package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.notaTransaksiDtos.NotaTransaksiDto;
import com.example.backend.models.NotaTransaksiModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.NotaTransaksiService;
import com.example.backend.services.PembeliService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/transactions")
@AllArgsConstructor
public class NotaTransaksiController {


    private final NotaTransaksiService notaService;
    private final PembeliService pembeliService ;
    private final DtoMapper mapper ;

    @PostMapping("/cart")
    public ResponseEntity<ApiResp<NotaTransaksiModel>> checkoutFromCart() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
                PembeliModel pembeli = pembeliService.getById(currentUser.getId_pembeli());
                NotaTransaksiModel nota = notaService.createTransactionFromCart(pembeli);

                return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResp<>(
                        HttpStatus.CREATED.value(),
                        "Created Nota" ,
                        nota
                ));
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/direct")
    public ResponseEntity<ApiResp<NotaTransaksiDto>> directPurchase(
            @RequestParam UUID itemId,
            @RequestParam int quantity
    ) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
                PembeliModel pembeli = pembeliService.getById(currentUser.getId_pembeli());
                NotaTransaksiModel nota = notaService.createTransactionDirect(pembeli, itemId, quantity);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ApiResp<>(
                                HttpStatus.CREATED.value(),
                                "Created Nota" ,
                                mapper.toNotaTransaksiDto(nota)
                        )
                );
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResp<NotaTransaksiDto>> getTransaction(@PathVariable UUID id) {
        try {
            NotaTransaksiModel nota = notaService.getTransactionById(id);
            return ResponseEntity.ok(new ApiResp<>(
                    HttpStatus.OK.value(),
                    "Success retrieve nota" ,
                    mapper.toNotaTransaksiDto(nota))
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
