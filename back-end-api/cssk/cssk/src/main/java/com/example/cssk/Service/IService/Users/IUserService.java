package com.example.cssk.Service.IService.Users;

import com.example.cssk.Models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;

import java.util.Optional;

public interface IUserService {
    JSONObject getAllUsers(); //check

    Optional<User> getUserByUserId(Long userId);

    JSONObject getUserByUsername(String jsonString);

    JSONObject createUser(String jsonString);

    JSONObject updateUser(Long userId, String jsonString);


    JSONObject getSuccessResponse(String message, Object data);

    JSONObject getErrorResponse(String message);

    JSONObject getResponse(String status, String message, Object data);

    User createUserFromJson(String jsonString) throws JsonProcessingException;

    String hashString(String input);

    String Register(HttpServletRequest request, String jsonString);

    String registerUser(String jsonString, HttpServletRequest request) throws JsonProcessingException;

    long findMaxUserId();
    String findAllElderlyByUserId();
}
