package com.example.cssk.Service.IService;

import com.example.cssk.Models.Medicine;

import java.util.List;

public interface MedicineService {
    String createMedicine(String jsonString);

    String getMedicineByMedicineId(Long medicineId);

    String findAllMedicine();

    String getSuccessResponse(String message, List<Medicine> data);

    String getResponse(String status, String message, List<Medicine> data);

    String updateMedicineById(Long medicineId, String jsonString);

    String deleteMedicine(Long medicineId);
}
