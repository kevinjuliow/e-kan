package com.example.backend.services;


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
    @Value("${midtrans.snap.url}")
    private String MIDTRANS_SNAP_URL;

    @Value("${midtrans.server.key}")
    private String SERVER_KEY;

    @Value("${midtrans.callback.success.url}")
    private String CALLBACK_SUCCESS_URL;

    @Value("${midtrans.callback.error.url}")
    private String CALLBACK_ERROR_URL;




    public Object createTransaction(InvoiceModel nota) {
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

        //item_details
        List<Map<String, Object>> itemDetailsList = new ArrayList<>();
        for (InvoiceDetailModel object : nota.getInvoiceDetails()) {
            Map<String, Object> itemDetail = new HashMap<>();
            itemDetail.put("id", object.getItem().getId_item());
            itemDetail.put("price", object.getItem().getHarga());
            itemDetail.put("quantity", object.getJumlahItem());
            itemDetail.put("name", object.getItem().getNama());
            itemDetail.put("category", object.getItem().getJenis_bibit());
            itemDetail.put("merchant_name", object.getItem().getPenjual().getNama());
            itemDetailsList.add(itemDetail);
        }
        //customer details
        Map<String, Object> customerDetails = new HashMap<>();
        customerDetails.put("first_name" , nota.getPembeli().getNama());
        customerDetails.put("email" , nota.getPembeli().getEmail());
        customerDetails.put("phone" , nota.getPembeli().getNo_telp());

        // Callbacks
        Map<String, String> callbacks = new HashMap<>();
        callbacks.put("finish", CALLBACK_SUCCESS_URL);
        callbacks.put("error", CALLBACK_ERROR_URL);

        //Shipping address
        Map<String, String> shippingAddress = new HashMap<>();
        shippingAddress.put("first_name", nota.getPembeli().getNama());
        shippingAddress.put("email", nota.getPembeli().getEmail());
        shippingAddress.put("phone", nota.getPembeli().getNo_telp());
        shippingAddress.put("address", nota.getAlamat().getAlamat_lengkap());
        shippingAddress.put("city", nota.getAlamat().getKota());
        shippingAddress.put("postal_code", nota.getAlamat().getKode_pos());


        //Billing address
        Map<String, String> billingAddress = new HashMap<>();
        shippingAddress.put("first_name", nota.getInvoiceDetails().get(0).getItem().getPenjual().getNama());
        shippingAddress.put("email",  nota.getInvoiceDetails().get(0).getItem().getPenjual().getEmail());
        shippingAddress.put("phone",  nota.getInvoiceDetails().get(0).getItem().getPenjual().getNo_telp());
        shippingAddress.put("address",  nota.getInvoiceDetails().get(0).getItem().getPenjual().getAlamat());



        // Request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("transaction_details", transactionDetails);
        requestBody.put("item_details", itemDetailsList);
        requestBody.put("customer_details", customerDetails);
        requestBody.put("callbacks", callbacks);
        requestBody.put("shipping_address", shippingAddress);
        requestBody.put("billing_address", billingAddress);



        // HTTP Entity
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        // Make API call
        try {
            ResponseEntity<Object> response = restTemplate.postForEntity(MIDTRANS_SNAP_URL, request, Object.class);
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
