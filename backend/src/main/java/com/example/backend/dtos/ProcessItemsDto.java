package com.example.backend.dtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class ProcessItemsDto {

    private UUID idProcessItems;

    private PembeliDto pembeliModel;

    private ItemDto itemModel;

    private UUID idInvoice;
}
