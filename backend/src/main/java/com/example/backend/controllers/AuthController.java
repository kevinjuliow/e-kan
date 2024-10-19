package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.LoginDto;
import com.example.backend.dtos.LoginResponse;
import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.dtos.penjualDtos.RegisterPenjualDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.AuthService;
import com.example.backend.services.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private AuthService authService;

    @PostMapping("/pembeli/signup")
    public ResponseEntity<ApiResponse<PembeliModel>> registerPembeli (@RequestBody RegisterPembeliDto registerPembeliDto ){
        PembeliModel registeredPembeli = authService.signupPembeli(registerPembeliDto);
        ApiResponse<PembeliModel> response = new ApiResponse<>(
                HttpStatus.CREATED.value() ,
                "Account Created Successfully" ,
                registeredPembeli
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/pembeli/login")
    public ResponseEntity<LoginResponse> loginPembeli (@RequestBody LoginDto loginPembeliDto) {
        PembeliModel authenticatedPembeli = authService.loginPembeli(loginPembeliDto);

        String jwtToken = jwtService.generateToken(authenticatedPembeli);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping("/penjual/signup")
    public ResponseEntity<ApiResponse<PenjualModel>> registerPenjual (@RequestBody RegisterPenjualDto registerPenjualDto ){
        PenjualModel registerPenjual = authService.signupPenjual(registerPenjualDto);
        ApiResponse<PenjualModel> response = new ApiResponse<>(
                HttpStatus.CREATED.value() ,
                "Account Created Successfully" ,
                registerPenjual
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/penjual/login")
    public ResponseEntity<LoginResponse> loginPenjual (@RequestBody LoginDto loginInput) {
        PenjualModel authenticatedPembeli = authService.loginPenjual(loginInput);
        String jwtToken = jwtService.generateToken(authenticatedPembeli);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

}
