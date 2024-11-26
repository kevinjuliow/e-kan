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
@Table(name = "invoice_detail")
@Data
public class InvoiceDetailModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_invoice_detail;

    @ManyToOne
    @JoinColumn(name = "id_invoice", nullable = false)
    @JsonIgnore
    private InvoiceModel invoice;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private ItemModel item;

    private int jumlahItem;
    private Double harga;
}
