package com.example.cssk.Repository;



import com.example.cssk.Models.MedicalHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MedicalHistoryRepository extends MongoRepository<MedicalHistory, Long> {
    MedicalHistory findTopByOrderByIdDesc();
    MedicalHistory findByElderlyId(Long elderlyId);
    void deleteMedicalHistoryByElderlyId(Long elderlyId);
}
