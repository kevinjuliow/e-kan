package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nota_detail_transaksi")
@Data
public class NotaDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_detail_nota_transaksi;

    @ManyToOne
    @JoinColumn(name = "id_nota_transaksi", nullable = false)
    @JsonIgnore
    private NotaTransaksiModel notaTransaksi;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemModel item;

    private int jumlahItem;
    private Double harga;
}
