package com.example.backend.services;

import com.example.backend.dtos.LoginPembeliDto;
import com.example.backend.dtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.PembeliRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
public class AuthPembeliService {
    @Autowired
    private PembeliRepo pembeliRepo;

    @Autowired
    private PasswordEncoder passwordEncoder ;
    @Autowired
    private AuthenticationManager authenticationManager ;


    public PembeliModel signup(RegisterPembeliDto input) {
     PembeliModel pembeli = new PembeliModel();
     pembeli.setNama(input.getNama());
     pembeli.setEmail(input.getEmail());
     pembeli.setPassword(passwordEncoder.encode(input.getPassword()));
        if (input.getNo_telp() != null && !input.getNo_telp().trim().isEmpty()) {
            pembeli.setNo_telp(input.getNo_telp().trim());
        }
        if (input.getTanggal_lahir() != null) {
            pembeli.setTanggal_lahir(input.getTanggal_lahir());
        }

     return pembeliRepo.save(pembeli);
    }


    public PembeliModel login(LoginPembeliDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail() ,
                        input.getPassword()
                )
        );

        return pembeliRepo.findByEmail(input.getEmail())
                .orElseThrow();
    }


}
