package com.example.backend.services;

import com.example.backend.dtos.ApiResponse;
import com.example.backend.dtos.mediaSosialDtos.MediaSosialDto;
import com.example.backend.models.MediaSosialModel;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sosial")
@AllArgsConstructor
public class MediaSosialController {

    private MedialSosialService service ;

    public ResponseEntity<ApiResponse<List<MediaSosialDto>>> index () {
        List<MediaSosialModel> list = service.getAll() ;

        if (list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ApiResponse<>(
                            HttpStatus.NO_CONTENT.value(),
                            "No Content" ,
                            null
                    )
            );
        }



        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                new ApiResponse<>(
                        HttpStatus.NO_CONTENT.value(),
                        "No Content" ,
                        null
                )
        );

    }
}
