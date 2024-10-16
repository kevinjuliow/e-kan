package com.example.backend.dtos;

import lombok.Builder;
import lombok.Data;

@Data
public class LoginResponse {
    private String token ;
    private long expiresIn;
}
