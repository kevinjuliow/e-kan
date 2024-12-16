package com.example.backend.models;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "alamat")
@Data
public class AlamatPembeliModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_alamat ;
    @Lob
    @Column(columnDefinition = "LONGTEXT" , nullable = false)
    private String alamat_lengkap ;
    private String kode_pos ;
    @Column(nullable = false)
    private String kabupaten ;
    @Column(nullable = false)
    private String provinsi ;
    @Column(nullable = false)
    private String kecamatan ;
    @Column
    private String RT ;
    @Column
    private String RW ;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String keterangan ;
    @ManyToOne
    @JoinColumn(name = "pembeli_id")
    private PembeliModel pembeli ;
}
