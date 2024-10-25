package com.example.backend.dtos.itemDtos;

import com.example.backend.models.ItemModel;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {
    public ItemDto toDto(ItemModel model) {
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
}