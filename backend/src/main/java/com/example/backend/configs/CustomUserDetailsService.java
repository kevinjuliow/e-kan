package com.example.backend.configs;

import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private PembeliRepo pembeliRepo ;
    @Autowired
    private PenjualRepo penjualRepo ;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<PembeliModel> pembeli = pembeliRepo.findByEmail(email);
        if (pembeli.isPresent()) {
            return pembeli.get();
        }

        Optional<PenjualModel> penjual = penjualRepo.findByEmail(email);
        if (penjual.isPresent()) {
            return penjual.get();
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
