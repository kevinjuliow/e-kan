package com.example.backend.services;


import com.example.backend.dtos.midtransDtos.PaymentMethodDto;
import com.example.backend.models.InvoiceDetailModel;
import com.example.backend.models.InvoiceModel;
import com.example.backend.repositories.CartItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.*;


@Service
public class PaymentService {
    @Value("${midtrans.url}")
    private String MIDTRANS_URL;

    @Value("${midtrans.server.key}")
    private String SERVER_KEY;

    @Value("${midtrans.callback.success.url}")
    private String CALLBACK_SUCCESS_URL;

    @Value("${midtrans.callback.error.url}")
    private String CALLBACK_ERROR_URL;




    public Object createTransaction(InvoiceModel nota , PaymentMethodDto paymentMethod) {
        RestTemplate restTemplate = new RestTemplate();

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);

        // Authorization header
        String authString = Base64.getEncoder().encodeToString((SERVER_KEY + ":").getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + authString);

        // Transaction details
        Map<String, Object> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", nota.getIdInvoice().toString());
        transactionDetails.put("gross_amount", nota.getTotalHarga().intValue());


        // Callbacks
        Map<String, String> callbacks = new HashMap<>();
        callbacks.put("finish", CALLBACK_SUCCESS_URL);
        callbacks.put("error", CALLBACK_ERROR_URL);


        // Request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("transaction_details", transactionDetails);
        requestBody.put("callbacks", callbacks);

        //Payment Method
        if ("bank_transfer".equalsIgnoreCase(paymentMethod.getPaymentMethod())) {
            requestBody.put("payment_type", "bank_transfer");
            Map<String, Object> bankTransferDetails = new HashMap<>();
            bankTransferDetails.put("bank", paymentMethod.getBank());
            requestBody.put("bank_transfer", bankTransferDetails);
        }
        // HTTP Entity
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        // Make API call
        try {
            ResponseEntity<Object> response = restTemplate.postForEntity(MIDTRANS_URL, request, Object.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Midtrans transaction creation failed", e);
        }
    }

    public Object getPaymentStatus(UUID invoiceId) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);

        String authString = Base64.getEncoder().encodeToString((SERVER_KEY + ":").getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + authString);

        HttpEntity<?> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    "https://api.sandbox.midtrans.com/v2/" + invoiceId + "/status",
                    HttpMethod.GET,
                    request,
                    Object.class
            );
            return response.getBody();
        } catch (RestClientException e) {
            throw new RuntimeException("Midtrans failed to get status with id " + invoiceId, e);
        }
    }



}
