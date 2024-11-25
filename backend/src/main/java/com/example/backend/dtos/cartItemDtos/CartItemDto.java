package com.example.backend.dtos.cartItemDtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class CartItemDto {
    private UUID id_cart;
    private int jumlah_item;
    private Boolean is_checked ;
    private ItemDto item ;
    private PembeliDto pembeli ;
}
