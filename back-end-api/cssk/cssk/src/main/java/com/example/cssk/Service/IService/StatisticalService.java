package com.example.cssk.Service.IService;

import org.json.JSONObject;

public interface StatisticalService {
    JSONObject getStatistical();


    long countElderliesCreatedThisMonth();

    JSONObject getSuccessResponse(String message, Object data);

    JSONObject getErrorResponse(String message);

    JSONObject getResponse(String status, String message, Object data);
}
