package com.example.backend.dtos.penjualDtos;

import lombok.Data;

import java.util.Date;
@Data
public class RegisterPenjualDto {
    private String email ;
    private String password ;
    private String nama ;
    private String no_telp;
    private String alamat ;
    private String website ;
}
