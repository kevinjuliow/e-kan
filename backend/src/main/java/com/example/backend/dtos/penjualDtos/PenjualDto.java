package com.example.backend.dtos.penjualDtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PenjualDto {
    private UUID id_penjual ;
    private String nama ;
    private String email ;
    private String website ;
    private String alamat ;
    private String no_telp ;
    private Date createdAt ;
    private Date updatedAt ;
}
