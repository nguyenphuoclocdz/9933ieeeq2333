package com.example.cssk.Repository;

import com.example.cssk.Models.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MedicineRepository extends MongoRepository<Medicine, Long> {
    Medicine findTopByOrderByMedicineIdDesc();

    Medicine findByMedicineId(Long medicineId);

    void deleteMedicineByMedicineId(Long medicineId);
}
