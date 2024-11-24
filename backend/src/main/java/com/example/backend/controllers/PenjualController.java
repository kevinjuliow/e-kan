package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.penjualDtos.PenjualDto;
import com.example.backend.dtos.penjualDtos.RegisterPenjualDto;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.PenjualService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("penjual")
@Tag(name = "Penjual", description = "Penjual Management APIs")
@AllArgsConstructor
public class PenjualController {


    private final PenjualService penjualService ;

    @GetMapping
    @Operation(
            summary = "Get all penjual",
            description = "Retrieve a list of all sellers (penjual) in the system"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved list of sellers",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = ApiResp.class,
                                    subTypes = {PenjualDto.class}
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "No sellers found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResp.class)
                    )
            )
    })
    public ResponseEntity<ApiResp<List<PenjualDto>>> listPenjual () {
        List<PenjualModel> penjualList = penjualService.get();
        List<PenjualDto> penjualDtos = penjualList.stream().map(
                penjual -> new PenjualDto(penjual.getId_penjual() ,
                        penjual.getNama() , penjual.getEmail() ,
                        penjual.getWebsite() , penjual.getAlamat() ,
                        penjual.getNo_telp() , penjual.getCreatedAt() , penjual.getUpdatedAt())
        ).collect(Collectors.toList());

        if(penjualDtos.isEmpty()) {
            ApiResp<List<PenjualDto>> responseNoContent = new ApiResp<>(
                    HttpStatus.NO_CONTENT.value(),
                    "NO CONTENT" ,
                    penjualDtos
            );
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseNoContent);
        }
        ApiResp<List<PenjualDto>> response = new ApiResp<>(
                HttpStatus.OK.value() ,
                "OK" ,
                penjualDtos
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    @Operation(
            summary = "Get authenticated seller profile",
            description = "Retrieves the profile information of the currently authenticated seller (penjual)"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved seller profile",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PenjualDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Seller not authenticated",
                    content = @Content
            )
    })
    public ResponseEntity<ApiResp<PenjualDto>> getProfilePenjual () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PenjualModel penjual) {
            PenjualDto penjualDto = new PenjualDto(
                    penjual.getId_penjual() , penjual.getNama() , penjual.getEmail() , penjual.getWebsite(),
                    penjual.getAlamat() , penjual.getNo_telp() , penjual.getCreatedAt() , penjual.getUpdatedAt()
            );;
            ApiResp<PenjualDto> response = new ApiResp<>(
                    HttpStatus.OK.value(),
                    "OK" ,
                    penjualDto
            );
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/profile")
    @Operation(
            summary = "Update seller profile",
            description = "Update profile information for authenticated seller (penjual)"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Profile updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PenjualDto.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - Invalid input data",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResp.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Seller not authenticated",
                    content = @Content
            )
    })
    public ResponseEntity<ApiResp<PenjualDto>> updatePenjual (@RequestBody @Valid RegisterPenjualDto input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication() ;

        if (authentication.getPrincipal() instanceof PenjualModel) {
            PenjualModel penjual = (PenjualModel) authentication.getPrincipal();
            PenjualModel currentPenjual = penjualService.update(input , penjual.getId_penjual());
            PenjualDto penjualDto = new PenjualDto(currentPenjual.getId_penjual() ,
                    currentPenjual.getNama() , currentPenjual.getEmail() , currentPenjual.getWebsite() ,currentPenjual.getAlamat() ,  currentPenjual.getNo_telp()
                    , currentPenjual.getCreatedAt() , currentPenjual.getUpdatedAt());
            ApiResp<PenjualDto> response = new ApiResp<>(
                    HttpStatus.OK.value() ,
                    "Profile updated Successfully" ,
                    penjualDto
            );
            return ResponseEntity.ok(response);
        }

        ApiResp<PenjualDto> respError = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value() ,
                "BAD REQUEST" ,
                null
        );
                return ResponseEntity.badRequest().body(respError) ;
    }
}
