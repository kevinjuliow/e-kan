package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.models.chat.ChatGroup;
import com.example.backend.models.chat.ChatMessage;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
import com.example.backend.repositories.chat.ChatGroupRepo;
import com.example.backend.repositories.chat.ChatMessageRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatGroupRepo chatGroupRepository;
    private final ChatMessageRepo chatMessageRepository;
    private final PenjualRepo penjualRepository;
    private final PembeliRepo pembeliRepository ;

    @Transactional
    public ChatGroup createChatGroup(UUID penjualId, UUID pembeliId) {
        PenjualModel penjual = penjualRepository.findById(penjualId)
                .orElseThrow(()->new GlobalExceptionHandler.ResourceNotFoundException("penjual not found with id : " + penjualId));
        PembeliModel pembeli = pembeliRepository.findById(pembeliId)
                .orElseThrow(()->new GlobalExceptionHandler.ResourceNotFoundException("pembeli not found with id : " + pembeliId));
        // Check if chat group already exists
        Optional<ChatGroup> existingGroup = chatGroupRepository
                .findByPenjualAndPembeli(penjual, pembeli);

        if (existingGroup.isPresent()) {
            return existingGroup.get();
        }

        // Create new chat group
        ChatGroup chatGroup = new ChatGroup();

        chatGroup.setPenjual(penjual);
        chatGroup.setPembeli(pembeli);

        return chatGroupRepository.save(chatGroup);
    }

    @Transactional
    public ChatMessage sendMessage(UUID chatGroupId, UUID senderId, String senderType, String content) {
        // Find the chat group
        ChatGroup chatGroup = chatGroupRepository.findById(chatGroupId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Chat group not found"));

        // Create and save the message
        ChatMessage message = new ChatMessage();
        message.setChatGroup(chatGroup);
        message.setSenderId(senderId);
        message.setSenderType(senderType);
        message.setContent(content);
        message.setType(ChatMessage.MessageType.CHAT);

        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getChatMessages(UUID chatGroupId) {
        return chatMessageRepository.findByChatGroup_IdOrderByTimestampAsc(chatGroupId);
    }

    public List<ChatGroup> getUserChatGroups(UUID userId, String userType) {
        if ("PENJUAL".equals(userType)) {
            PenjualModel penjual = penjualRepository.findById(userId)
                    .orElseThrow(()->new GlobalExceptionHandler.ResourceNotFoundException("penjual not found with id : " + userId));
            return chatGroupRepository.findByPenjual(penjual);
        } else if ("PEMBELI".equals(userType)) {
            PembeliModel pembeli = pembeliRepository.findById(userId)
                    .orElseThrow(()->new GlobalExceptionHandler.ResourceNotFoundException("pembeli not found with id : " + userId));
            return chatGroupRepository.findByPembeli(pembeli);
        }
        throw new IllegalArgumentException("Invalid user type");
    }


    @Transactional
    public void validatePenjualAccessToChatGroup(UUID penjualId, UUID chatGroupId) {
        ChatGroup chatGroup = chatGroupRepository.findById(chatGroupId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Chat group not found"));

        if (!chatGroup.getPenjual().getId_penjual().equals(penjualId)) {
            throw new GlobalExceptionHandler.UnauthorizedAccessException("You do not have access to this chat group");
        }
    }

    @Transactional
    public void validatePembeliAccessToChatGroup(UUID pembeliId, UUID chatGroupId) {
        ChatGroup chatGroup = chatGroupRepository.findById(chatGroupId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Chat group not found"));

        if (!chatGroup.getPembeli().getId_pembeli().equals(pembeliId)) {
            throw new GlobalExceptionHandler.UnauthorizedAccessException("You do not have access to this chat group");
        }
    }

}
