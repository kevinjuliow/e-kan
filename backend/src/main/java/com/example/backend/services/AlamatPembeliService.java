package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
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
        return repo.findByPembeli(id).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found")
        );
    }

    public AlamatPembeliModel saveAlamat(AlamatPembeliModel input) {
        return repo.save(input);
    }

    public AlamatPembeliModel getById (UUID id ) {
        return repo.findById(id).orElseThrow(
                ()-> new GlobalExceptionHandler.ResourceNotFoundException("alamat id not found")
        );
    }

    public AlamatPembeliModel update(AlamatPembeliModel input, UUID id) {
        AlamatPembeliModel existingAlamat = repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Alamat ID not found")
        );

        if (!existingAlamat.getAlamat_lengkap().equals(input.getAlamat_lengkap())) {
            existingAlamat.setAlamat_lengkap(input.getAlamat_lengkap());
        }
        if (!existingAlamat.getKode_pos().equals(input.getKode_pos())) {
            existingAlamat.setKode_pos(input.getKode_pos());
        }
        if (!existingAlamat.getKabupaten().equals(input.getKabupaten())) {
            existingAlamat.setKabupaten(input.getKabupaten());
        }
        if (!existingAlamat.getProvinsi().equals(input.getProvinsi())) {
            existingAlamat.setProvinsi(input.getProvinsi());
        }
        if (!existingAlamat.getKecamatan().equals(input.getKecamatan())) {
            existingAlamat.setKecamatan(input.getKecamatan());
        }
        if (!existingAlamat.getRT().equals(input.getRT())) {
            existingAlamat.setRT(input.getRT());
        }
        if (!existingAlamat.getRW().equals(input.getRW())) {
            existingAlamat.setRW(input.getRW());
        }
        if (input.getKeterangan() != null && !input.getKeterangan().equals(existingAlamat.getKeterangan())) {
            existingAlamat.setKeterangan(input.getKeterangan());
        }

        return repo.save(existingAlamat);
    }

    public void delete (UUID id) {
        AlamatPembeliModel existingAlamat = repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Alamat ID not found")
        );

        repo.delete(existingAlamat);
    }

}
