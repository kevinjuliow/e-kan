package com.example.backend.services;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.mediaSosialDtos.MediaSosialDto;
import com.example.backend.models.MediaSosialModel;
import com.example.backend.models.PenjualModel;
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

    private MedialSosialService service ;
    private DtoMapper mapper ;
    private PenjualService servicePenjual ;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<List<MediaSosialDto>>> index (@PathVariable UUID id ) {
        PenjualModel findPenjual = servicePenjual.getById(id);
        List<MediaSosialModel> list = service.getAll(findPenjual) ;
        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ApiResponse<>(
                            HttpStatus.NO_CONTENT.value(),
                            "No Content" ,
                            null
                    )
            );
        }

        List<MediaSosialDto> dtoList = list.stream().map(mapper::toMediaSosialDto).collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        "Success Retrieve Social Media" ,
                        dtoList
                )
        );

    }
    @PostMapping
    public ResponseEntity<ApiResponse<MediaSosialDto>> store (@RequestBody @Valid  MediaSosialModel input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(
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
                        new ApiResponse<>(
                                HttpStatus.CREATED.value(),
                                "Media Sosial Created" ,
                                mapper.toMediaSosialDto(savedMediaSosial)
                        )
                );

    }
}
