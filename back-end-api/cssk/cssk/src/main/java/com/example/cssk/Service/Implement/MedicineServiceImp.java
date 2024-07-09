package com.example.cssk.Service.Implement;

import com.example.cssk.Models.Medicine;
import com.example.cssk.Repository.MedicineRepository;
import com.example.cssk.Service.IService.MedicineService;
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
public class MedicineServiceImp implements MedicineService {
    @Autowired
    private final MedicineRepository medicineRepository;

    @Override
    public String createMedicine(String jsonString) {
        try {
            JSONObject requestData = new JSONObject(jsonString);
            Medicine medicine = new Medicine();
            medicine.setDrugName(requestData.getString("drugName"));
//            medicine.setRoute(requestData.getString("route"));
            medicine.setForm(requestData.getString("form"));
            medicine.setQuantity(requestData.getInt("quantity"));
            try {
                String expiryDateString = requestData.getString("expiryDate");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate expiryDate = LocalDate.parse(expiryDateString, formatter);
                LocalDateTime expiryDateTime = expiryDate.atStartOfDay().plusHours(7);
                medicine.setExpiryDate(expiryDateTime);
            } catch (DateTimeParseException e) {
                e.printStackTrace();
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Failed to parse expiry date");
                return response.toString();
            }
            medicine.setSideEffects(requestData.getString("sideEffects"));
            medicine.setIndications(requestData.getString("indications"));
            medicine.setContraindications(requestData.getString("contraindications"));
            medicine.setPrice(requestData.getDouble("price"));
            medicine.setMedicineId(findMaxMedicineId());
            medicine.setCreatedAt(LocalDateTime.now());
            medicine.setUpdatedAt(LocalDateTime.now());
            Medicine createdMedicine = medicineRepository.save(medicine);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Medicine created successfully");
            response.put("data", new JSONObject(createdMedicine));
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Failed to create medicine");
            return response.toString();
        }
    }

    private long findMaxMedicineId() {
        Medicine latestMedicine = medicineRepository.findTopByOrderByMedicineIdDesc();
        if (latestMedicine != null) {
            return latestMedicine.getMedicineId() + 1;
        } else {
            return 1;
        }
    }
    @Override
    public String getMedicineByMedicineId(Long medicineId) {
        JSONObject response = new JSONObject();
        Medicine medicine = medicineRepository.findByMedicineId(medicineId);
        if(medicine!= null){
            response.put("status", "success");
            response.put("data", new JSONObject(medicine));
            return response.toString();
        } else{
            response.put("status", "error");
            response.put("data", "The id does not exist");
            return response.toString();
        }
    }
    @Override
    public String findAllMedicine() {
        List<Medicine> allMedicine = medicineRepository.findAll();
        return getSuccessResponse("Medicine retrieved successfully", allMedicine);
    }

    @Override
    public String getSuccessResponse(String message, List<Medicine> data) {
        return getResponse("success", message, data);
    }

    @Override
    public String getResponse(String status, String message, List<Medicine> data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response.toString();
    }
    @Override
    public String updateMedicineById(Long medicineId, String jsonString) {
        Medicine existingMedicine = medicineRepository.findByMedicineId(medicineId);
        if (existingMedicine == null) {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Medicine with ID: " + medicineId + " not found!");
            return response.toString();
        } else {
            try {
                JSONObject requestData = new JSONObject(jsonString);
                existingMedicine.setDrugName(requestData.getString("drugName"));
//                existingMedicine.setRoute(requestData.getString("route"));
                existingMedicine.setForm(requestData.getString("form"));
                existingMedicine.setQuantity(requestData.getInt("quantity"));
                try {
                    // Parse expiry date string to LocalDate
                    String expiryDateString = requestData.getString("expiryDate");
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    LocalDate expiryDate = LocalDate.parse(expiryDateString, formatter);

                    // Convert to LocalDateTime in Vietnam time zone (plus 7 hours)
                    LocalDateTime expiryDateTime = expiryDate.atStartOfDay().plusHours(7);

                    // Set expiryDate and daysRemaining to the medicine object
                    existingMedicine.setExpiryDate(expiryDateTime);

                } catch (DateTimeParseException e) {
                    // Handle parsing exception
                    e.printStackTrace();
                    JSONObject response = new JSONObject();
                    response.put("status", "error");
                    response.put("message", "date invalid");
                    return response.toString();
                }
                existingMedicine.setSideEffects(requestData.getString("sideEffects"));
                existingMedicine.setIndications(requestData.getString("indications"));
                existingMedicine.setContraindications(requestData.getString("contraindications"));
                existingMedicine.setPrice(requestData.getDouble("price"));
                existingMedicine.setUpdatedAt(LocalDateTime.now());
                Medicine updatedMedicine = medicineRepository.save(existingMedicine);

                JSONObject response = new JSONObject();
                response.put("status", "success");
                response.put("message", "Updated medicine successfully");
                response.put("data", new JSONObject(updatedMedicine));
                return response.toString();
            } catch (Exception e) {
                e.printStackTrace();
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Updated medicine fail");
                return response.toString();
            }
        }
    }
    @Override
    public String deleteMedicine(Long medicineId) {
        Medicine medicine = medicineRepository.findByMedicineId(medicineId);
        if (medicine != null) {
            medicineRepository.deleteMedicineByMedicineId(medicineId);
            return getSuccessResponse("Elderly deleted successfully",null);
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Delete Fail! The id does not exist");
            return response.toString();
        }
    }


}
