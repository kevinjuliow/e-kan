package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.pembeliDtos.PembeliDto;
import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.PembeliService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
@RequestMapping("/pembeli")
@AllArgsConstructor
public class PembeliController {

    private final PembeliService pembeliService ;
    private final DtoMapper mapper ;

    @GetMapping("/profile")
    @Operation(
            summary = "Get authenticated user profile",
            description = "Retrieves the profile information of the currently authenticated pembeli"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved profile",
            content = @Content(schema = @Schema(implementation = PembeliDto.class))
    )
    @ApiResponse(
            responseCode = "401",
            description = "Unauthorized - User not authenticated"
    )
    public ResponseEntity<ApiResp<PembeliDto>> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            PembeliModel pembeli = (PembeliModel) authentication.getPrincipal();
            PembeliDto pembeliDto = new PembeliDto(pembeli.getId_pembeli() ,
                    pembeli.getNama() , pembeli.getEmail() , pembeli.getTanggal_lahir() , pembeli.getNo_telp()
                    , pembeli.getCreatedAt() , pembeli.getUpdatedAt());
            ApiResp<PembeliDto> response = new ApiResp<>(
                    HttpStatus.OK.value(),
                    "OK" ,
                    pembeliDto
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResp<PembeliDto>> updatePembeli(@RequestBody RegisterPembeliDto input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            PembeliModel pembeli = (PembeliModel) authentication.getPrincipal();
            PembeliModel currentPembeli = pembeliService.update(input , pembeli.getId_pembeli());
            PembeliDto pembeliDto = new PembeliDto(currentPembeli.getId_pembeli() ,
                    currentPembeli.getNama() , currentPembeli.getEmail() , currentPembeli.getTanggal_lahir() , currentPembeli.getNo_telp()
                    , currentPembeli.getCreatedAt() , currentPembeli.getUpdatedAt());
            ApiResp<PembeliDto> response = new ApiResp<>(
                    HttpStatus.OK.value() ,
                    "Profile updated Successfully" ,
                    pembeliDto
            );
            return ResponseEntity.ok(response);
        }
        ApiResp<PembeliDto> responseError = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value() ,
                "BAD REQUEST" ,
                null
        );
        return ResponseEntity.badRequest().body(responseError);
    }

    @GetMapping
    public ResponseEntity<ApiResp<List<PembeliDto>>> listPembeli(){
        List<PembeliModel> pembeliList = pembeliService.get();
        List<PembeliDto> pembeliDtos = pembeliList.stream()
                .map(pembeli -> new PembeliDto(pembeli.getId_pembeli() ,
                        pembeli.getNama() , pembeli.getEmail() , pembeli.getTanggal_lahir() , pembeli.getNo_telp()
                        , pembeli.getCreatedAt() , pembeli.getUpdatedAt())).collect(Collectors.toList());

        if (pembeliDtos.isEmpty()){
            ApiResp<List<PembeliDto>> responseNoContent = new ApiResp<>(
                    HttpStatus.NO_CONTENT.value(),
                    "NO CONTENT" ,
                    pembeliDtos
            );
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseNoContent);
        }
        ApiResp<List<PembeliDto>> response = new ApiResp<>(
                HttpStatus.OK.value() ,
                "OK" ,
                pembeliDtos
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResp<PembeliDto>> showPembeli(@PathVariable UUID id) {
            System.out.println("ID : " + id);
            PembeliModel pembeli = pembeliService.getById(id);
            PembeliDto pembeliDto = mapper.toPembeliDto(pembeli);
            return ResponseEntity.ok(new ApiResp<>(HttpStatus.OK.value(),
                    "Success Retrieve User ID " + pembeli.getId_pembeli() , (pembeliDto)));
    }

}
