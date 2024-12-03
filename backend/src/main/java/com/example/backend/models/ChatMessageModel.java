package com.example.backend.models;

import lombok.Data;

@Data
public class ChatMessageModel {
    private String content ;

    private String sender ;

    private MessageType type ;

    public enum MessageType {
        CHAT , JOIN , LEAVE
    }
}


