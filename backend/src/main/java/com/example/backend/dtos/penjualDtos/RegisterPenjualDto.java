package com.example.backend.dtos.penjualDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
@Data
public class RegisterPenjualDto {
    @Email
    private String email ;
    @Size(min = 6 , message = "Password must be at least 6 characters")
    private String password ;
    private String nama ;
    @Size(min = 8 , max = 14)
    private String no_telp;
    private String alamat ;
    private String website ;
}
