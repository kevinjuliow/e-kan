package com.example.backend.dtos.pembeliDtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PembeliModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PembeliDto {
    private UUID id_pembeli ;
    private String nama ;
    private String email ;
    private Date tanggal_lahir ;
    private String no_telp ;
    private Date createdAt ;
    private Date updatedAt ;

}


