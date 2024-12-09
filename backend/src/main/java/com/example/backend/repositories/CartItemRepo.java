package com.example.backend.repositories;

import com.example.backend.models.CartItemModel;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PembeliModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface CartItemRepo extends JpaRepository<CartItemModel , UUID> {
    Optional<List<CartItemModel>> findByPembeli(PembeliModel pembeli);
    Optional<CartItemModel> findByItem(ItemModel item);

    Optional<List<CartItemModel>> findByPembeliAndIsCheckedTrue(PembeliModel pembeli);

    void deleteByPembeli (PembeliModel pembeli);

    void deleteByPembeliAndIsCheckedTrue(PembeliModel pembeli);

}
