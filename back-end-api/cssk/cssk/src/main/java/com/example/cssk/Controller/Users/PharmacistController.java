package com.example.cssk.Controller.Users;

import com.example.cssk.Service.Implement.Users.PharmacistServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacist")
@CrossOrigin(origins = "http://localhost:3001/")
public class PharmacistController {
    @Autowired
    private final PharmacistServiceImp pharmacistServiceImp;

    public PharmacistController(PharmacistServiceImp pharmacistServiceImp) {
        this.pharmacistServiceImp = pharmacistServiceImp;
    }
    @GetMapping()
    public String getAllPharmacist() {
        return pharmacistServiceImp.findAllPharmacist().toString();
    }
    @PostMapping()
    public String createPharmacist(@RequestBody String jsonString) {
        return String.valueOf(pharmacistServiceImp.createPharmacist(jsonString));
    }
    @GetMapping("/{pharmacistId}")
    public String getElderlyByPharmacistId(@PathVariable Long pharmacistId) {
        return pharmacistServiceImp.getPharmacistByPharmacistId(pharmacistId).toString();
    }
    @PutMapping("/{pharmacistId}")
    public String updatePharmacist(@PathVariable Long pharmacistId, @RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(pharmacistServiceImp.updatePharmacist(pharmacistId, jsonString));
    }


}
