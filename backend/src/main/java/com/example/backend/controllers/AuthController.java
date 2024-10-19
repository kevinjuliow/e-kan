package com.example.backend.controllers;

import com.example.backend.dtos.LoginDto;
import com.example.backend.dtos.LoginResponse;
import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.AuthService;
import com.example.backend.services.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("auth")
@RestController
@AllArgsConstructor
public class AuthController {
    @Autowired
    private JwtService jwtService ;
    @Autowired
    private AuthService authPembeliService ;

    @PostMapping("/signup")
    public ResponseEntity<PembeliModel> register (@RequestBody RegisterPembeliDto registerPembeliDto ){
        PembeliModel registeredPembeli = authPembeliService.signupPembeli(registerPembeliDto);

        return ResponseEntity.ok(registeredPembeli);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login (@RequestBody LoginDto loginPembeliDto) {
        PembeliModel authenticatedPembeli = authPembeliService.loginPembeli(loginPembeliDto);

        String jwtToken = jwtService.generateToken(authenticatedPembeli);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
