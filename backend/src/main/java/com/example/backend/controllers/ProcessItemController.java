package com.example.backend.controllers;

import com.example.backend.dtos.ApiResp;
import com.example.backend.dtos.DtoMapper;
import com.example.backend.dtos.ProcessItemsDto;
import com.example.backend.models.PenjualModel;
import com.example.backend.models.ProcessItemsModel;
import com.example.backend.services.ProcessItemsService;
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
@AllArgsConstructor
@RequestMapping("/items/process")
public class ProcessItemController {
    private final ProcessItemsService processItemsService;
    private final DtoMapper mapper;

    @GetMapping()
    public ResponseEntity<ApiResp<List<ProcessItemsDto>>> getAllProcessedItems() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if ((authentication.getPrincipal() instanceof PenjualModel penjualModel)) {
            List<ProcessItemsModel> invoiceList = processItemsService.getAllProcessedItems(penjualModel);
            List<ProcessItemsDto> invoiceListDto = invoiceList.stream().map(mapper::toProcessItemsDto).collect(Collectors.toList());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ApiResp<>(
                            HttpStatus.OK.value(),
                            "Success Retrieve process item",
                            invoiceListDto
                    ));
        }
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResp<>(
                        HttpStatus.UNAUTHORIZED.value(),
                        "Unauthorized",
                        null
                ));
    }

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<Object> deleteAllByInvoiceId (@PathVariable UUID invoiceId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication.getPrincipal() instanceof PenjualModel)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResp<>(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            null
                    ));
        }
        processItemsService.deleteAllByIdInvoice(invoiceId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ApiResp<>(
                        HttpStatus.OK.value(),
                        "Deleted all process item with invoice" + invoiceId,
                        null
                ));
    }
}
