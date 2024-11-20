package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.PembeliModel;
import com.example.backend.models.ProfilePictureModel;
import com.example.backend.repositories.PembeliRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProfilePictureService {
    private final PembeliRepo repo ;

    public ProfilePictureModel uploadProfilePicture(UUID pembeliId, MultipartFile file) throws IOException {
        PembeliModel pembeli = repo.findById(pembeliId)
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
        profilePicture.setPembeli(pembeli);

        pembeli.setProfilePicture(profilePicture);
        repo.save(pembeli);

        return profilePicture;
    }
    private boolean isImageValid(String fileType) {
        return fileType != null && (
                fileType.equals("image/jpeg") ||
                        fileType.equals("image/png") ||
                        fileType.equals("image/jpg")
        );
    }

    public ProfilePictureModel getProfilePicture(UUID pembeliId) {
        PembeliModel pembeli = repo.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found"));

        ProfilePictureModel profilePicture = pembeli.getProfilePicture();
        if (profilePicture == null) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("Profile picture not found");
        }
        return profilePicture;
    }

    public void deleteProfilePicture(UUID pembeliId) {
        PembeliModel pembeli = repo.findById(pembeliId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Pembeli not found"));

        if (pembeli.getProfilePicture() == null) {
            throw new GlobalExceptionHandler.ResourceNotFoundException("Profile picture not found");
        }
        pembeli.setProfilePicture(null);
        repo.save(pembeli);
    }
}
