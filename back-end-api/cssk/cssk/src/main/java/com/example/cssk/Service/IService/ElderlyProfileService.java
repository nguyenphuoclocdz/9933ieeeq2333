package com.example.cssk.Service.IService;

import org.json.JSONObject;

public interface ElderlyProfileService {
    long findMaxId();
    JSONObject getFormOfElderly(Long elderlyId);
}

