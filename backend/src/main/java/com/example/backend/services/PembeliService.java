package com.example.backend.services;

import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.PembeliRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder ;

   public List<PembeliModel> get () {
       return repo.findAll();
   }

   public PembeliModel getbyid (UUID id){
      return repo.findById(id)
              .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
   }

   public void store (PembeliModel models) {
    passwordEncoder.encode(models.getPassword());
   }
}
