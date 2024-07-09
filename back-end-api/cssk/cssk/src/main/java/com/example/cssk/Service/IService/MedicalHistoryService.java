package com.example.cssk.Service.IService;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;

public interface MedicalHistoryService {

    JSONObject createMedicalHistory(String jsonString, Long elderlyId);

    long findMaxId();

    String findAllMedicalHistory(String jsonString);

    JSONObject getMedicalHistoryByElerlyId(Long elderlyId);

    String updateElderly(Long elderlyId, String jsonString) throws JsonProcessingException;

    String deleteMedicalHistoryByElderlyId(Long elderlyId, String jsonString);
}
