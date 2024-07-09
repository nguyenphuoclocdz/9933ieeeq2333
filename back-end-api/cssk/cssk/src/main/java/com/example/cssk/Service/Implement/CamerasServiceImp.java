package com.example.cssk.Service.Implement;

import com.example.cssk.Models.Cameras;
import com.example.cssk.Models.Elderly;
import com.example.cssk.Repository.CamerasRepository;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Service.IService.CamerasService;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class CamerasServiceImp implements CamerasService {

    @Autowired
    private final CamerasRepository camerasRepository;
    @Autowired
    private final ElderlyRepository elderlyRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;


    @Override
    public String getAllCameras() {
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("data", camerasRepository.findAll());
        return response.toString();
    }

    @Override
    public JSONObject createCameras(String jsonString) {
        Cameras cameras = new Cameras();
        JSONObject requestData = new JSONObject(jsonString);
        String camerasId = requestData.getString("camerasId");
        cameras.setCameraId(camerasId);
        if (camerasRepository.existsById(camerasId)) {
            return show_result("error", "Cameras exist");
        }
        cameras.setCameraName(requestData.getString("cameraName"));
        cameras.setLink(requestData.getString("link"));
        cameras.setRoomLook(requestData.getString("roomLook"));
        camerasRepository.save(cameras);
        return show_result("success", "Cameras created successfully");
    }

    public String getCameraById(String camerasId) {
        Cameras cameras =  camerasRepository.findCamerasByCameraId(camerasId);
        if(cameras!= null){
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", new JSONObject(cameras));
            return response.toString();
        } else{
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("data", "The id does not exist");
            return response.toString();
        }
    }

    public String getCamerasForElderly() {
        List<Elderly> elderlies;
        if (jwtTokenProviderServiceImp.GetRole() == 1) {
            List<Cameras> allCameras = camerasRepository.findAll();

            JSONObject response = new JSONObject();
            if (!allCameras.isEmpty()) {
                response.put("status", "success");
                response.put("data", new JSONArray(allCameras));
            } else {
                response.put("status", "error");
                response.put("message", "No cameras found for the elderly");
            }

            return response.toString();
        } else {
            elderlies = elderlyRepository.findElderlyByUserId(jwtTokenProviderServiceImp.GetUserId());
            if (elderlies.isEmpty()) {
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "No elderly found for the user");
                return response.toString();
            }

            List<Cameras> allCameras = new ArrayList<>();
            Set<Cameras> addedCameras = new HashSet<>();
            for (Elderly elderly : elderlies) {
                String roomName = elderly.getRoomName();
                String[] roomNameParts = roomName.split("-");
                String roomLook = roomNameParts[0];

                List<Cameras> camerasInRoom = camerasRepository.findCamerasByRoomLook(roomLook);
                List<Cameras> camerasInLobby = camerasRepository.findCamerasByRoomLook("lobby");

                for (Cameras camera : camerasInRoom) {
                    if (addedCameras.add(camera)) {
                        allCameras.add(camera);
                    }
                }
                for (Cameras camera : camerasInLobby) {
                    if (addedCameras.add(camera)) {
                        allCameras.add(camera);
                    }
                }
            }

            JSONObject response = new JSONObject();
            if (!allCameras.isEmpty()) {
                response.put("status", "success");
                response.put("data", new JSONArray(allCameras));
            } else {
                response.put("status", "error");
                response.put("message", "No cameras found for the elderly");
            }

            return response.toString();
        }


    }



    @Override
    public JSONObject updateCameras(String jsonString, String camerasId) {
        JSONObject requestData = new JSONObject(jsonString);
        Cameras cameras =  camerasRepository.findCamerasByCameraId(camerasId);
        if(cameras!= null){
            cameras.setCameraName(requestData.getString("cameraName"));
            cameras.setLink(requestData.getString("link"));
            cameras.setRoomLook(requestData.getString("roomLook"));
            camerasRepository.save(cameras);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", new JSONObject(cameras));
            return response;
        } else{
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("data", "The id does not exist");
            return response;
        }
    }


    @Override
    public JSONObject deleteCameras(String camerasId) {
        Cameras cameras =  camerasRepository.findCamerasByCameraId(camerasId);
        if(cameras!= null){
            camerasRepository.deleteById(camerasId);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Delete successfully");
            return response;
        }
        else{
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Delete fail");
            return response;
        }
    }
    @Override
    public JSONObject show_result(String status, String message) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        return response;
    }
}
