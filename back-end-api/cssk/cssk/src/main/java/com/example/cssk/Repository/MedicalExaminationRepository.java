package com.example.cssk.Repository;

import com.example.cssk.Models.MedicalExamination;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MedicalExaminationRepository extends MongoRepository<MedicalExamination, Long> {
    MedicalExamination findTopByOrderByMedicalExaminationIdDesc();

    MedicalExamination findServicePackByMedicalExaminationId(Long medicalExaminationId);

    MedicalExamination deleteByMedicalExaminationId(Long medicalExaminationId);

    List<MedicalExamination> findAllByRemoveFalse();

    List<MedicalExamination> findAllByElderlyIdAndRemoveFalse(Long elderlyId);

}
