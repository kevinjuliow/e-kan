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
@Table(name = "invoice")
@Data
public class InvoiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID idInvoice;

    @ManyToOne
    @JoinColumn(name = "pembeli_id", nullable = false)
    private PembeliModel pembeli;

    @ManyToOne
    @JoinColumn(name = "alamat_id")
    private AlamatPembeliModel alamat ;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<InvoiceDetailModel> invoiceDetails = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false, name = "tanggal_pembelian")
    private Date tanggalPembelian;

    @Column
    private Double totalHarga = 0.0;

    @Column
    private String status = "pending";

    @Column
    private String paymentUrl ;
    @Column
    private String paymentToken ;

    public void calculateTotalHarga() {
        totalHarga = invoiceDetails.stream()
                .mapToDouble(detail -> detail.getHarga() * detail.getJumlahItem())
                .sum();
    }
}
