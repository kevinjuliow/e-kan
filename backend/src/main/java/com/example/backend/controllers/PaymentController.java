package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.models.InvoiceModel;
import com.example.backend.services.MidtransService;
import com.example.backend.services.InvoiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/payment")
@AllArgsConstructor
public class PaymentController {
    private final MidtransService midtransService;
    private final InvoiceService notaService;

    @PostMapping("/create/{invoiceId}")
    public ResponseEntity<ApiResp<Object>> createTransaction(@PathVariable UUID invoiceId) {
        try {
            InvoiceModel nota = notaService.getTransactionById(invoiceId);

            Object midtransResponse = midtransService.createTransaction(nota);

            return ResponseEntity.ok(new ApiResp<>(
                    HttpStatus.OK.value() ,
                    "Success create midtrans payment" ,
                    midtransResponse
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResp<>(
                            HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Failed to create Midtrans transaction: " + e.getMessage(),
                            null
                    ));
        }
    }


    @GetMapping("/{invoiceId}/status")
    public ResponseEntity<ApiResp<Object>> getPaymentStatus (@PathVariable UUID invoiceId) {
        try {
            Object midtransResponse = midtransService.getPaymentStatus(invoiceId);
            return ResponseEntity.ok(new ApiResp<>(
             HttpStatus.OK.value() ,
             "Success retrieve payment status" ,
                    midtransResponse
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResp<>(
                     HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            "Failed to see status Pembayaran : " + e.getMessage()  ,
                            null
                    ));
        }
    }
}