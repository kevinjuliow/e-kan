package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResp<T> {
    private int status ;
    private String message ;
    private T data ;
}
