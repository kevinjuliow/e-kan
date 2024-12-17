package com.example.backend.dtos.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class MessageCreateRequest {

    private UUID senderId;
    private UUID recipientId;
    private String content;
    private Date timestamp;
    private String token;
}