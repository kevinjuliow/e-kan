package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.itemPicturesDtos.ItemPIcturesDto;
import com.example.backend.models.ItemModel;
import com.example.backend.models.ItemPicturesModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.ItemPicturesService;
import com.example.backend.services.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("items")
public class ItemPicturesController {
    private ItemPicturesService service ;
    private ItemService itemService;
    private DtoMapper mapper ;

    @GetMapping("/{itemId}/pictures")
    public ResponseEntity<List<byte[]>> getAllPictForItems(@PathVariable UUID itemId) {
        List<ItemPicturesModel> itemPicts = service.getAllPictures(itemId);
        if (itemPicts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<byte[]> picturesData = itemPicts.stream()
                .map(ItemPicturesModel::getData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(picturesData);
    }

    @GetMapping("/pictures/{pictureId}")
    public ResponseEntity<byte[]> getPictureById (@PathVariable UUID pictureId) {
       ItemPicturesModel itemPict = service.getPicture(pictureId);
        return ResponseEntity.ok(itemPict.getData());
    }

    @PostMapping(value = "/{itemId}/pictures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ItemPIcturesDto>> storePicture (@RequestParam("file") MultipartFile file , @PathVariable UUID itemId){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PenjualModel currentPenjual) {
                ItemModel item = itemService.getById(itemId);

                if (!(item.getPenjual().getId_penjual().equals(currentPenjual.getId_penjual()))){
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                            new ApiResponse<>(
                                    HttpStatus.FORBIDDEN.value() ,
                                    "Only owner can post item picture" ,
                                    null
                            )
                    );
                }
                ItemPicturesModel itemPicture = service.uploadImage(itemId, file);
                return ResponseEntity.ok(
                        new ApiResponse<>(
                                HttpStatus.OK.value() ,
                                "Picture saved" ,
                                mapper.toItemPicturesDto(itemPicture)
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


        }catch (IOException e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponse<>(
                            HttpStatus.INTERNAL_SERVER_ERROR.value() ,
                            "Couldn't upload profile-picture " ,
                            null
                    )
            );
        }
    }
}
