package com.example.cssk.Repository;

import com.example.cssk.Models.ServicesArising;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ServiceArisingRepository extends MongoRepository<ServicesArising, Long> {
    ServicesArising findTopByOrderByServicesArisingIdDesc();
    ServicesArising findByServicesArisingId(Long servicesArisingId);
    List<ServicesArising> findByElderlyIdAndStatus(long elderlyId, boolean status);
}
