package com.example.backend.dtos.itemDtos;

import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.models.PenjualModel;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
public class ItemDto {
    private UUID id_item ;
    @NotNull
    private String nama ;
    @NotNull
    private String jenis_habitat ;
    @NotNull
    private String jenis_bibit ;
    @NotNull
    private Double harga ;

    private int stock ;
    private String tipe_penjualan ;

    private String ukuran_ikan ;

    private String description ;

    private PenjualDto penjual ;

}

