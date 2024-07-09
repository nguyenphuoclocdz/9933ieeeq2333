package com.example.cssk.Service.Implement;


import com.example.cssk.Models.MedicalHistory;
import com.example.cssk.Service.IService.MedicalHistoryService;
import com.example.cssk.Repository.MedicalHistoryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MedicalHistoryServiceImp implements MedicalHistoryService {
    @Autowired
    private final MedicalHistoryRepository medicalHistoryRepository;
    @Autowired
    private final ObjectMapper objectMapper;

    @Override
    public JSONObject createMedicalHistory(String jsonString, Long elderlyId) {
        try {
            JSONObject response = new JSONObject();

            MedicalHistory saveMH = medicalHistoryRepository.findByElderlyId(elderlyId);
            MedicalHistory MH = createMedicalHistoryFromJson(jsonString);

            if (saveMH == null) {

                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

                MH.setCreated_at(saveMH.getCreated_at());
                MH.setElderlyId(saveMH.getElderlyId());
                MH.setCreatedAt(LocalDateTime.now());
                MH.setUpdatedAt(LocalDateTime.now());

                MH.setId(findMaxId());
                MH.setCreatedAt(LocalDateTime.now());
                MH.setUpdatedAt(LocalDateTime.now());
                MedicalHistory createdMedicalHistory = medicalHistoryRepository.save(MH);

                response.put("status", "success");
                response.put("message", "create successfully");
                response.put("data", new JSONObject(createdMedicalHistory));
                return response;
            } else {
                response.put("status", "error");
                response.put("message", "create fail");
                return response;
            }
        } catch (JsonProcessingException e) {
            return getErrorResponse("Failed to create Medical History");
        }
    }

    private MedicalHistory createMedicalHistoryFromJson(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, MedicalHistory.class);
    }

    private JSONObject getErrorResponse(String message) {
        JSONObject response = new JSONObject();
        response.put("status", "error");
        response.put("message", "error");
        return response;
    }

    @Override
    public long findMaxId() {
        MedicalHistory latestMedicalHistory = medicalHistoryRepository.findTopByOrderByIdDesc();
        if (latestMedicalHistory != null) {
            return latestMedicalHistory.getId() + 1;
        } else {
            return 1;
        }
    }
    //  Override method to find all medical history for a user

    @Override
    public String findAllMedicalHistory(String jsonString) {
        JSONObject response = new JSONObject();
        List<MedicalHistory> MH = medicalHistoryRepository.findAll();
        if (MH.isEmpty()) {
            response.put("status", "error");
            response.put("message", "The list is empty");
            return response.toString();
        } else {
            response.put("status", "success");
            response.put("data", MH);
            return response.toString();
        }
    }


    @Override
    public JSONObject getMedicalHistoryByElerlyId(Long elderlyId) {
        JSONObject response = new JSONObject();
        MedicalHistory MH = medicalHistoryRepository.findByElderlyId(elderlyId);
        if (MH != null) {
            MedicalHistory medicalHistory = medicalHistoryRepository.findByElderlyId(elderlyId);

            response.put("status", "success");
            response.put("data", new JSONObject(medicalHistory));
            return response;
        } else {

            response.put("status", "error");
            response.put("massage", "Get Information Fail");
            return response;
        }
    }


    // update medical history by elderlyID
    //aaaa
    @Override
    public String updateElderly(Long elderlyId, String jsonString) throws JsonProcessingException {
        JSONObject response = new JSONObject();
        try {
            JSONObject requestData = new JSONObject(jsonString);

            MedicalHistory savedMH = medicalHistoryRepository.findByElderlyId(elderlyId);
            if (savedMH != null) {

                savedMH.setUpdatedAt(LocalDateTime.now());
                savedMH.setMedicalHistory(requestData.getString("history"));
                savedMH.setSigns(requestData.getString("signs"));
                savedMH.setSurgicalHistory(requestData.getString("surgicalHistory"));
                savedMH.setAllergyHistory(requestData.getString("allergyHistory"));
                savedMH.setPsychologicalHistory(requestData.getString("psychologicalHistory"));
                medicalHistoryRepository.save(savedMH);
                return getSuccessResponse("Elderly updated successfully", new JSONObject(savedMH));
            } else {
                response.put("status", "error");
                response.put("message", "The id does not exist! Get Information Fail");
                return response.toString();
            }
        } catch (JSONException e) {
            response.put("status", "error");
            response.put("message", "Invalid JSON format");
            return response.toString();
        } catch (DataAccessException e) {
            response.put("status", "error");
            response.put("message", "Database error occurred");
            return response.toString();
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "An error occurred");
            return response.toString();
        }
    }

    public String getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    private String getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        if (data != null) {
            response.put("data", data);
        }
        return response.toString();
    }

    @Override
    public String deleteMedicalHistoryByElderlyId(Long elderlyId, String jsonString) {
        JSONObject response = new JSONObject();
        if (medicalHistoryRepository.findByElderlyId(elderlyId) != null) {
            medicalHistoryRepository.deleteMedicalHistoryByElderlyId(elderlyId);
            return getSuccessResponse("Medic deleted successfully", null);
        } else {


            response.put("status", "error");
            response.put("massage", "Delete Fail");
            return response.toString();
        }

    }

}
