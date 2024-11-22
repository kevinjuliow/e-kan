package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.profilePictureDtos.ProfilePictureDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.ProfilePictureModel;
import com.example.backend.services.ProfilePictureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("profile-picture")
public class ProfilePictureController {
    private final ProfilePictureService service ;
    private final DtoMapper mapper;

    @PostMapping
    public ResponseEntity<ApiResponse<ProfilePictureDto>> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PembeliModel currentPembeli) {
                ProfilePictureModel profilePicture = service.uploadProfilePicture(currentPembeli.getId_pembeli(), file);

                return ResponseEntity.ok(
                        new ApiResponse<>(
                                HttpStatus.OK.value() ,
                                "Profile picture saved" ,
                                mapper.toProfilePictureDto(profilePicture)
                        )
                );
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse<>(
                            HttpStatus.UNAUTHORIZED.value() ,
                            "Unauthorized" ,
                            null
                    )
            );

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponse<>(
                            HttpStatus.INTERNAL_SERVER_ERROR.value() ,
                            "Couldn't upload profile-picture " ,
                            null
                    )
            );
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<byte[]>> getProfilePicture() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel currentPembeli) {
            ProfilePictureModel profilePicture = service.getProfilePicture(currentPembeli.getId_pembeli());

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(profilePicture.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + profilePicture.getFileName() + "\"")
                    .body(  new ApiResponse<>(
                            HttpStatus.INTERNAL_SERVER_ERROR.value() ,
                            "Couldn't upload profile-picture " ,
                            profilePicture.getData()
                    ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResponse<>(
                        HttpStatus.UNAUTHORIZED.value() ,
                        "Unauthorized" ,
                        null
                )
        );

    }


    @DeleteMapping
    public ResponseEntity<ApiResponse<Object>> destroy (UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof PembeliModel currentPembeli) {
            service.deleteProfilePicture(currentPembeli.getId_pembeli());
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            HttpStatus.OK.value(),
                            "Success delete profile picture",
                            null
                    )
            );
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResponse<>(
                        HttpStatus.UNAUTHORIZED.value() ,
                        "Unauthorized" ,
                        null
                )
        );
    }





}
