package com.example.backend.services;

import com.example.backend.models.AlamatPembeliModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.AlamatPembeliRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AlamatPembeliService {
    private final AlamatPembeliRepo repo ;

    public List<AlamatPembeliModel> findByPembeli (PembeliModel id) {
        return repo.findByPembeli(id).get();
    }

    public AlamatPembeliModel saveAlamat(AlamatPembeliModel input) {
        return repo.save(input);
    }
}
