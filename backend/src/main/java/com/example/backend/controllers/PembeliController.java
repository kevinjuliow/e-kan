package com.example.backend.controllers;

import com.example.backend.dtos.PembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.PembeliService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pembeli")
@AllArgsConstructor
public class PembeliController {
    @Autowired
    private PembeliService pembeliService ;

    @GetMapping("/profile")
    public ResponseEntity<PembeliModel> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            PembeliModel pembeli = (PembeliModel) authentication.getPrincipal();
            return ResponseEntity.ok(pembeli);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<PembeliDto>> listPembeli(){
        List<PembeliModel> pembeliList = pembeliService.get();
        List<PembeliDto> pembeliDtos = pembeliList.stream()
                .map(pembeli -> new PembeliDto(pembeli.getId_pembeli() ,
                        pembeli.getNama() , pembeli.getEmail() , pembeli.getTanggal_lahir() , pembeli.getNo_telp()
                        , pembeli.getCreatedAt() , pembeli.getUpdatedAt())).collect(Collectors.toList());
        return ResponseEntity.ok(pembeliDtos);
    }

}
