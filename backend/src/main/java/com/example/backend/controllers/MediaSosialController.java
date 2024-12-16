package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.mediaSosialDtos.MediaSosialDto;
import com.example.backend.models.MediaSosialModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.MedialSosialService;
import com.example.backend.services.PenjualService;
import jakarta.validation.Valid;
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
@RequestMapping("/sosial")
@AllArgsConstructor
public class MediaSosialController {

    private final MedialSosialService service ;
    private final DtoMapper mapper ;
    private final PenjualService servicePenjual ;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResp<List<MediaSosialDto>>> index (@PathVariable UUID id ) {
        PenjualModel findPenjual = servicePenjual.getById(id);
        List<MediaSosialModel> list = service.getAll(findPenjual) ;
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ApiResp<>(
                            HttpStatus.NO_CONTENT.value(),
                            "No Content" ,
                            null
                    )
            );
        }

        List<MediaSosialDto> dtoList = list.stream().map(mapper::toMediaSosialDto).collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResp<>(
                        HttpStatus.OK.value(),
                        "Success Retrieve Social Media" ,
                        dtoList
                )
        );

    }
    @PostMapping
    public ResponseEntity<ApiResp<MediaSosialDto>> store (@RequestBody @Valid  MediaSosialModel input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }
        PenjualModel penjual = (PenjualModel) principal;
        input.setPenjual(penjual);

        MediaSosialModel savedMediaSosial = service.saveMediaSosial(input);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        new ApiResp<>(
                                HttpStatus.CREATED.value(),
                                "Media Sosial Created" ,
                                mapper.toMediaSosialDto(savedMediaSosial)
                        )
                );

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResp<MediaSosialDto>> update(@RequestBody @Valid MediaSosialModel input, @PathVariable UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }

        PenjualModel penjual = (PenjualModel) principal;

        MediaSosialModel existingMediaSosial = service.getById(id);
        if (!existingMediaSosial.getPenjual().getIdPenjual().equals(penjual.getIdPenjual())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new ApiResp<>(
                            HttpStatus.FORBIDDEN.value(),
                            "You are not the owner of this Media Sosial",
                            null
                    ));
        }

        MediaSosialModel updatedMediaSosial = service.update(input, id);

        return ResponseEntity
                .ok(new ApiResp<>(
                        HttpStatus.OK.value(),
                        "Media Sosial Updated Successfully",
                        mapper.toMediaSosialDto(updatedMediaSosial)
                ));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResp<MediaSosialDto>> delete (@PathVariable UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }

        PenjualModel penjual = (PenjualModel) principal;

        MediaSosialModel existingMediaSosial = service.getById(id);
        if (!existingMediaSosial.getPenjual().getIdPenjual().equals(penjual.getIdPenjual())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new ApiResp<>(
                            HttpStatus.FORBIDDEN.value(),
                            "You are not the owner of this Media Sosial",
                            null
                    ));
        }
        service.delete(id);

        return ResponseEntity
                .ok(new ApiResp<>(
                        HttpStatus.OK.value(),
                        "Media sosial delete Successfully",
                        null
                ));
    }



}
