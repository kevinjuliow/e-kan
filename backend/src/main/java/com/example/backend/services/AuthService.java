package com.example.backend.services;

import com.example.backend.dtos.LoginDto;
import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
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
public class AuthService {
    @Autowired
    private PembeliRepo pembeliRepo;
    @Autowired
    private PenjualRepo penjualRepo;

    @Autowired
    private PasswordEncoder passwordEncoder ;
    @Autowired
    private AuthenticationManager authenticationManager ;



    //Pembeli Auth
    public PembeliModel signupPembeli(RegisterPembeliDto input) {
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

    public PembeliModel loginPembeli(LoginDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail() ,
                        input.getPassword()
                )
        );

        return pembeliRepo.findByEmail(input.getEmail())
                .orElseThrow();
    }


    //Penjual Auth
    public PembeliModel signupPenjual(RegisterPembeliDto input) {
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

    public PembeliModel loginPenjual(LoginDto input) {
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
