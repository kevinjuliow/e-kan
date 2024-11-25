package com.example.backend.Exceptions;

import com.example.backend.dtos.ApiResp;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    // Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResp<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ApiResp<Map<String, String>> response = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Handle resource not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResp<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // Handle unauthorized access
    @ExceptionHandler({UnauthorizedAccessException.class, AccessDeniedException.class})
    public ResponseEntity<ApiResp<Object>> handleUnauthorizedAccess(Exception ex) {
        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.FORBIDDEN.value(),
                ex.getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    // Handle JWT related exceptions
    @ExceptionHandler({SignatureException.class, ExpiredJwtException.class, MalformedJwtException.class})
    public ResponseEntity<ApiResp<Object>> handleJwtExceptions(Exception ex) {
        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.UNAUTHORIZED.value(),
                "Invalid or expired JWT token",
                null
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Handle authentication exceptions
    @ExceptionHandler({BadCredentialsException.class, AccountStatusException.class})
    public ResponseEntity<ApiResp<Object>> handleAuthenticationExceptions(Exception ex) {
        String message = ex instanceof BadCredentialsException ?
                "Invalid credentials" : "The account is locked";

        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.UNAUTHORIZED.value(),
                message,
                null
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Handle data integrity violations
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResp<Object>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.CONFLICT.value(),
                "Data integrity violation: " + ex.getMostSpecificCause().getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    // Handle invalid data
    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ApiResp<Object>> handleInvalidData(InvalidDataException ex) {
        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Handle HTTP method not supported
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResp<Object>> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                ex.getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(response);
    }

    // Handle malformed JSON
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResp<Object>> handleMalformedJSON(HttpMessageNotReadableException ex) {

        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value(),
                "Malformed JSON request",
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    //Handle UUID Not the same type
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResp<Object>> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        if (ex.getRequiredType() != null && ex.getRequiredType().equals(UUID.class)) {
            ApiResp<Object> response = new ApiResp<>(
                    HttpStatus.NOT_FOUND.value(),
                    "Invalid UUID format",
                    null
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value(),
                "Invalid argument type: " + ex.getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<?> handleMultipartException(MultipartException ex) {

        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.BAD_REQUEST.value(),
                "Invalid multipart request: " + ex.getMessage(),
                null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

    }

    // Handle all other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResp<Object>> handleAllOtherExceptions(Exception ex) {
        log.error("Unexpected error occurred", ex);
        log.error("Exception type: {}", ex.getClass().getName());
        log.error("Exception message: {}", ex.getMessage());

        ApiResp<Object> response = new ApiResp<>(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred",
                null
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // Custom exceptions as static inner classes
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    public static class UnauthorizedAccessException extends RuntimeException {
        public UnauthorizedAccessException(String message) {
            super(message);
        }
    }

    public static class ResourceAlreadyExistsException extends RuntimeException {
        public ResourceAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class InvalidDataException extends RuntimeException {
        public InvalidDataException(String message) {
            super(message);
        }
    }

}