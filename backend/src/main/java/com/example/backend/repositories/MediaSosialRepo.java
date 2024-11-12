package com.example.backend.repositories;

import com.example.backend.models.MediaSosialModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MediaSosialRepo extends JpaRepository<MediaSosialModel , UUID> {
}
