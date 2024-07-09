package com.example.cssk.Service.IService.Users;

import org.json.JSONObject;

public interface IHRService {
    JSONObject findAllHR();
    String hashString(String input);
    long findMaxUserId();
    JSONObject createHR(String jsonString);
    JSONObject getHRByHRId(Long userId);
    JSONObject updateHR(Long hrId, String jsonString);

}
