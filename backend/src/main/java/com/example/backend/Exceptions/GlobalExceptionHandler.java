package com.example.backend.Exceptions;

import com.example.backend.dtos.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.coyote.BadRequestException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleAllExceptions(Exception exception) {
        HttpStatus status;
        String message;

        if (exception instanceof BadCredentialsException) {
            status = HttpStatus.UNAUTHORIZED;
            message = "The username or password is incorrect";
        }
        else if (exception instanceof AccountStatusException) {
            status = HttpStatus.FORBIDDEN;
            message = "The account is locked";
        }
        else if (exception instanceof AccessDeniedException) {
            status = HttpStatus.FORBIDDEN;
            message = "You are not authorized to access this resource";
        }
        else if (exception instanceof SignatureException) {
            status = HttpStatus.FORBIDDEN;
            message = "The JWT signature is invalid";
        }
        else if (exception instanceof ExpiredJwtException) {
            status = HttpStatus.FORBIDDEN;
            message = "The JWT token has expired";
        }
        else if (exception instanceof MethodArgumentNotValidException) {
            status = HttpStatus.BAD_REQUEST;
            message = "Validation failed";
        }
        else if (exception instanceof DataIntegrityViolationException) {
            status = HttpStatus.CONFLICT;
            message = "Data integrity violation occurred";
        }
        else if (exception instanceof HttpRequestMethodNotSupportedException) {
            status = HttpStatus.METHOD_NOT_ALLOWED;
            message = "Request method not supported";
        }
        else if (exception instanceof HttpMessageNotReadableException) {
            status = HttpStatus.BAD_REQUEST;
            message = "Malformed JSON request";
        }
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Unknown internal server error";
        }

        ApiResponse<Object> response = new ApiResponse<>(
                status.value(),
                message,
                null
        );

        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ApiResponse<Map<String, String>> response = new ApiResponse<>(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
