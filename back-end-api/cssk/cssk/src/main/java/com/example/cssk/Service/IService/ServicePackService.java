package com.example.cssk.Service.IService;

import org.json.JSONObject;

public interface ServicePackService {
    String getPackByPackId(long packId);
    String allServicePack();
    JSONObject createServicePack(String jsonString);
    JSONObject updateServicePack(String jsonString);
    JSONObject deleteServicePack(String jsonString);
    JSONObject getSuccessResponse(String message, Object data);
    JSONObject getErrorResponse(String message);
    JSONObject getResponse(String status, String message, Object data);
}
