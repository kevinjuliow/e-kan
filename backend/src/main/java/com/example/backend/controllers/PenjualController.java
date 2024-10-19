package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.PenjualService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("penjual")
public class PenjualController {

    @Autowired
    private PenjualService penjualService ;

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

        if (authentication.getPrincipal() instanceof PenjualModel) {
            PenjualModel penjual = ((PenjualModel) authentication.getPrincipal());
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
}
