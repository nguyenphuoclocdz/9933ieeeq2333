package com.example.cssk.Service.IService.Users;


import org.json.JSONObject;

public interface IAccountantService {


    String hashString(String input);

    long findMaxUserId();

    JSONObject createAccountant(String jsonString);

    JSONObject getAccountantByAccountantId(Long userId);

    JSONObject findAllAccountant();

    JSONObject updateAccountant(Long userId, String jsonString);


}
