package com.example.backend.services;

import com.example.backend.Exceptions.GlobalExceptionHandler;
import com.example.backend.models.MediaSosialModel;
import com.example.backend.models.PenjualModel;
import com.example.backend.repositories.MediaSosialRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.Media;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class MedialSosialService {

    private final MediaSosialRepo repo ;

    public List<MediaSosialModel> getAll (PenjualModel id) {
        return repo.findByPenjual(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Penjual Not Found")
        );
    }
    public MediaSosialModel getById (UUID id) {
        return repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Media Social ID Not Found")
        );
    }

    public MediaSosialModel saveMediaSosial(MediaSosialModel input)  {
        return repo.save(input);
    }

    public MediaSosialModel update (MediaSosialModel input , UUID id ) {
        MediaSosialModel model =  repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Media Social ID Not Found")
        );

        if (!model.getPlatform().equals(input.getPlatform())){
            model.setPlatform(input.getPlatform());
        }
        if (!model.getNama_akun().equals(input.getNama_akun())){
            model.setNama_akun(input.getNama_akun());
        }
        if (!model.getUrl().equals(input.getUrl()) && input.getUrl() != null){
            model.setUrl(input.getUrl());
        }

        return repo.save(model);
    }

    public void delete (UUID id) {
        MediaSosialModel model =  repo.findById(id).orElseThrow(
                () -> new GlobalExceptionHandler.ResourceNotFoundException("Media Social ID Not Found")
        );
        repo.delete(model);
    }

}
