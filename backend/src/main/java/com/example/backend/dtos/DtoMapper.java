package com.example.backend.dtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PembeliModel;
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
}