package com.example.backend.dtos.itemDtos;

import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.models.PenjualModel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class ItemDto {
    private UUID id_item ;
    private String nama ;
    private String jenis_habitat ;
    private String jenis_bibit ;
    private Double harga ;
    private PenjualDto penjual ;


    public void setPenjualDto(PenjualModel penjualModel) {
        this.penjual = new PenjualDto(
                penjualModel.getId_penjual(),
                penjualModel.getNama(),
                penjualModel.getEmail(),
                penjualModel.getWebsite(),
                penjualModel.getAlamat(),
                penjualModel.getNo_telp(),
                penjualModel.getCreatedAt(),
                penjualModel.getUpdatedAt()
        );
    }
}

