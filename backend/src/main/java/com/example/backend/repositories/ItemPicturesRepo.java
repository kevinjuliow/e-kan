package com.example.backend.repositories;

import com.example.backend.models.ItemModel;
import com.example.backend.models.ItemPicturesModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface ItemPicturesRepo extends JpaRepository<ItemPicturesModel , UUID> {
    Optional<List<ItemPicturesModel>> findByItem (ItemModel item);

    @Modifying
    @Transactional
    @Query("DELETE FROM ItemPicturesModel ip WHERE ip.item.id_item = :itemId")
    void deleteByItemId(@Param("itemId") UUID itemId);
}
