package com.example.cssk.Controller;

import com.example.cssk.Service.IService.MedicalExaminationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/examination")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class MedicalExaminationController {
    @Autowired
    private final MedicalExaminationService MedicalExaminationService;

    @GetMapping()
    public String getAllMedicalExamination()  {
        return MedicalExaminationService.findAllMedicalExamination();
    }

    @GetMapping("/{medicalExaminationId}")
    public String getById(@PathVariable long medicalExaminationId ){
        return String.valueOf(MedicalExaminationService.getMedicalExaminationByMedicalExaminationId(medicalExaminationId));
    }
    @PostMapping()
    public String creatServiceArising(@RequestBody String jsonString) throws JsonProcessingException {
        return MedicalExaminationService.createMedicalExamination(jsonString);
    }
    @PutMapping("/{medicalExaminationId}")
    public String updateServiceArisingById(@PathVariable Long medicalExaminationId, @RequestBody String jsonString) throws JsonProcessingException {
        return MedicalExaminationService.updateMedicalExaminationById(medicalExaminationId, jsonString );
    }
    @DeleteMapping("/{medicalExaminationId}")
    public String deleteServiceArising(@PathVariable Long medicalExaminationId) throws JsonProcessingException {
        return MedicalExaminationService.deleteMedicalExamination(medicalExaminationId);
    }

    @GetMapping("/elderly/{elderlyId}")
    public String getByElderlyId(@PathVariable Long elderlyId){
        return MedicalExaminationService.findEXByElderlyId(elderlyId);
    }
}
