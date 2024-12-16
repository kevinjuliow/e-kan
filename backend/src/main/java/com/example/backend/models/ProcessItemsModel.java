package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProcessItemsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID idProcessItems;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pembeli_id", nullable = false)
    private PembeliModel pembeliModel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private ItemModel itemModel;

    @Column(nullable = false)
    private UUID idInvoice;
}

