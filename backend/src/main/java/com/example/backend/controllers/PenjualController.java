package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.dtos.penjualDtos.RegisterPenjualDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.PenjualService;
import jakarta.validation.Valid;
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
@RequestMapping("penjual")
@AllArgsConstructor
public class PenjualController {


    private final PenjualService penjualService ;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PenjualDto>>> listPenjual () {
        List<PenjualModel> penjualList = penjualService.get();
        List<PenjualDto> penjualDtos = penjualList.stream().map(
                penjual -> new PenjualDto(penjual.getId_penjual() ,
                        penjual.getNama() , penjual.getEmail() ,
                        penjual.getWebsite() , penjual.getAlamat() ,
                        penjual.getNo_telp() , penjual.getCreatedAt() , penjual.getUpdatedAt())
        ).collect(Collectors.toList());

        if(penjualDtos.isEmpty()) {
            ApiResponse<List<PenjualDto>> responseNoContent = new ApiResponse<>(
                    HttpStatus.NO_CONTENT.value(),
                    "NO CONTENT" ,
                    penjualDtos
            );
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseNoContent);
        }
        ApiResponse<List<PenjualDto>> response = new ApiResponse<>(
                HttpStatus.OK.value() ,
                "OK" ,
                penjualDtos
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<PenjualDto>> getProfilePenjual () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PenjualModel penjual) {
            PenjualDto penjualDto = new PenjualDto(
                    penjual.getId_penjual() , penjual.getNama() , penjual.getEmail() , penjual.getWebsite(),
                    penjual.getAlamat() , penjual.getNo_telp() , penjual.getCreatedAt() , penjual.getUpdatedAt()
            );;
            ApiResponse<PenjualDto> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "OK" ,
                    penjualDto
            );
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<PenjualDto>> updatePenjual (@RequestBody @Valid RegisterPenjualDto input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication() ;

        if (authentication.getPrincipal() instanceof PenjualModel) {
            PenjualModel penjual = (PenjualModel) authentication.getPrincipal();
            PenjualModel currentPenjual = penjualService.update(input , penjual.getId_penjual());
            PenjualDto penjualDto = new PenjualDto(currentPenjual.getId_penjual() ,
                    currentPenjual.getNama() , currentPenjual.getEmail() , currentPenjual.getWebsite() ,currentPenjual.getAlamat() ,  currentPenjual.getNo_telp()
                    , currentPenjual.getCreatedAt() , currentPenjual.getUpdatedAt());
            ApiResponse<PenjualDto> response = new ApiResponse<>(
                    HttpStatus.OK.value() ,
                    "Profile updated Successfully" ,
                    penjualDto
            );
            return ResponseEntity.ok(response);
        }

        ApiResponse<PenjualDto> respError = new ApiResponse<>(
                HttpStatus.BAD_REQUEST.value() ,
                "BAD REQUEST" ,
                null
        );
                return ResponseEntity.badRequest().body(respError) ;
    }
}
