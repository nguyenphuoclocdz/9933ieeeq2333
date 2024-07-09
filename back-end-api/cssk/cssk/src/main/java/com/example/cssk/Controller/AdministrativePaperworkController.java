package com.example.cssk.Controller;

import com.example.cssk.Service.IService.AdministrativePaperworkService;
import com.example.cssk.Service.IService.ElderlyProfileService;
import com.example.cssk.Service.Implement.AdministrativePaperworkImp;
import com.example.cssk.Service.Implement.ElderlyProfileServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paperwork")
@AllArgsConstructor
public class AdministrativePaperworkController {
    private final AdministrativePaperworkService AdministrativePaperworkService;
    private final ElderlyProfileService ElderlyProfileService;

    @GetMapping()
    private String getAll() {
        return AdministrativePaperworkService.findAllAdministrativePaperwork().toString();
    }

    @PostMapping("/{elderlyId}")
    private String addNew(@RequestBody String jsonString, @PathVariable Long elderlyId) throws JsonProcessingException {

        return AdministrativePaperworkService.createAdministrativePaperwork(elderlyId, jsonString).toString();
    }

    @PutMapping("/{elderlyId}")
    private String update(@RequestBody String jsonString, @PathVariable Long elderlyId) throws JsonProcessingException {
        return AdministrativePaperworkService.updatePaperwork(elderlyId, jsonString).toString();
    }

    @GetMapping("/{elderlyId}")
    private String getPaperwork(@PathVariable Long elderlyId) {
        return AdministrativePaperworkService.getPaperworkByElderlyId(elderlyId).toString();
    }

    @DeleteMapping("/{elderlyId}")
    private String deleteAdministrativePaperwork(@PathVariable Long elderlyId) {
        return AdministrativePaperworkService.deletePaperwork(elderlyId).toString();
    }

    @GetMapping("/createForm/{elderlyId}")
    private String creteForm( @PathVariable Long elderlyId) {
        return ElderlyProfileService.getFormOfElderly(elderlyId).toString();
    }
}
