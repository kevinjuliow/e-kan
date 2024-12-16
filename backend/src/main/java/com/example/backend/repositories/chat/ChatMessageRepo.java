package com.example.backend.repositories.chat;

import com.example.backend.models.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepo extends JpaRepository<ChatMessage , UUID> {
    List<ChatMessage> findByChatGroup_IdOrderByTimestampAsc(UUID chatGroupId);
}
