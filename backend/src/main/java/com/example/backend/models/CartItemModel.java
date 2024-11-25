package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart_item")
public class CartItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_cart;

    @Column
    private int jumlah_item = 1;

    @Column
    private Boolean isChecked = false ;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private ItemModel item ;

    @ManyToOne
    @JoinColumn(name = "pembeli_id")
    private PembeliModel pembeli ;


    @ManyToOne
    @JoinColumn(name = "nota_transkasi_id")
    private NotaTransaksiModel notaTransaksi;

}
