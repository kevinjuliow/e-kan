package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nota_transaksi")
@Data
public class NotaTransaksiModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_nota_transaksi;

    @ManyToOne
    @JoinColumn(name = "pembeli_id", nullable = false)
    private PembeliModel pembeli;

    @OneToMany(mappedBy = "notaTransaksi", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<NotaDetailModel> notaDetails = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false, name = "tanggal_pembelian")
    private Date tanggalPembelian;

    private Double totalHarga = 0.0;

    public void calculateTotalHarga() {
        totalHarga = notaDetails.stream()
                .mapToDouble(detail -> detail.getHarga() * detail.getJumlahItem())
                .sum();
    }
}
