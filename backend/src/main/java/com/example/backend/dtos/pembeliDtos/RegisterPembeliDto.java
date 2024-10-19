package com.example.backend.dtos.pembeliDtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class RegisterPembeliDto {
    @Email
    private String email ;
    @Size(min = 6 , message = "Password must be at least 6 characters")
    private String password ;
    private String nama ;
    @Size(min = 8 , max = 14)
    private String no_telp;
    private Date tanggal_lahir;
}
