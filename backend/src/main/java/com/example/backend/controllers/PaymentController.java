package com.example.backend.controllers;

import com.example.backend.services.MidtransService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    private final MidtransService midtransService ;

    @PostMapping("/create-transaction")
    public String createTransaction() {
        return midtransService.createTransaction("ORDER-101", 10000);
    }
}
