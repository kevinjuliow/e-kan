package com.example.backend.models;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Table(name = "item")
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ItemModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true)
    private UUID id_item ;

    @NotNull
    private String nama ;
    @NotNull
    private String jenis_habitat ;
    @NotNull
    private String jenis_bibit ;
    @NotNull
    private Double harga ;
    @NotNull
    private String tipe_penjualan;

    private String ukuran_ikan;

    private int stock = 0;

    @Column(columnDefinition = "LONGTEXT")
    private String description ;

    @ManyToOne
    @JoinColumn(name = "penjual_id")
    private PenjualModel penjual ;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    public void reduceStock(int quantity) {
        if (stock < quantity) {
            throw new GlobalExceptionHandler.InvalidDataException("Stock tidak mencukupi");
        }
        stock -= quantity;
    }
}
