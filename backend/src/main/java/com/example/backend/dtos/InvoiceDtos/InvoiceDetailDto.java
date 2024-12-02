package com.example.backend.dtos.InvoiceDtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class InvoiceDetailDto {
    private UUID id_invoice_detail;
    private ItemDto item;
    private int jumlahItem;
    private Double harga;
}
