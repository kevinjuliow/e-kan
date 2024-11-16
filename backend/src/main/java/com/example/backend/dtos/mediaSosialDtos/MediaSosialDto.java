package com.example.backend.dtos.mediaSosialDtos;

import com.example.backend.dtos.penjualDtos.PenjualDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MediaSosialDto {
    private UUID id_media_sosial ;
    private String platform ;
    private String nama_akun ;
    private String url ;

    private PenjualDto penjual;
}
