package com.example.backend.services;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;


@Service
public class MidtransService {
    private static final String MIDTRANS_SNAP_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions";
    private static final String SERVER_KEY = "SB-Mid-server-a_tg-5l9gBiwD01vrbWC7IjM";

    public String createTransaction(String orderId, int grossAmount) {
        // Create RestTemplate instance
        RestTemplate restTemplate = new RestTemplate();

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);

        // Create Base64 encoded Authorization
        String authString = Base64.getEncoder().encodeToString(
                (SERVER_KEY + ":").getBytes(StandardCharsets.UTF_8)
        );
        headers.set("Authorization", "Basic " + authString);

        // Prepare request body
        Map<String, Object> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", orderId);
        transactionDetails.put("gross_amount", grossAmount);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("transaction_details", transactionDetails);

        // Create HTTP Entity
        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        // Make API call
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    MIDTRANS_SNAP_URL,
                    request,
                    String.class
            );

            return response.getBody();
        } catch (Exception e) {
            // Handle exception appropriately
            throw new RuntimeException("Midtrans transaction creation failed", e);
        }
    }

}
