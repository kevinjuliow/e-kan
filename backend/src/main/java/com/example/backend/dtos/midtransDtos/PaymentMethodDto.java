package com.example.backend.dtos.midtransDtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class PaymentMethodDto {
    private String paymentMethod;
    private String bank;
}
