package com.example.cssk.Service.IService;

public interface MedicalExaminationService {
    String createMedicalExamination(String jsonString);
    long findMaxMedicalExaminationId();
    String findAllMedicalExamination();
    String getMedicalExaminationByMedicalExaminationId(Long medicalExaminationId);
    String updateMedicalExaminationById(Long medicalExaminationId, String jsonString);
    String deleteMedicalExamination(Long medicalExaminationId);
    String findEXByElderlyId(Long elderlyId);
}
