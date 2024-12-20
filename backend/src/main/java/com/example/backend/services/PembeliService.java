package com.example.backend.services;

import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.PembeliRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PembeliService {
    @Autowired
    private PembeliRepo repo ;


   public List<PembeliModel> get () {
       return repo.findAll();
   }

   public PembeliModel update (RegisterPembeliDto body , UUID id ) {
           PembeliModel existingPembeli = repo.findById(id).orElseThrow(
                   ()-> new ResponseStatusException(HttpStatus.NOT_FOUND , "Pembeli Not FOund")
           );
           if(body.getEmail() != null) {
               throw new ResponseStatusException(HttpStatus.BAD_REQUEST , "Email Cannot be change");
           }
           if (body.getNama() != null && !body.getNama().equals(existingPembeli.getNama())) {
               existingPembeli.setNama(body.getNama());
           }
           if (body.getPassword() != null && !body.getPassword().equals(existingPembeli.getPassword())) {
               existingPembeli.setPassword(body.getPassword());
           }
           if (body.getTanggal_lahir() != null && !body.getTanggal_lahir().equals(existingPembeli.getTanggal_lahir())) {
               existingPembeli.setTanggal_lahir(body.getTanggal_lahir());
           }
           if (body.getNo_telp() != null && !body.getNo_telp().equals(existingPembeli.getNo_telp())) {
               existingPembeli.setNo_telp(body.getNo_telp());
           }

           return repo.save(existingPembeli);
   }

    public PembeliModel getById(UUID id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Pembeli with id " + id + " not found"
                ));
    }

}
