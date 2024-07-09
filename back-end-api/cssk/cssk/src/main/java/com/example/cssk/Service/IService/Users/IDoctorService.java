package com.example.cssk.Service.IService.Users;

import org.json.JSONObject;

import java.io.IOException;

public interface IDoctorService {
    String hashString(String input);

    long findMaxUserId();

  //  String createDoctor(String jsonString);

 //   JSONObject createDoctor( JSON);

   // JSONObject createDoctor(JSONObject requestData);

    JSONObject createDoctor(String jsonString);

    JSONObject getDoctorByDoctorId(Long userId);

    JSONObject findAllDoctor();

    JSONObject updateDoctor(Long userId, String jsonString);


  //  void exportDoctorsToExcel(String filePath) throws IOException;

 //   void exportDoctorsToExcel() throws IOException;
}
