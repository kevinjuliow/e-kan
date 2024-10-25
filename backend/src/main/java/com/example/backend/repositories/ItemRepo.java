package com.example.backend.repositories;

import com.example.backend.models.ItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ItemRepo extends JpaRepository<ItemModel , UUID> {
}
