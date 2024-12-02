package com.example.backend.dtos.InvoiceDtos;

import com.example.backend.dtos.pembeliDtos.PembeliDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class InvoiceDto {
    private UUID id_invoice;
    private PembeliDto pembeli;
    private List<InvoiceDetailDto> invoiceDetails;
    private Double totalHarga;
    private Date tanggalPembelian;
    private boolean paid;
}