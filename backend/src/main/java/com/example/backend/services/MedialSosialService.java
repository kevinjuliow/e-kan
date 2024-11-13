package com.example.backend.services;

import com.example.backend.models.MediaSosialModel;
import com.example.backend.repositories.MediaSosialRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class MedialSosialService {

    private MediaSosialRepo repo ;

    public List<MediaSosialModel> getAll () {
        return repo.findAll() ;
    }
    public MediaSosialModel getById (UUID id) {
        return repo.findById(id).get();
    }

    public MediaSosialModel saveMediaSosial (MediaSosialModel input)  {
        return repo.save(input);
    }

}
