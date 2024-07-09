package com.example.cssk.Service.Implement;

import com.example.cssk.Models.Elderly;
import com.example.cssk.Models.MedicalExamination;
import com.example.cssk.Models.User;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Repository.MedicalExaminationRepository;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Service.IService.MedicalExaminationService;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MedicalExaminationImp implements MedicalExaminationService {
    @Autowired
    private final MedicalExaminationRepository medicalExaminationRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ElderlyRepository elderlyRepository;

    @Override
    public String createMedicalExamination(String jsonString) {
        try {
            JSONObject requestData = new JSONObject(jsonString);
            User doctorInfo = userRepository.findByUserId(requestData.getLong("doctorId"));
            Elderly elderlyInfo = elderlyRepository.findByElderlyId(requestData.getLong("elderlyId"));
            MedicalExamination medicalExamination = new MedicalExamination();
            medicalExamination.setMedicalExaminationId(findMaxMedicalExaminationId());
            medicalExamination.setRoomName(elderlyInfo.getRoomName());
            medicalExamination.setDoctorId(doctorInfo.getUserId());
            medicalExamination.setElderlyId(elderlyInfo.getElderlyId());
            medicalExamination.setTitle(requestData.getString("title"));
            medicalExamination.setCreateTime(LocalDateTime.now());
            medicalExamination.setUpdateTime(LocalDateTime.now());
            medicalExamination.setDescription(requestData.getString("description"));
            medicalExamination.setRemove(false);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Examination created successfully");
            MedicalExamination save = medicalExaminationRepository.save(medicalExamination);
            response.put("data", new JSONObject(save));
            return response.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Failed to create Examination");
            return response.toString();
        }
    }

    @Override
    public long findMaxMedicalExaminationId() {
        MedicalExamination latestId = medicalExaminationRepository.findTopByOrderByMedicalExaminationIdDesc();
        if (latestId != null) {
            return latestId.getMedicalExaminationId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public String getMedicalExaminationByMedicalExaminationId(Long medicalExaminationId) {
        JSONObject response = new JSONObject();
        MedicalExamination medicalExamination = medicalExaminationRepository.findServicePackByMedicalExaminationId(medicalExaminationId);
        if (medicalExamination != null) {
            response.put("status", "success");
            response.put("data", new JSONObject(medicalExamination));
            return response.toString();
        } else {
            response.put("status", "error");
            response.put("data", "The id does not exist");
            return response.toString();
        }
    }

    @Override
    public String findAllMedicalExamination() {
        JSONObject response = new JSONObject();
        List<MedicalExamination> medicalExaminations = medicalExaminationRepository.findAllByRemoveFalse();
        if (medicalExaminations.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Does not have any information");
            return response.toString();
        } else {
            response.put("status", "success");
            response.put("data", medicalExaminations);
            return response.toString();
        }
    }

    @Override
    public String updateMedicalExaminationById(Long medicalExaminationId, String jsonString) {
        MedicalExamination medicalExamination = medicalExaminationRepository.findServicePackByMedicalExaminationId(medicalExaminationId);
        if (medicalExamination == null) {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "This examination with ID: " + medicalExaminationId + " not found!");
            return response.toString();
        } else {
            try {
                JSONObject requestData = new JSONObject(jsonString);
                medicalExamination.setUpdateTime(LocalDateTime.now());
                medicalExamination.setTitle(requestData.getString("title"));
                medicalExamination.setDescription(requestData.getString("description"));
                MedicalExamination save = medicalExaminationRepository.save(medicalExamination);
                JSONObject response = new JSONObject();
                response.put("status", "success");
                response.put("message", "Updated medical examination successfully");
                response.put("data", new JSONObject(save));
                return response.toString();
            } catch (Exception e) {
                e.printStackTrace();
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Updated medical examination fail");
                return response.toString();
            }
        }
    }

    @Override
    public String deleteMedicalExamination(Long medicalExaminationId) {
        MedicalExamination medicalExamination = medicalExaminationRepository.findServicePackByMedicalExaminationId(medicalExaminationId);
        if (medicalExamination != null) {
            medicalExamination.setRemove(true);
            medicalExaminationRepository.save(medicalExamination);
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

    public String findEXByElderlyId(Long elderlyId) {
        List<MedicalExamination> list = medicalExaminationRepository.findAllByElderlyIdAndRemoveFalse(elderlyId);
        JSONObject response = new JSONObject();
        if (list.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Does not have any information");
            return response.toString();
        } else {
            response.put("status", "success");
            response.put("data", list);
            return response.toString();
        }
    }
}
