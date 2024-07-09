package com.example.cssk.Service.IService.Users;

import com.example.cssk.Models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;

public interface INurseService {
    JSONObject findAllNurse();

    String hashString(String input);

    long findMaxNurseId();

    JSONObject createNurse(String jsonString) throws JsonProcessingException;
    User createNurseFromJson(String String) throws JsonProcessingException;
    JSONObject getNurseByNurseId(Long NurseId);
    JSONObject updateNurse(Long NurseId, String jsonString) throws JsonProcessingException;

}

