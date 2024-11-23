package com.example.backend.dtos.itemPicturesDtos;

import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.models.ItemModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemPIcturesDto {
    private UUID id;

    private String fileName;

    private String fileType;

    private ItemDto item;


    private Date createdAt;


    private Date updatedAt;

    private byte[] data;
}
