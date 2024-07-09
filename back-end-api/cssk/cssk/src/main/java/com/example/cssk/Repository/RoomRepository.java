package com.example.cssk.Repository;


import com.example.cssk.Models.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface RoomRepository extends MongoRepository<Room, String> {
    boolean existsByNameRoom(String nameRoom);
    List<Room> findAllByServiceId(long serviceId);

    Room findByNameRoom(String nameRoom);

    Room findByElderlyId(Long ElderlyId);

    List<Room> findAllByServiceIdAndStatus(Long serviceId, int status);
    List<Room> findAllByStatus(int status);
}
