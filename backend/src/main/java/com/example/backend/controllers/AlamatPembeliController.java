package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
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
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("alamat")
@AllArgsConstructor
public class AlamatPembeliController {
    private final AlamatPembeliService service ;
    private final DtoMapper mapper ;
    @GetMapping
    public ResponseEntity<ApiResp<List<AlamatPembeliDto>>> index() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
          List<AlamatPembeliModel> alamatList = service.findByPembeli((PembeliModel) authentication.getPrincipal()) ;

          if (alamatList.isEmpty()) {
              return ResponseEntity.noContent().build();
          }

          List<AlamatPembeliDto> alamatDtoList = alamatList.stream().map(mapper::toAlamatDto).collect(Collectors.toList());
          return ResponseEntity.ok(new ApiResp<>(HttpStatus.OK.value() , "Success Retrieve Alamat" , alamatDtoList));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                new ApiResp<>(HttpStatus.FORBIDDEN.value(), "Forbidden" , null)
        );
    }


    @PostMapping
    public ResponseEntity<ApiResp<AlamatPembeliDto>> store(@RequestBody AlamatPembeliModel input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof PembeliModel pembeli)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }
        input.setPembeli(pembeli);
        AlamatPembeliModel savedAlamat = service.saveAlamat(input);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResp<>(
                        HttpStatus.CREATED.value(),
                        "Alamat created successfully",
                       mapper.toAlamatDto(input)
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResp<AlamatPembeliDto>> update(
            @PathVariable UUID id,
            @RequestBody AlamatPembeliModel input
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof PembeliModel pembeli)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }


        AlamatPembeliModel existingAlamat = service.getById(id);
        if (!existingAlamat.getPembeli().getIdPembeli().equals(pembeli.getIdPembeli())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new ApiResp<>(
                            HttpStatus.FORBIDDEN.value(),
                            "Forbidden: You do not own this address",
                            null
                    ));
        }


        AlamatPembeliModel updatedAlamat = service.update(input, id);
        return ResponseEntity.ok(new ApiResp<>(
                HttpStatus.OK.value(),
                "Alamat updated successfully",
                mapper.toAlamatDto(updatedAlamat)
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResp<Void>> delete(@PathVariable UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof PembeliModel pembeli)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }


        AlamatPembeliModel existingAlamat = service.getById(id);
        if (!existingAlamat.getPembeli().getIdPembeli().equals(pembeli.getIdPembeli())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new ApiResp<>(
                            HttpStatus.FORBIDDEN.value(),
                            "Forbidden: You do not own this address",
                            null
                    ));
        }


        service.delete(id);
        return ResponseEntity.ok(new ApiResp<>(
                HttpStatus.OK.value(),
                "Alamat deleted successfully",
                null
        ));
    }


}
