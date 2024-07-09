package com.example.cssk.Service.IService;

import com.example.cssk.Models.AdministrativePaperwork;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;

public interface AdministrativePaperworkService {

    JSONObject createAdministrativePaperwork(Long id, String jsonString) throws JsonProcessingException;
    JSONObject findAllAdministrativePaperwork();
    JSONObject getSuccessResponse(String message, Object data);
    JSONObject getResponse(String status, String message, Object data);;
    AdministrativePaperwork createPaperworkFromJson(String jsonString) throws JsonProcessingException;
    JSONObject getErrorResponse(String message);
    long findMaxPaperworkId();
    String getPaperworkByPaperworkId(Long paperworkId);
    JSONObject updatePaperwork(Long paperworkId, String jsonString) throws JsonProcessingException;
    JSONObject deletePaperwork(Long paperworkId);

    JSONObject getPaperworkByElderlyId(Long paperworkId);

}
