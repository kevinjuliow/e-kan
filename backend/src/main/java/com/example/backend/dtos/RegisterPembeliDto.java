package com.example.backend.dtos;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class RegisterPembeliDto {
    private String email ;
    private String password ;
    private String nama ;
    private String no_telp;
    private Date tanggal_lahir;

}
