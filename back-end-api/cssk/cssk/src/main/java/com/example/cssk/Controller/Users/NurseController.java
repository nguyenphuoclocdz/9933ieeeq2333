package com.example.cssk.Controller.Users;

import com.example.cssk.Service.Implement.Users.NurseServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nurse")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class NurseController {

    @Autowired
    private final NurseServiceImp nurseServiceImp;

    @GetMapping()
    public String getAllNurse() {
        return nurseServiceImp.findAllNurse().toString();
    }

    @PostMapping()
    public String createNurse(@RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(nurseServiceImp.createNurse(jsonString));
    }

    @GetMapping("/{nurseId}")
    public String getElderlyByNurseId(@PathVariable Long nurseId) {
        return nurseServiceImp.getNurseByNurseId(nurseId).toString();
    }

    @PutMapping("/{nurseId}")
    public String updateNurse(@PathVariable Long nurseId, @RequestBody String jsonString) throws JsonProcessingException {
        return nurseServiceImp.updateNurse(nurseId, jsonString).toString();
    }



}