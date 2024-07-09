package com.example.cssk.Service.IService;

import org.json.JSONObject;

public interface RoomService {
    String getAllUser();
    String getInfoAllRoom();
    String getRoom(String nameRoom);
    JSONObject createRoom(String jsonString);
    JSONObject updateRoom(String jsonString);
    JSONObject deleteRoom(String jsonString);
    String chooseService(long serviceId);
    String getAllRoomElderly();
}
