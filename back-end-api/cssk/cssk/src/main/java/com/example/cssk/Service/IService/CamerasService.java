package com.example.cssk.Service.IService;

import org.json.JSONObject;

public interface CamerasService {

    String getAllCameras();

    JSONObject createCameras(String jsonString);
    String getCameraById(String camerasId);
    JSONObject updateCameras(String jsonString, String camerasId);
    String getCamerasForElderly();
    JSONObject deleteCameras( String camerasId);

    JSONObject show_result(String status, String message);
}
