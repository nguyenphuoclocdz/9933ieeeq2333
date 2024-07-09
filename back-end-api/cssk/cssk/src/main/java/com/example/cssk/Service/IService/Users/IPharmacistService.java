package com.example.cssk.Service.IService.Users;


import com.example.cssk.Models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;

public interface IPharmacistService {
    JSONObject findAllPharmacist();
    String hashString(String input);
    long findMaxUserId();
    JSONObject createPharmacist(String jsonString);
    JSONObject getPharmacistByPharmacistId(Long pharmacistId);
    JSONObject updatePharmacist(Long pharmacistId, String jsonString) throws JsonProcessingException;

    User createNurseFromJson(String jsonString) throws JsonProcessingException;
}
