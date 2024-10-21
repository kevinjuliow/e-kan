package com.example.backend.configs;

import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
public class ApplicationConfiguration {
    @Autowired
    private PembeliRepo pembeliRepo;

    @Autowired
    private PenjualRepo penjualRepo ;

    public ApplicationConfiguration(PembeliRepo pembeliRepo) {
        this.pembeliRepo = pembeliRepo;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return email -> {
            // Check if the email belongs to Pembeli
            Optional<PembeliModel> pembeli = pembeliRepo.findByEmail(email);
            if (pembeli.isPresent()) {
                return pembeli.get();
            }

            // Check if the email belongs to Penjual (You will need PenjualRepo here)
            Optional<PenjualModel> penjual = penjualRepo.findByEmail(email);
            if (penjual.isPresent()) {
                return penjual.get();
            }

            throw new UsernameNotFoundException("User not found with email: " + email);
        };
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
