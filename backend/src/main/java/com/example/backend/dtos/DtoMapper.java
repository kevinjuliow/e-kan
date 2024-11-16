package com.example.backend.dtos;

import com.example.backend.dtos.alamatDtos.AlamatPembeliDto;
import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.dtos.mediaSosialDtos.MediaSosialDto;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.models.*;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {
    public ItemDto toItemDto(ItemModel model) {
        if (model == null) {
            return null;
        }

        ItemDto dto = new ItemDto(
                model.getId_item(),
                model.getNama(),
                model.getJenis_habitat(),
                model.getJenis_bibit(),
                model.getHarga(),
                model.getStock(),
                model.getDescription(),
                null
        );

        dto.setPenjualDto(model.getPenjual());
        return dto;
    }

    public PembeliDto toPembeliDto (PembeliModel model) {
            if (model == null) {
                return null;
            }
            PembeliDto dto = new PembeliDto(
                    model.getId_pembeli(),
                    model.getNama(),
                    model.getEmail(),
                    model.getTanggal_lahir(),
                    model.getNo_telp() ,
                    model.getCreatedAt() ,
                    model.getUpdatedAt()
            );
            return dto;
    }
    public AlamatPembeliDto toAlamatDto (AlamatPembeliModel model) {
            if (model == null) {
                return null;
            }
            AlamatPembeliDto dto = new AlamatPembeliDto(
                    model.getId_alamat(),
                    model.getAlamat_lengkap(),
                    model.getKode_pos(),
                    model.getKota(),
                    model.getProvinsi() ,
                    model.getKabupaten() ,
                    model.getKeterangan() ,
                    toPembeliDto(model.getPembeli())
            );
            return dto;
    }

    public PenjualDto toPenjualDto(PenjualModel model) {
        if (model == null) {
            return null;
        }
        PenjualDto dto = new PenjualDto(
                model.getId_penjual(),
                model.getNama(),
                model.getEmail(),
                model.getWebsite(),
                model.getAlamat(),
                model.getNo_telp() ,
                model.getCreatedAt() ,
                model.getUpdatedAt()
        );
        return dto;
    }

    public MediaSosialDto toMediaSosialDto (MediaSosialModel model) {
        if (model == null) {
            return null;
        }
        MediaSosialDto dto = MediaSosialDto.builder()
                .id_media_sosial(model.getId_media_sosial())
                .platform(model.getPlatform())
                .url(model.getUrl())
                .nama_akun(model.getNama_akun())
                .penjual(toPenjualDto(model.getPenjual())).build();

        return dto ;
    }
}