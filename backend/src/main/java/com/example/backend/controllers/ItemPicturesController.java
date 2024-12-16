package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.itemPicturesDtos.ItemPIcturesDto;
import com.example.backend.models.ItemModel;
import com.example.backend.models.ItemPicturesModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.ItemPicturesService;
import com.example.backend.services.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(
            summary = "Get all item pictures",
            description = "Retrieves all picture of an item based on it's id"
    )
    @ApiResponse(
            responseCode = "200",
            description = "Successfully retrieved profile"
    )
    @ApiResponse(
            responseCode = "204",
            description = "No Content"
    )
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
    @Operation(
            summary = "Get item picture by id",
            description = "Retrieves a single picture of an item based on it's id"
    )
    @ApiResponse(
            responseCode = "200"
    )
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
    
                if (!(item.getPenjual().getIdPenjual().equals(currentPenjual.getIdPenjual()))){
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
    @DeleteMapping("/pictures/{idPicture}")
    public ResponseEntity<ApiResp<ItemPIcturesDto>> deletePicture(@PathVariable UUID idPicture) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PenjualModel currentPenjual) {
            ItemPicturesModel picture = service.getPicture(idPicture);

            if (!picture.getItem().getPenjual().getIdPenjual().equals(currentPenjual.getIdPenjual())){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResp<>(
                                HttpStatus.FORBIDDEN.value() ,
                                "Forbidden , only owner can delete its picture" ,
                                null
                        )
                );
            }
            service.deletePicture(idPicture);
            return ResponseEntity.ok(  new ApiResp<>(
                    HttpStatus.UNAUTHORIZED.value() ,
                    "Success delete picture" ,
                    null
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ApiResp<>(
                        HttpStatus.UNAUTHORIZED.value() ,
                        "Unauthorized , only owner can delete its picture" ,
                        null
                )
        );
    }
}
