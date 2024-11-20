package com.example.backend.dtos.profilePictureDtos;

import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.models.PembeliModel;
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
@Builder
@NoArgsConstructor
public class ProfilePictureDto {
    private UUID id;

    private String fileName;

    private String fileType;

    private byte[] data;

    private PembeliDto pembeli;

    private Date createdAt;

    private Date updatedAt;
}
