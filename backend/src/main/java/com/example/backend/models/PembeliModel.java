package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "pembeli")
public class PembeliModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private Integer id_pembeli;


    @Column(nullable = false)
    private String nama ;

    @Column(unique = true , nullable = false)
    private String email ;

    @Column(nullable = false )
    @Size(min = 6)
    private String password ;

    private Date tanggal_lahir ;

    @Size(min = 9 , max = 13)
    private String no_telp ;

}
