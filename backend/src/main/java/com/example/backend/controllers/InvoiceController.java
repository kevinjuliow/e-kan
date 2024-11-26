package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.InvoiceDtos.InvoiceDto;
import com.example.backend.models.InvoiceModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.InvoiceService;
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
public class InvoiceController {


    private final InvoiceService invoiceService;
    private final PembeliService pembeliService ;
    private final DtoMapper mapper ;

    @PostMapping("/cart")
    public ResponseEntity<ApiResp<InvoiceModel>> checkoutFromCart() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
                PembeliModel pembeli = pembeliService.getById(currentUser.getId_pembeli());
                InvoiceModel nota = invoiceService.createTransactionFromCart(pembeli);

                return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResp<>(
                        HttpStatus.CREATED.value(),
                        "Created Invoice" ,
                        nota
                ));
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/direct")
    public ResponseEntity<ApiResp<InvoiceDto>> directPurchase(
            @RequestParam UUID itemId,
            @RequestParam int quantity
    ) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
                PembeliModel pembeli = pembeliService.getById(currentUser.getId_pembeli());
                InvoiceModel nota = invoiceService.createTransactionDirect(pembeli, itemId, quantity);
                return ResponseEntity.status(HttpStatus.CREATED).body(
                        new ApiResp<>(
                                HttpStatus.CREATED.value(),
                                "Created Invoice" ,
                                mapper.toInvoiceDto(nota)
                        )
                );
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<ApiResp<InvoiceDto>> getTransaction(@PathVariable UUID invoiceId) {
        try {
            InvoiceModel nota = invoiceService.getTransactionById(invoiceId);
            return ResponseEntity.ok(new ApiResp<>(
                    HttpStatus.OK.value(),
                    "Success retrieve invoice" ,
                    mapper.toInvoiceDto(nota))
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
