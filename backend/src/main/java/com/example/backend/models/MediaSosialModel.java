package com.example.backend.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "media_sosial")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MediaSosialModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_media_sosial ;

    @NotNull
    private String platform;
    @NotNull
    private String nama_akun ;

    private String url ;

    @ManyToOne
    @JoinColumn(name = "penjual_id")
    private PenjualModel penjual ;
}
