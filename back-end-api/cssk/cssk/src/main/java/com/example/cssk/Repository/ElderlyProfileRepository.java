package com.example.cssk.Repository;

import com.example.cssk.Models.ElderlyProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ElderlyProfileRepository extends MongoRepository<ElderlyProfile, Long> {
    ElderlyProfile findTopByOrderByIdDesc();
}
