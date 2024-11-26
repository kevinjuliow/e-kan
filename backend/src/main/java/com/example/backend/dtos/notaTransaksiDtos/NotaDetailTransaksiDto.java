package com.example.backend.dtos.notaTransaksiDtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class NotaDetailTransaksiDto {
    private UUID idNotaDetail;
    private ItemDto item;
    private int jumlahItem;
    private Double harga;
}
