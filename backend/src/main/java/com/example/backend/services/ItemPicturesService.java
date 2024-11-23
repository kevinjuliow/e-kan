package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.ItemModel;
import com.example.backend.models.ItemPicturesModel;
import com.example.backend.repositories.ItemPicturesRepo;
import com.example.backend.repositories.ItemRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ItemPicturesService {
    private final ItemPicturesRepo repo ;
    private final ItemRepo itemRepo ;

    public ItemPicturesModel uploadImage (UUID id, MultipartFile file) throws IOException {
        ItemModel item = itemRepo.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Item not found"));

        //check to limit picture for each item max 8 picture
        List<ItemPicturesModel> listPictures = repo.findByItem(item).get() ;
        if (listPictures.size() >= 8) {
            throw new GlobalExceptionHandler.InvalidDataException("Max picture reached for each items");
        }

        // Validate file
        if (file.isEmpty()) {
            throw new GlobalExceptionHandler.InvalidDataException("File is empty");
        }

        // Validate file type
        String fileType = file.getContentType();
        if (!isImageValid(fileType)) {
            throw new GlobalExceptionHandler.InvalidDataException("Only image files (JPEG, PNG) are allowed");
        }

        // Create picture
        ItemPicturesModel picture = ItemPicturesModel.builder()
                .fileName(file.getOriginalFilename())
                .data(file.getBytes())
                .fileType(fileType)
                .item(item)
                .build();

        repo.save(picture);
        return picture;
    }

    private boolean isImageValid(String fileType) {
        return fileType != null && (
                fileType.equals("image/jpeg") ||
                        fileType.equals("image/png") ||
                        fileType.equals("image/jpg")
        );
    }

    // Get all pictures for an item
    public List<ItemPicturesModel> getAllPictures(UUID itemId) {
        ItemModel item = itemRepo.findById(itemId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Item not found"));

        return repo.findByItem(item)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("No pictures found"));
    }

    // Get a specific picture
    public ItemPicturesModel getPicture(UUID pictureId) {
        return repo.findById(pictureId)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Picture not found"));
    }


}
