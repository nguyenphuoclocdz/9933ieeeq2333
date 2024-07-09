package com.example.cssk.Service.Implement;

import com.example.cssk.Models.ServicesArising;
import com.example.cssk.Repository.ServiceArisingRepository;
import com.example.cssk.Service.IService.ServiceArisingService;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceArisingImp implements ServiceArisingService {
    @Autowired
    private final ServiceArisingRepository serviceArisingRepository;
    @Override
    public String createServiceArising(String jsonString) {
        try {
            JSONObject requestData = new JSONObject(jsonString);
            ServicesArising servicesArising = new ServicesArising();
            servicesArising.setServicesArisingId(findMaxServiceArisingId());
            servicesArising.setService(requestData.getString("service"));
            servicesArising.setMoney(requestData.getLong("money"));
            servicesArising.setElderlyId(requestData.getLong("elderlyId"));
            servicesArising.setStatus(false);
            try {
                String date = requestData.getString("time");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate expiryDate = LocalDate.parse(date, formatter);
                LocalDateTime time = expiryDate.atStartOfDay().plusHours(7);
                servicesArising.setTime(time);
            } catch (DateTimeParseException e) {
                e.printStackTrace();
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Failed to parse to datetime");
                return response.toString();
            }
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Medicine created successfully");
            ServicesArising save = serviceArisingRepository.save(servicesArising);
            response.put("data", new JSONObject(save));
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Failed to create ServiceArising");
            return response.toString();
        }
    }
    @Override
    public long findMaxServiceArisingId() {
        ServicesArising latestId = serviceArisingRepository.findTopByOrderByServicesArisingIdDesc();
        if (latestId != null) {
            return latestId.getServicesArisingId() + 1;
        } else {
            return 1;
        }
    }
    @Override
    public String getServiceArisingByServiceArisingId(Long serviceArisingId) {
        JSONObject response = new JSONObject();
        ServicesArising servicesArising = serviceArisingRepository.findByServicesArisingId(serviceArisingId);
        if(servicesArising!= null){
            response.put("status", "success");
            response.put("data", new JSONObject(servicesArising));
            return response.toString();
        } else{
            response.put("status", "error");
            response.put("data", "The id does not exist");
            return response.toString();
        }
    }
    @Override
    public String findAllServiceArising() {
        JSONObject response = new JSONObject();
        List<ServicesArising> servicesArisings = serviceArisingRepository.findAll();
        if (servicesArisings.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Does not have any information");
            return response.toString();
        } else {
                response.put("status", "success");
                response.put("data", servicesArisings);
                return response.toString();
            }
    }

    @Override
    public String updateServiceArisingById(Long serviceArisingId, String jsonString) {
        ServicesArising servicesArising = serviceArisingRepository.findByServicesArisingId(serviceArisingId);
        if (servicesArising == null) {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "This arising with ID: " + serviceArisingId + " not found!");
            return response.toString();
        } else {
            try {
                JSONObject requestData = new JSONObject(jsonString);
                servicesArising.setService(requestData.getString("service"));
                servicesArising.setMoney(requestData.getLong("money"));
                ServicesArising save = serviceArisingRepository.save(servicesArising);
                JSONObject response = new JSONObject();
                response.put("status", "success");
                response.put("message", "Updated service arising successfully");
                response.put("data", new JSONObject(save));
                return response.toString();
            } catch (Exception e) {
                e.printStackTrace();
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Updated service arising fail");
                return response.toString();
            }
        }
    }
    @Override
    public String deleteServiceArising(Long serviceArisingId) {
        ServicesArising servicesArising = serviceArisingRepository.findByServicesArisingId(serviceArisingId);
        if (servicesArising != null) {
            serviceArisingRepository.deleteById(serviceArisingId);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("massage", "Delete Success!");
            return response.toString();
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Delete Fail! The id does not exist");
            return response.toString();
        }
    }

}
