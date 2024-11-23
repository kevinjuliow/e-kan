package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.itemPicturesDtos.ItemPIcturesDto;
import com.example.backend.models.ItemModel;
import com.example.backend.models.ItemPicturesModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.ItemPicturesService;
import com.example.backend.services.ItemService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public ResponseEntity<List<Map<String, Object>>> getAllPictForItems(@PathVariable UUID itemId) {
        List<ItemPicturesModel> itemPicts = service.getAllPictures(itemId);
        if (itemPicts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<Map<String, Object>> responses = itemPicts.stream()
                .map(pic -> {
                    Map<String, Object> pictureData = new HashMap<>();
                    pictureData.put("id", pic.getId());
                    pictureData.put("fileName", pic.getFileName());
                    pictureData.put("fileType", pic.getFileType());
                    pictureData.put("data", pic.getData());
                    return pictureData;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(responses);
    }

    @GetMapping("/pictures/{pictureId}")
    public ResponseEntity<byte[]> getPictureById (@PathVariable UUID pictureId) {
       ItemPicturesModel itemPict = service.getPicture(pictureId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(itemPict.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + itemPict.getFileName() + "\"")
                .body(itemPict.getData());
    }

    @PostMapping(value = "/{itemId}/pictures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResp<ItemPIcturesDto>> storePicture (@RequestParam("file") MultipartFile file , @PathVariable UUID itemId){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication.getPrincipal() instanceof PenjualModel currentPenjual) {
                ItemModel item = itemService.getById(itemId);

                if (!(item.getPenjual().getId_penjual().equals(currentPenjual.getId_penjual()))){
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                            new ApiResp<>(
                                    HttpStatus.FORBIDDEN.value() ,
                                    "Only owner can post item picture" ,
                                    null
                            )
                    );
                }
                ItemPicturesModel itemPicture = service.uploadImage(itemId, file);
                return ResponseEntity.ok(
                        new ApiResp<>(
                                HttpStatus.OK.value() ,
                                "Picture saved" ,
                                mapper.toItemPicturesDto(itemPicture)
                        )
                );
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value() ,
                            "Unauthorized" ,
                            null
                    )
            );


        }catch (IOException e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResp<>(
                            HttpStatus.INTERNAL_SERVER_ERROR.value() ,
                            "Couldn't upload profile-picture " ,
                            null
                    )
            );
        }
    }
}
