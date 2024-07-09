package com.example.cssk.Controller.Users;


import com.example.cssk.Service.Implement.Users.DoctorServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class DoctorController {
    @Autowired
    private final DoctorServiceImp  doctorServiceImp;

    @GetMapping()
    public String getAllDoctor() {
        JSONObject doctorJson = doctorServiceImp.findAllDoctor();
        return doctorJson.toString();
    }

    @PostMapping()
    public String createDoctor(@RequestBody String jsonString) {
        return String.valueOf(doctorServiceImp.createDoctor(jsonString));
    }

    @GetMapping("/{doctorId}")
    public String getElderlyByAccountantId(@PathVariable Long doctorId) {
        JSONObject doctorJson = doctorServiceImp.getDoctorByDoctorId(doctorId);
        return doctorJson.toString();
    }

    @PutMapping("/{doctorId}")
    public String updateAccountant(@PathVariable Long doctorId, @RequestBody String jsonString) {
        return String.valueOf(doctorServiceImp.updateDoctor(doctorId, jsonString));
    }



}
