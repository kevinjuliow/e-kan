package com.example.backend.repositories;

import com.example.backend.models.MediaSosialModel;
import com.example.backend.models.PenjualModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MediaSosialRepo extends JpaRepository<MediaSosialModel , UUID> {
    Optional<List<MediaSosialModel>> findByPenjual (PenjualModel model );
}
