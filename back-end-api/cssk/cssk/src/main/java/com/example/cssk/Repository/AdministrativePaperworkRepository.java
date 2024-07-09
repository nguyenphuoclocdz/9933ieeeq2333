package com.example.cssk.Repository;

import com.example.cssk.Models.AdministrativePaperwork;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdministrativePaperworkRepository extends MongoRepository<AdministrativePaperwork, Long> {
    AdministrativePaperwork findTopByOrderByPaperworkIdDesc();

    AdministrativePaperwork findByPaperworkId(Long id);

    AdministrativePaperwork findByElderlyId(Long id);

    AdministrativePaperwork deleteAdministrativePaperworkByElderlyId(Long id);


}
