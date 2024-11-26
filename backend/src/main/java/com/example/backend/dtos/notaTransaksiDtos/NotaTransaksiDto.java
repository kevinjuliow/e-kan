package com.example.backend.dtos.notaTransaksiDtos;

import com.example.backend.dtos.pembeliDtos.PembeliDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class NotaTransaksiDto {
    private UUID idNotaTransaksi;
    private PembeliDto pembeli;
    private List<NotaDetailTransaksiDto> notaDetails;
    private Double totalHarga;
    private Date tanggalPembelian;
}