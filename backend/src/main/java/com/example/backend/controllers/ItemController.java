package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.itemDtos.ItemDto;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.services.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;
    private final DtoMapper itemMapper;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ItemDto>>> index() {
        List<ItemModel> itemList = itemService.getAllItems();

        List<ItemDto> itemDtoList = itemList.stream()
                .map(itemMapper::toItemDto)
                .collect(Collectors.toList());

        if (itemDtoList.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>(
                            HttpStatus.NO_CONTENT.value(),
                            "No items found",
                            itemDtoList
                    ));
        }

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                "Items retrieved successfully",
                itemDtoList
        ));
    }

    @GetMapping("/penjual/{id}")
    public ResponseEntity<ApiResponse<List<ItemDto>>> indexByPenjual(@PathVariable UUID id ) {
        List<ItemModel> itemList = itemService.getAllItemsByPenjual(id);

        List<ItemDto> itemDtoList = itemList.stream()
                .map(itemMapper::toItemDto)
                .collect(Collectors.toList());

        if (itemDtoList.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>(
                            HttpStatus.NO_CONTENT.value(),
                            "No items found",
                            itemDtoList
                    ));
        }

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                "Items retrieved successfully",
                itemDtoList
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ItemDto>> store(@RequestBody @Valid ItemModel input) {
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

        ItemModel savedItem = itemService.saveItem(input);
        ItemDto itemDto = itemMapper.toItemDto(savedItem);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        HttpStatus.CREATED.value(),
                        "Item created successfully",
                        itemDto
                ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ItemDto>> showItem(@PathVariable UUID id) {
        ItemModel item = itemService.getById(id);
        ItemDto itemDto = itemMapper.toItemDto(item);
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                "Success Retrieve Item ID " + item.getId_item(),
                itemDto
        ));
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ItemDto>> updateItem (@PathVariable UUID id, @RequestBody ItemModel input) {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication.getPrincipal() instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }

        PenjualModel penjual = (PenjualModel) authentication.getPrincipal();
        input.setPenjual(penjual);


            ItemModel updatedItem = itemService.updateItem(input, id);
            ItemDto itemDto = itemMapper.toItemDto(updatedItem);
            return ResponseEntity.ok(new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Success Update Item ID " + updatedItem.getId_item(),
                    itemDto
            ));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable UUID id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication.getPrincipal() instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }

        PenjualModel penjual = (PenjualModel) authentication.getPrincipal();

        itemService.deleteItem(id, penjual);

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                "Item deleted successfully",
                null
        ));
    }

}

