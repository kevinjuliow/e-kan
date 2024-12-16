package com.example.backend.dtos.alamatDtos;

import com.example.backend.dtos.pembeliDtos.PembeliDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class AlamatPembeliDto {
    private UUID id_alamat ;
    private String alamat_lengkap ;
    private String kode_pos ;
    private String kecamatan ;
    private String provinsi ;
    private String kabupaten ;
    private String keterangan ;
    private String RT ;
    private String RW ;

    private PembeliDto pembeli ;
}
