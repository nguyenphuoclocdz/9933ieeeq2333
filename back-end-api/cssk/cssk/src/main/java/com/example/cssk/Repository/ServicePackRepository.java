package com.example.cssk.Repository;

import com.example.cssk.Models.ServicePack;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServicePackRepository extends MongoRepository<ServicePack, String> {

    ServicePack findTopByOrderByPackIdDesc();

    ServicePack findServicePackByPackId(Long packID);

    ServicePack deleteServicePackByPackId(Long packID);
}