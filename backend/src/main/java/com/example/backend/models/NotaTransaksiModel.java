package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@Data
@Entity
@Builder
@NoArgsConstructor
public class NotaTransaksiModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id;

    @CreationTimestamp
    @Column(updatable = false, name = "tanggal_pembelian")
    private Date tanggal_pembelian ;

}
