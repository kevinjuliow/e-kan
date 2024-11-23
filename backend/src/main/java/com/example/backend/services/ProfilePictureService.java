package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.models.ProfilePictureModel;
import com.example.backend.repositories.PembeliRepo;
import com.example.backend.repositories.PenjualRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProfilePictureService {
    private final PembeliRepo repoPembeli;
    private final PenjualRepo repoPenjual;

    public ProfilePictureModel uploadProfilePicturePembeli (UUID pembeliId, MultipartFile file) throws IOException {
        PembeliModel pembeli = repoPembeli.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found"));

        // Validate file
        if (file.isEmpty()) {
            throw new GlobalExceptionHandler.InvalidDataException("File is empty");
        }

        // Validate file type
        String fileType = file.getContentType();
        if (!isImageValid(fileType)) {
            throw new GlobalExceptionHandler.InvalidDataException("Only image files (JPEG, PNG) are allowed");
        }

        // Create or update profile picture
        ProfilePictureModel profilePicture = pembeli.getProfilePicture();
        if (profilePicture == null) {
            profilePicture = new ProfilePictureModel();
        }

        profilePicture.setFileName(file.getOriginalFilename());
        profilePicture.setFileType(fileType);
        profilePicture.setData(file.getBytes());
        profilePicture.setUser_type("PEMBELI");
        profilePicture.setPembeli(pembeli);

        pembeli.setProfilePicture(profilePicture);
        repoPembeli.save(pembeli);

        return profilePicture;
    }

    public ProfilePictureModel uploadProfilePicturePenjual (UUID penjualId, MultipartFile file) throws IOException {
        PenjualModel penjual = repoPenjual.findById(penjualId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Penjual not found"));

        // Validate file
        if (file.isEmpty()) {
            throw new GlobalExceptionHandler.InvalidDataException("File is empty");
        }

        // Validate file type
        String fileType = file.getContentType();
        if (!isImageValid(fileType)) {
            throw new GlobalExceptionHandler.InvalidDataException("Only image files (JPEG, PNG) are allowed");
        }

        // Create or update profile picture
        ProfilePictureModel profilePicture = penjual.getProfilePicture();
        if (profilePicture == null) {
            profilePicture = new ProfilePictureModel();
        }

        profilePicture.setFileName(file.getOriginalFilename());
        profilePicture.setFileType(fileType);
        profilePicture.setData(file.getBytes());
        profilePicture.setUser_type("PENJUAL");
        profilePicture.setPenjual(penjual);

        penjual.setProfilePicture(profilePicture);
        repoPenjual.save(penjual);

        return profilePicture;
    }

    private boolean isImageValid(String fileType) {
        return fileType != null && (
                fileType.equals("image/jpeg") ||
                        fileType.equals("image/png") ||
                        fileType.equals("image/jpg")
        );
    }

    public ProfilePictureModel getProfilePicturePembeli(UUID pembeliId) {
        PembeliModel pembeli = repoPembeli.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found"));

        ProfilePictureModel profilePicture = pembeli.getProfilePicture();
        if (profilePicture == null) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("Profile picture not found");
        }
        return profilePicture;
    }

    public ProfilePictureModel getProfilePicturePenjual(UUID pembeliId) {
        PenjualModel penjual = repoPenjual.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Penjual not found"));

        ProfilePictureModel profilePicture = penjual.getProfilePicture();
        if (profilePicture == null) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("Profile picture not found");
        }
        return profilePicture;
    }

    public void deleteProfilePicturePembeli(UUID pembeliId) {
        PembeliModel pembeli = repoPembeli.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found"));

        if (pembeli.getProfilePicture() == null) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("Profile picture not found");
        }
        pembeli.setProfilePicture(null);
        repoPembeli.save(pembeli);
    }

    public void deleteProfilePicturePenjual(UUID pembeliId) {
        PenjualModel pembeli = repoPenjual.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Penjual not found"));

        if (pembeli.getProfilePicture() == null) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("Profile picture not found");
        }
        pembeli.setProfilePicture(null);
        repoPenjual.save(pembeli);
    }
}
