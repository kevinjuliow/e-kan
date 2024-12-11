package com.example.backend.dtos.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class MessageCreateRequest {

    private Long senderId;
    private Long recipientId;
    private String content;
    private Date timestamp;
    private String token;
}