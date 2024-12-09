package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.InvoiceDtos.InvoiceDto;
import com.example.backend.dtos.midtransDtos.PaymentResultDto;
import com.example.backend.models.InvoiceModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.PaymentService;
import com.example.backend.services.InvoiceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/payment")
@AllArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final InvoiceService invoiceService;
    private final DtoMapper mapper ;

    @PostMapping("/create/{invoiceId}")
    public ResponseEntity<ApiResp<Object>> createTransaction(@PathVariable UUID invoiceId) {
        try {
            InvoiceModel nota = invoiceService.getTransactionById(invoiceId);

            Object midtransResponse = paymentService.createTransaction(nota);
            Map<String, Object> responseMap = (Map<String, Object>) midtransResponse;
            String url = (String) responseMap.get("redirect_url");
            String token = (String) responseMap.get("token");
            invoiceService.updatePaymentUrlAndToken(nota , url , token);

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
            Object midtransResponse = paymentService.getPaymentStatus(invoiceId);
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


    @PostMapping("/verify")
    public ResponseEntity<ApiResp<InvoiceDto>> verifyAndUpdatePayment(@RequestBody @Valid PaymentResultDto paymentResult) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
                if (paymentResult.getTransaction_status().equals("settlement") && paymentResult.getStatus_code() == 200) {
                    InvoiceModel invoice = invoiceService.markInvoiceAsPaid(paymentResult.getOrder_id() , currentUser);
                    return ResponseEntity.ok(new ApiResp<>(
                            HttpStatus.OK.value(),
                            "Payment Success and invoice is updated" ,
                            mapper.toInvoiceDto(invoice)
                    ));
                } else {
                    return ResponseEntity.badRequest().body(new ApiResp<>(
                            HttpStatus.BAD_REQUEST.value(),
                            "Payment not successfull",
                            null
                    ));
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}