package com.example.backend.services;

import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.dtos.penjualDtos.RegisterPenjualDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.repositories.PenjualRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PenjualService {

    private final PenjualRepo repo ;

    private final PasswordEncoder passwordEncoder ;

    public List<PenjualModel> get () {
        return repo.findAll();
    }

    public PenjualModel getById(UUID id ) {
        return repo.findById(id).get();
    }

    public PenjualModel update (RegisterPenjualDto body , UUID id ) {

        PenjualModel existingPembeli = repo.findById(id).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND , "Pembeli Not FOund")
        );

        if (body.getNama() != null && !body.getNama().equals(existingPembeli.getNama())) {
            existingPembeli.setNama(body.getNama());
        }
        if (body.getEmail() != null && !body.getEmail().equals(existingPembeli.getEmail())) {
            existingPembeli.setEmail(body.getEmail());
        }
        if (body.getPassword() != null && !passwordEncoder.matches(body.getPassword(), existingPembeli.getPassword())) {
            existingPembeli.setPassword(passwordEncoder.encode(body.getPassword()));
        }
        if (body.getAlamat() != null && !body.getAlamat().equals(existingPembeli.getAlamat())) {
            existingPembeli.setAlamat(body.getAlamat());
        }
        if (body.getWebsite() != null && !body.getWebsite().equals(existingPembeli.getWebsite())) {
            existingPembeli.setWebsite(body.getWebsite());
        }
        if (body.getNo_telp() != null) {
            existingPembeli.setNo_telp(body.getNo_telp());
        }
        try {
            return repo.save(existingPembeli);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to update pembeli", e);
        }
    }

}
