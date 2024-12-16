package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.InvoiceDtos.InvoiceDto;
import com.example.backend.dtos.midtransDtos.PaymentMethodDto;
import com.example.backend.dtos.midtransDtos.PaymentResultDto;
import com.example.backend.dtos.midtransDtos.Va_Numbers;
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
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
    public ResponseEntity<ApiResp<Object>> createTransaction(@PathVariable UUID invoiceId , @RequestBody PaymentMethodDto paymentMethod) {
        try {
            InvoiceModel invoice = invoiceService.getTransactionById(invoiceId);

            Object midtransResponse = paymentService.createTransaction(invoice , paymentMethod);
            Map<String, Object> responseMap = (Map<String, Object>) midtransResponse;
            String status = (String) responseMap.get("transaction_status");
            String payment_type = (String) responseMap.get("payment_type");
            String transactionTime = (String) responseMap.get("transaction_time");
            Date parsedTransactionTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(transactionTime);


            List<Map<String, String>> vaNumbersList = (List<Map<String, String>>) responseMap.get("va_numbers");
            // Create Va_Numbers object from response
            Va_Numbers vaNumbers = null;
            if (vaNumbersList != null && !vaNumbersList.isEmpty()) {
                Map<String, String> vaDetails = vaNumbersList.get(0);
                vaNumbers = Va_Numbers.builder()
                        .bank(vaDetails.get("bank"))
                        .va_number(vaDetails.get("va_number"))
                        .build();
            }
            invoiceService.updatePayment(invoice , payment_type , status , vaNumbers , parsedTransactionTime);

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

    @PostMapping("/notification")
    public ResponseEntity<String> handleMidtransNotification(@RequestBody Map<String, Object> notification) {
        try {
            // Extract necessary fields from notification body
            String orderId = (String) notification.get("order_id");
            String transactionStatus = (String) notification.get("transaction_status");

            // Update the transaction in your database based on the status
            InvoiceModel invoice = invoiceService.getTransactionById(UUID.fromString(orderId));
            invoiceService.updatePaymentStatus(invoice, transactionStatus);

            return ResponseEntity.ok("Notification handled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing notification: " + e.getMessage());
        }
    }
}