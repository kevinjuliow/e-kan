package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.PembeliService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pembeli")
@AllArgsConstructor
public class PembeliController {
    @Autowired
    private PembeliService pembeliService ;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<PembeliDto>> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            PembeliModel pembeli = (PembeliModel) authentication.getPrincipal();
            PembeliDto pembeliDto = new PembeliDto(pembeli.getId_pembeli() ,
                    pembeli.getNama() , pembeli.getEmail() , pembeli.getTanggal_lahir() , pembeli.getNo_telp()
                    , pembeli.getCreatedAt() , pembeli.getUpdatedAt());
            ApiResponse<PembeliDto> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "OK" ,
                    pembeliDto
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<PembeliDto>> updatePembeli(@RequestBody RegisterPembeliDto input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            PembeliModel pembeli = (PembeliModel) authentication.getPrincipal();
            PembeliModel currentPembeli = pembeliService.update(input , pembeli.getId_pembeli());
            PembeliDto pembeliDto = new PembeliDto(currentPembeli.getId_pembeli() ,
                    currentPembeli.getNama() , currentPembeli.getEmail() , currentPembeli.getTanggal_lahir() , currentPembeli.getNo_telp()
                    , currentPembeli.getCreatedAt() , currentPembeli.getUpdatedAt());
            ApiResponse<PembeliDto> response = new ApiResponse<>(
                    HttpStatus.OK.value() ,
                    "Profile updated Successfully" ,
                    pembeliDto
            );
            return ResponseEntity.ok(response);
        }
        ApiResponse<PembeliDto> responseError = new ApiResponse<>(
                HttpStatus.BAD_REQUEST.value() ,
                "BAD REQUEST" ,
                null
        );
        return ResponseEntity.badRequest().body(responseError);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PembeliDto>>> listPembeli(){
        List<PembeliModel> pembeliList = pembeliService.get();
        List<PembeliDto> pembeliDtos = pembeliList.stream()
                .map(pembeli -> new PembeliDto(pembeli.getId_pembeli() ,
                        pembeli.getNama() , pembeli.getEmail() , pembeli.getTanggal_lahir() , pembeli.getNo_telp()
                        , pembeli.getCreatedAt() , pembeli.getUpdatedAt())).collect(Collectors.toList());

        if (pembeliDtos.isEmpty()){
            ApiResponse<List<PembeliDto>> responseNoContent = new ApiResponse<>(
                    HttpStatus.NO_CONTENT.value(),
                    "NO CONTENT" ,
                    pembeliDtos
            );
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseNoContent);
        }
        ApiResponse<List<PembeliDto>> response = new ApiResponse<>(
                HttpStatus.OK.value() ,
                "OK" ,
                pembeliDtos
        );
        return ResponseEntity.ok(response);
    }

}
