package com.example.backend.dtos.InvoiceDtos;

import com.example.backend.dtos.alamatDtos.AlamatPembeliDto;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.models.AlamatPembeliModel;
import jakarta.annotation.Nullable;
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
    private AlamatPembeliDto alamat ;
    private List<InvoiceDetailDto> invoiceDetails;
    private Double totalHarga;
    private Date tanggalPembelian;

    @Nullable
    private String paymentUrl ;
    @Nullable
    private String paymentToken ;

    private String status;
}