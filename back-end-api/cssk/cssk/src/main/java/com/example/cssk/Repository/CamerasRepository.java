package com.example.cssk.Repository;


import com.example.cssk.Models.Cameras;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface CamerasRepository extends MongoRepository<Cameras, String> {

Cameras findCamerasByCameraId(String camerasId);

    List<Cameras> findCamerasByRoomLook(String room);

}