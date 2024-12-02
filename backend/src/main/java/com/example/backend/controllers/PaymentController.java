package com.example.backend.controllers;

import com.example.backend.models.InvoiceModel;
import com.example.backend.services.MidtransService;
import com.example.backend.services.InvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/payment")
@AllArgsConstructor
public class PaymentController {
    private final MidtransService midtransService;
    private final InvoiceService notaService;

    @PostMapping("/create/{notaId}")
    public ResponseEntity<String> createTransaction(@PathVariable UUID notaId) {
        try {
            InvoiceModel nota = notaService.getTransactionById(notaId);

            String midtransResponse = midtransService.createTransaction(nota);

            return ResponseEntity.ok(midtransResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create Midtrans transaction: " + e.getMessage());
        }
    }
}