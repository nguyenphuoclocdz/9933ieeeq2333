package com.example.cssk.Controller;

import com.example.cssk.Service.IService.MedicalHistoryService;
import com.example.cssk.Service.Implement.MedicalHistoryServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class MedicalHistoryController {
    @Autowired
    private final MedicalHistoryService MedicalHistoryService;

    @GetMapping()
    private String getAll(@RequestBody String jsonString){
        return MedicalHistoryService.findAllMedicalHistory(jsonString);
    }

    @GetMapping("/{elderlyId}")
    public String getMedicalHistoryByElderlyId(@PathVariable Long elderlyId) throws JsonProcessingException {
        return String.valueOf(MedicalHistoryService.getMedicalHistoryByElerlyId(elderlyId));
    }
    @PutMapping("/{elderlyId}")
    public String updateElderly(@PathVariable Long elderlyId, @RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(MedicalHistoryService.updateElderly(elderlyId, jsonString));
    }
    @DeleteMapping("/{elderlyId}")
    public String deleteMedicalHistoryByElderlyId(@PathVariable Long elderlyId,@RequestBody String jsonString) throws JsonProcessingException {
        return MedicalHistoryService.deleteMedicalHistoryByElderlyId(elderlyId, jsonString);
    }
}
