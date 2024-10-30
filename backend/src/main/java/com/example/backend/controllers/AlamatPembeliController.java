package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.alamatDtos.AlamatPembeliDto;
import com.example.backend.models.AlamatPembeliModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.AlamatPembeliService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("alamat")
@AllArgsConstructor
public class AlamatPembeliController {
    private final AlamatPembeliService service ;
    private final DtoMapper mapper ;
    @GetMapping
    public ResponseEntity<ApiResponse<List<AlamatPembeliDto>>> index() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
          List<AlamatPembeliModel> alamatList = service.findByPembeli((PembeliModel) authentication.getPrincipal()) ;

          if (alamatList.isEmpty()) {
              return ResponseEntity.noContent().build();
          }

          List<AlamatPembeliDto> alamatDtoList = alamatList.stream().map(mapper::toAlamatDto).collect(Collectors.toList());
          return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value() , "Success Retrieve Alamat" , alamatDtoList));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                new ApiResponse<>(HttpStatus.FORBIDDEN.value(), "Forbidden" , null)
        );
    }


    @PostMapping
    public ResponseEntity<ApiResponse<AlamatPembeliDto>> store(@RequestBody AlamatPembeliModel input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof PembeliModel pembeli)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }
        input.setPembeli(pembeli);
        AlamatPembeliModel savedAlamat = service.saveAlamat(input);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        HttpStatus.CREATED.value(),
                        "Alamat created successfully",
                       mapper.toAlamatDto(input)
                ));
    }

}
