package com.example.backend;

import com.example.backend.controllers.PembeliController;
import com.example.backend.dtos.pembeliDtos.RegisterPembeliDto;
import com.example.backend.models.PembeliModel;
import com.example.backend.services.PembeliService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(MockitoExtension.class)
public class PembeliControllerTests {
    @Mock
    private PembeliService pembeliService;

    @InjectMocks
    private PembeliController pembeliController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private PembeliModel mockPembeli;
    private Authentication authentication;


    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(pembeliController)
                .build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // For handling Date serialization

        // Setup mock user
        mockPembeli = new PembeliModel();
        UUID userId = UUID.randomUUID();
        mockPembeli.setId_pembeli(userId);
        mockPembeli.setNama("Test User");
        mockPembeli.setEmail("test@example.com");
        mockPembeli.setTanggal_lahir(new Date());
        mockPembeli.setNo_telp("123456789");
        mockPembeli.setCreatedAt(new Date());
        mockPembeli.setUpdatedAt(new Date());

        // Setup mock authentication
        authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }


    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void authenticatedUser_WhenUserAuthenticated_ReturnsUserProfile() throws Exception {
        when(authentication.getPrincipal()).thenReturn(mockPembeli);

        mockMvc.perform(get("/pembeli/profile")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.message").value("OK"))
                .andExpect(jsonPath("$.data.email").value(mockPembeli.getEmail()))
                .andExpect(jsonPath("$.data.nama").value(mockPembeli.getNama()));
    }

    @Test
    void authenticatedUser_WhenUserNotAuthenticated_ReturnsUnauthorized() throws Exception {
        when(authentication.getPrincipal()).thenReturn("anonymousUser");

        mockMvc.perform(get("/pembeli/profile")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void updatePembeli_WhenValidInput_ReturnsUpdatedProfile() throws Exception {
        when(authentication.getPrincipal()).thenReturn(mockPembeli);

        RegisterPembeliDto inputDto = new RegisterPembeliDto();
        inputDto.setNama("Updated Name");
        inputDto.setEmail("updated@example.com");
        inputDto.setTanggal_lahir(new Date());
        inputDto.setNo_telp("987654321");

        PembeliModel updatedPembeli = new PembeliModel();
        BeanUtils.copyProperties(mockPembeli, updatedPembeli);
        updatedPembeli.setNama(inputDto.getNama());
        updatedPembeli.setEmail(inputDto.getEmail());

        when(pembeliService.update(any(RegisterPembeliDto.class), any(UUID.class)))
                .thenReturn(updatedPembeli);

        mockMvc.perform(put("/pembeli/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.message").value("Profile updated Successfully"))
                .andExpect(jsonPath("$.data.nama").value(inputDto.getNama()))
                .andExpect(jsonPath("$.data.email").value(inputDto.getEmail()));

        verify(pembeliService).update(any(RegisterPembeliDto.class), eq(mockPembeli.getId_pembeli()));
    }

    @Test
    void updatePembeli_WhenUserNotAuthenticated_ReturnsBadRequest() throws Exception {
        when(authentication.getPrincipal()).thenReturn("anonymousUser");
        RegisterPembeliDto inputDto = new RegisterPembeliDto();
        inputDto.setNama("Updated Name");

        mockMvc.perform(put("pembeli/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(HttpStatus.BAD_REQUEST.value()))
                .andExpect(jsonPath("$.message").value("BAD REQUEST"))
                .andExpect(jsonPath("$.data").isEmpty());
    }

    @Test
    void listPembeli_WhenPembeliExist_ReturnsAllPembeli() throws Exception {
        List<PembeliModel> pembeliList = Arrays.asList(mockPembeli);
        when(pembeliService.get()).thenReturn(pembeliList);

        mockMvc.perform(get("/pembeli")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(HttpStatus.OK.value()))
                .andExpect(jsonPath("$.message").value("OK"))
                .andExpect(jsonPath("$.data[0].email").value(mockPembeli.getEmail()))
                .andExpect(jsonPath("$.data[0].nama").value(mockPembeli.getNama()));

        verify(pembeliService).get();
    }
//
    @Test
    void listPembeli_WhenNoPembeliExist_ReturnsNoContent() throws Exception {
        when(pembeliService.get()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/pembeli")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.status").value(HttpStatus.NO_CONTENT.value()))
                .andExpect(jsonPath("$.message").value("NO CONTENT"))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data").isEmpty());

        verify(pembeliService).get();
    }
}
