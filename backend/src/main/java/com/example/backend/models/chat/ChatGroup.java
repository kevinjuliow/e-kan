package com.example.backend.models.chat;

import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CHATGROUP")
public class ChatGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "penjual_id")
    private PenjualModel penjual;

    @ManyToOne
    @JoinColumn(name = "pembeli_id")
    private PembeliModel pembeli;

    @CreationTimestamp
    @Column(updatable = false)
    private Date createdAt;

    @OneToMany(mappedBy = "chatGroup", cascade = CascadeType.ALL, orphanRemoval = true , fetch = FetchType.EAGER)
    private List<ChatMessage> messages = new ArrayList<>();

    @Column
    private boolean isStarted = false;
}
