package com.example.cssk.Service.Implement;

import com.example.cssk.Models.Elderly;
import com.example.cssk.Models.Room;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Service.IService.RoomService;
import com.example.cssk.Repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomServiceImp implements RoomService {

    @Autowired
    private final RoomRepository roomRepository;

    @Autowired
    private final ElderlyRepository elderlyRepository;

    @Override
    public String getAllUser() {
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("data", roomRepository.findAll());
        return response.toString();
    }

    @Override
    public String getInfoAllRoom() {
        JSONObject response = new JSONObject();
        JSONArray roomList = new JSONArray();

        List<Room> rooms = roomRepository.findAll();
        int occupiedBeds = 0;
        List<String> processedRooms = new ArrayList<>();

        for (Room room : rooms) {
            String roomId = room.getNameRoom();
            String roomNumber = roomId.split("-")[0];
            String bedNumber = roomId.split("-")[1];
            JSONObject roomJSON = new JSONObject();
            if (!processedRooms.contains(roomNumber)) {
                int totalBedsInRoom = getTotalBedsInRoom(rooms, roomNumber);
                int occupiedBedsInRoom = getOccupiedBedsInRoom(rooms, roomNumber);
                occupiedBeds += occupiedBedsInRoom;
                roomJSON.put("room_name", roomNumber);
                roomJSON.put("occupied_beds", occupiedBedsInRoom);
                roomJSON.put("total_beds", totalBedsInRoom);
                roomList.put(roomJSON);
                processedRooms.add(roomNumber);
            }
        }

        int totalBeds = rooms.size();
        int totalRooms = processedRooms.size();

        response.put("occupied_beds", occupiedBeds);
        response.put("occupancy_rate", (double) occupiedBeds / totalBeds);
        response.put("total_beds", totalBeds);
        response.put("total_rooms", totalRooms);
        response.put("status", "success");
        response.put("room_list", roomList);

        return response.toString();
    }

    @Override
    public String getRoom(String nameRoom) {
        JSONObject response = new JSONObject();
        JSONArray elderlyList = new JSONArray();

        List<Room> rooms = roomRepository.findAll();
        for (Room room : rooms) {
            String roomId = room.getNameRoom();
            if (roomId.startsWith(nameRoom + "-")) {
                Elderly elderly = elderlyRepository.findByElderlyId(room.getElderlyId());
                JSONObject elderlyJSON = new JSONObject();
                if (elderly != null) {
                    elderlyJSON.put("bed", roomId.split("-")[1]);
                    elderlyJSON.put("status", true);
                    elderlyJSON.put("ElderlyInfo", new JSONObject(elderly));
                    elderlyList.put(elderlyJSON);
                } else {
                    elderlyJSON.put("bed", roomId.split("-")[1]);
                    elderlyJSON.put("status", false);
                    elderlyList.put(elderlyJSON);
                }
            }

        }

        response.put("status", "success");
        response.put("room_name", nameRoom);
        response.put("elderly_info", elderlyList);
        return response.toString();
    }

    @Override
    public JSONObject createRoom(String jsonString) {
        Room room = new Room();
        JSONObject requestData = new JSONObject(jsonString);
        String nameRoom = requestData.getString("roomName")+"-"+requestData.getString("bedName");
        room.setNameRoom(nameRoom);
        room.setServiceId(requestData.getLong("serviceId"));
        room.setElderlyId(0L);
        if (roomRepository.existsByNameRoom(nameRoom)) {
            return show_result("error", "room name exist");
        }
        room.setStatus(0);
        room.setUser(0);
        roomRepository.save(room);
        return show_result("success", "Room created successfully");
    }

    @Override
    public JSONObject updateRoom(String jsonString) {
        Room room = new Room();
        JSONObject requestData = new JSONObject(jsonString);
        String nameroom = requestData.getString("nameRoom");
        room.setElderlyId(requestData.getLong("elderlyId"));
        room.setNameRoom(nameroom);
        if (!roomRepository.existsByNameRoom(nameroom)) {
            return show_result("error", "room name no exist");
        }
        Integer status = requestData.getInt("status");
        room.setStatus(status);
        room.setUser(0);
        roomRepository.save(room);
        return show_result("success", "Room update successfully");
    }

    @Override
    public JSONObject deleteRoom(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);

        String nameRoom = requestData.getString("nameroom");
        if (!roomRepository.existsByNameRoom(nameRoom)) {
            return show_result("error", "Room not exits!");
        }
        try {
            roomRepository.deleteById(nameRoom);
            return show_result("success", "Delete success!");
        } catch (Exception e) {
            return show_result("error", "Delete error!");
        }
    }

    public JSONObject show_result(String status, String message) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        return response;
    }

    private int getTotalBedsInRoom(List<Room> rooms, String roomNumber) {
        int count = 0;
        for (Room room : rooms) {
            if (room.getNameRoom().startsWith(roomNumber)) {
                count++;
            }
        }
        return count;
    }


    private int getOccupiedBedsInRoom(List<Room> rooms, String roomNumber) {
        int count = 0;
        for (Room room : rooms) {
            if (room.getNameRoom().startsWith(roomNumber) && room.getStatus() == 1) {
                count++;
            }
        }
        return count;
    }

    @Override
    public String chooseService(long serviceId) {
        List<Room> room = roomRepository.findAllByServiceId(serviceId);
        if (room == null || room.isEmpty()) {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Do not have any room with this service");
            return response.toString();
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", room);
            return response.toString();
        }
    }

    public String getAllRoomElderly() {
        List<Room> rooms = roomRepository.findAllByStatus(1);
        JSONObject response = new JSONObject();
        if (rooms == null || rooms.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Do not have any room!");
            return response.toString();
        }
        System.out.println(rooms.toString());
        JSONArray roomData = new JSONArray();
        for (Room room : rooms) {
            Elderly elderly = elderlyRepository.findByElderlyId(room.getElderlyId());
            String fullNameElderly = elderly.getFullNameElderly();
                String[] parts = room.getNameRoom().split("-");
                String roomName = "Room " + parts[0].trim() + " - Beds " + parts[1].trim();
            if(fullNameElderly!=null){
                JSONObject roomInfo = new JSONObject();
                roomInfo.put("fullNameElderly", fullNameElderly);
                roomInfo.put("room", roomName);
                roomInfo.put("elderlyId", room.getElderlyId());
                roomData.put(roomInfo);
            }
        }
        response.put("status", "success");
        response.put("room", roomData);
        return response.toString();
    }

}
