package com.example.cssk.Service.Implement;

import com.example.cssk.Models.AdministrativePaperwork;
import com.example.cssk.Service.IService.AdministrativePaperworkService;
import com.example.cssk.Repository.AdministrativePaperworkRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AdministrativePaperworkImp implements AdministrativePaperworkService {
    @Autowired
    private final ObjectMapper objectMapper;
    @Autowired
    private final AdministrativePaperworkRepository repository;


    @Override
    public JSONObject createAdministrativePaperwork(Long elderlyId, String jsonString) throws JsonProcessingException {
        JSONObject response = new JSONObject();
        AdministrativePaperwork savedPaperwork = repository.findByElderlyId(elderlyId);
        AdministrativePaperwork requestPaperwork = createPaperworkFromJson(jsonString);
        if (savedPaperwork == null) {
            requestPaperwork.setStatus(false);
            requestPaperwork.setPaperworkId(findMaxPaperworkId());
            requestPaperwork.setCreated_at(LocalDateTime.now());
            requestPaperwork.setElderlyId(elderlyId);
            requestPaperwork.setUpdated_at(LocalDateTime.now());
            repository.save(requestPaperwork);
            return getSuccessResponse("The paperwork is added successfully", requestPaperwork);
        } else {
            response.put("status", "error");
            response.put("message", "The elderly already has paperwork");
            return response;
        }
    }

    @Override
    public JSONObject findAllAdministrativePaperwork() {
        JSONObject response = new JSONObject();
        List<AdministrativePaperwork> paperwork = repository.findAll();
        if (paperwork.isEmpty()) {
            response.put("status", "error");
            response.put("message", "The list is empty");
            return response;
        } else {
            response.put("status", "Success");
            response.put("data", paperwork);
            return response;
        }
    }

    @Override
    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    @Override
    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response;
    }

    @Override
    public AdministrativePaperwork createPaperworkFromJson(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, AdministrativePaperwork.class);
    }

    @Override
    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    @Override
    public long findMaxPaperworkId() {
        AdministrativePaperwork latestPaperwork = repository.findTopByOrderByPaperworkIdDesc();
        if (latestPaperwork != null) {
            return latestPaperwork.getPaperworkId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public String getPaperworkByPaperworkId(Long paperworkId) {
        JSONObject response = new JSONObject();
        AdministrativePaperwork paperwork = repository.findByPaperworkId(paperworkId);
        if (paperwork != null) {
            response.put("status", "Success");
            response.put("data", new JSONObject(paperwork));
            return response.toString();
        } else {
            response.put("status", "error");
            response.put("massage", "The id does not exist!. Get Information Fail");
            return response.toString();
        }
    }

    @Override
    public JSONObject updatePaperwork(Long elderlyId, String jsonString) throws JsonProcessingException {
        JSONObject response = new JSONObject();
        AdministrativePaperwork savedPaperwork = repository.findByElderlyId(elderlyId);
        if (savedPaperwork != null) {
            AdministrativePaperwork updatedPaperwork = createPaperworkFromJson(jsonString);
            updatedPaperwork.setUpdated_at(LocalDateTime.now());
            updatedPaperwork.setPaperworkId(savedPaperwork.getPaperworkId());
            updatedPaperwork.setCreated_at(savedPaperwork.getCreated_at());
            updatedPaperwork.setElderlyId(savedPaperwork.getElderlyId());
            repository.save(updatedPaperwork);
            return getSuccessResponse("Elderly updated successfully", new JSONObject(updatedPaperwork));
        } else {
            response.put("status", "error");
            response.put("massage", "The id does not exist!. Get Information Fail");
            return response;
        }
    }

    @Override
    public JSONObject deletePaperwork(Long elderlyId) {
        if (repository.findByElderlyId(elderlyId) != null) {
            repository.deleteAdministrativePaperworkByElderlyId(elderlyId);
            return getSuccessResponse("Elderly deleted successfully", null);
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "The id does not exist!. Get Information Fail");
            return response;
        }
    }

    @Override
    public JSONObject getPaperworkByElderlyId(Long elderlyId) {
        JSONObject response = new JSONObject();
        AdministrativePaperwork paperwork = repository.findByElderlyId(elderlyId);
        if (paperwork != null) {
            response.put("status", "success");
            response.put("data", new JSONObject(paperwork));
            return response;
        } else {
            response.put("status", "error");
            response.put("massage", "The paperwork does not exist!. Get Information Fail");
            return response;
        }
    }

}
