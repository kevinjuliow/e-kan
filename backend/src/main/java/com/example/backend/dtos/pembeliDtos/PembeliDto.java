package com.example.backend.dtos.pembeliDtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PembeliModel;
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
public class PembeliDto {
    private UUID id_pembeli ;
    private String nama ;
    private String email ;
    private Date tanggal_lahir ;
    private String no_telp ;
    private Date createdAt ;
    private Date updatedAt ;

    private String profile_picture ;
    public PembeliDto(UUID id_pembeli, String nama, String email, Date tanggal_lahir, String no_telp, Date createdAt, Date updatedAt) {
        this.id_pembeli = id_pembeli;
        this.nama = nama;
        this.email = email;
        this.tanggal_lahir = tanggal_lahir;
        this.no_telp = no_telp;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


