package com.example.backend.controllers;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.cartItemDtos.CartItemDto;
import com.example.backend.models.CartItemModel;
import com.example.backend.models.ItemModel;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.CartItemService;
import com.example.backend.services.ItemService;
import lombok.AllArgsConstructor;
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
@RequestMapping("/cart")
@AllArgsConstructor
public class CartItemController {
    private final CartItemService service ;
    private final ItemService itemService ;
    private final DtoMapper mapper ;


    @GetMapping
    public ResponseEntity<ApiResponse<List<CartItemDto>>> index () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            List<CartItemModel> cartPembeli = service.getAll(((PembeliModel) authentication.getPrincipal()));
            if (cartPembeli.isEmpty()){
                return ResponseEntity.noContent().build();
            }
            List<CartItemDto> cartPembeliDto = cartPembeli.stream().map(mapper :: toCartItemDto).collect(Collectors.toList());

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            HttpStatus.OK.value() ,
                            "Success retrieve cart items" ,
                            cartPembeliDto
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

    @PostMapping("/add/{id}")
    public ResponseEntity<ApiResponse<CartItemDto>> store (@RequestBody CartItemModel input , @PathVariable UUID id ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel) {
            input.setPembeli(((PembeliModel) authentication.getPrincipal()));
            ItemModel foundItem = itemService.getById(id);
            input.setItem(foundItem);

            CartItemModel savedCartItem = service.saveCartItem(input);
            CartItemDto toDto = mapper.toCartItemDto(savedCartItem);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponse<>(
                            HttpStatus.CREATED.value(),
                            "Success create new cart item" ,
                            toDto
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

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<CartItemDto>> destroy (@PathVariable UUID id ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
            CartItemModel foundModel = service.getById(id) ;

            if (!foundModel.getPembeli().getId_pembeli().equals(currentUser.getId_pembeli())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(
                                new ApiResponse<>(
                                        HttpStatus.UNAUTHORIZED.value(),
                                        "current user is not the same as in the cart item user" ,
                                        null
                                )
                        ) ;
            }

            service.delete(id);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            HttpStatus.OK.value() ,
                            "success delete cart item" ,
                            null
                    )
            );
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        new ApiResponse<>(
                                HttpStatus.UNAUTHORIZED.value(),
                                "Unauthorized" ,
                                null
                        )
                ) ;
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CartItemDto>> update (@PathVariable UUID id , @RequestBody CartItemModel input) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof PembeliModel currentUser) {
            CartItemModel foundModel = service.getById(id) ;

            if (!foundModel.getPembeli().getId_pembeli().equals(currentUser.getId_pembeli())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(
                                new ApiResponse<>(
                                        HttpStatus.UNAUTHORIZED.value(),
                                        "current user is not the same as in the cart item user" ,
                                        null
                                )
                        ) ;
            }

            CartItemModel update = service.update(input , id);
            CartItemDto toDto = mapper.toCartItemDto(update);
            return ResponseEntity.ok(
                    new ApiResponse<>(
                            HttpStatus.OK.value() ,
                            "success update cart item" ,
                            toDto
                    )
            );
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(
                        new ApiResponse<>(
                                HttpStatus.UNAUTHORIZED.value(),
                                "Unauthorized" ,
                                null
                        )
                ) ;
    }
}

