package com.example.cssk.Service.IService;

import com.example.cssk.Models.Elderly;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;

public interface ElderlyService {

    JSONObject findAllElderly();
    JSONObject getSuccessResponse(String message, Object data);
    JSONObject getResponse(String status, String message, Object data);
    String createElderly(String jsonString) throws JsonProcessingException;
    Elderly createElderlyFromJson(String jsonString) throws JsonProcessingException;
    JSONObject getErrorResponse(String message);
    long findMaxElderlyId();
    String getElderlyByElderlyId(Long elderlyId);
    JSONObject updateElderly(Long elderlyId, String jsonString);

    JSONObject updateStatus(Long elderlyId, String jsonString);

    JSONObject updateSR(Long elderlyId, String jsonString);

    JSONObject deleteElderly(Long elderlyId);
    JSONObject getElderlyByToken();
}
