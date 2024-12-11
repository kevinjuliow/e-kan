package com.example.backend.repositories.chat;

import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.models.chat.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatGroupRepo extends JpaRepository<ChatGroup , UUID> {
    Optional<ChatGroup> findByPenjualAndPembeli(PenjualModel penjual , PembeliModel pembeli);
    List<ChatGroup> findByPenjual(PenjualModel penjual);
    List<ChatGroup> findByPembeli(PembeliModel pembeli);
}
