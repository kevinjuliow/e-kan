package com.example.backend.dtos.midtransDtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class PaymentResultDto {
    @NotNull
    private UUID order_id ;
    @NotNull
    private int status_code;
    @NotNull
    private String transaction_status ;
}
