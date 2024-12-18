package com.example.backend.dtos.chat;

import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.penjualDtos.PenjualDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class ChatGroupDto {
    private UUID id ;
    private PenjualDto penjualDto ;
    private PembeliDto pembeliDto ;
    private Date createdAt ;
    private boolean isStarted;
}
