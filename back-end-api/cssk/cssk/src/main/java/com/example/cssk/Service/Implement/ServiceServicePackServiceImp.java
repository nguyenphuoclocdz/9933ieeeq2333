package com.example.cssk.Service.Implement;


import com.example.cssk.Models.ServicePack;
import com.example.cssk.Service.IService.ServicePackService;
import com.example.cssk.Repository.ServicePackRepository;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceServicePackServiceImp implements ServicePackService {
    @Autowired
    private final ServicePackRepository servicePackRepository;

    @Override
    public String allServicePack() {
        JSONObject response = new JSONObject();
        List<ServicePack> servicePack = servicePackRepository.findAll();
        if (servicePack.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No have service pack");
        } else {
            response.put("status", "success");
            response.put("data", servicePack);
        }
        return response.toString();
    }

    @Override
    public JSONObject createServicePack(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        ServicePack lastServicePack = servicePackRepository.findTopByOrderByPackIdDesc();
        Long newId = (lastServicePack != null) ? lastServicePack.getPackId() + 1 : 1;
        ServicePack servicePack = new ServicePack();
        servicePack.setPackId(newId);
        servicePack.setNamePack(requestData.getString("namepack"));
        servicePack.setMoney(requestData.getLong("money"));
        JSONArray descriptionArray = requestData.getJSONArray("serviceDetail");
        if (servicePack != null) {
            String[] serviceDetail = new String[descriptionArray.length()];
            for (int i = 0; i < descriptionArray.length(); i++) {
                serviceDetail[i] = descriptionArray.getString(i);
            }
            servicePack.setServiceDetail(serviceDetail);
            servicePackRepository.save(servicePack);
            return getResponse("success", "Service Pack create successfully", null);
        }
        else{
            return getErrorResponse("error");
        }
    }

    @Override
    public String getPackByPackId(long packId) {
        ServicePack servicePack = servicePackRepository.findServicePackByPackId(packId);
        if (servicePack != null) {
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", new JSONObject(servicePack));
            return response.toString();
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            return response.toString();
        }
    }

    @Override
    public JSONObject updateServicePack(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        long id = requestData.getLong("id");
        String namePack = requestData.getString("namepack");
        JSONArray descriptionArray = requestData.getJSONArray("serviceDetail");
        ServicePack servicePack = servicePackRepository.findServicePackByPackId(id);
        if (servicePack != null) {
            servicePack.setNamePack(namePack);
            servicePack.setMoney(requestData.getLong("money"));
            String[] serviceDetail = new String[descriptionArray.length()];
            for (int i = 0; i < descriptionArray.length(); i++) {
                serviceDetail[i] = descriptionArray.getString(i);
            }
            servicePack.setServiceDetail(serviceDetail);
            servicePackRepository.save(servicePack);
            return getResponse("success", "Service Pack updated successfully", null);
        } else {
            return getErrorResponse("Service Pack not found");
        }
    }


    @Override
    public JSONObject deleteServicePack(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        try {
            servicePackRepository.deleteServicePackByPackId(requestData.getLong("id"));
            return getSuccessResponse("Service Pack deleted successfully", null);
        } catch (Exception e) {
            return getErrorResponse("Failed to delete User");
        }
    }


    @Override
    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    @Override
    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    @Override
    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response;
    }
}
