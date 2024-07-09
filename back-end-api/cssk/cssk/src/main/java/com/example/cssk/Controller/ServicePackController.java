package com.example.cssk.Controller;

import com.example.cssk.Service.IService.ServicePackService;
import com.example.cssk.Service.Implement.ServiceServicePackServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pack")

public class ServicePackController {
    private final ServicePackService ServicePackService;

    public ServicePackController(ServiceServicePackServiceImp servicePackServiceImp) {
        this.ServicePackService = servicePackServiceImp;
    }

    @GetMapping()
    public String allServicePack(){
        return ServicePackService.allServicePack();
    }

    @GetMapping("/{packId}")
    public String getPackByPackId(@PathVariable long packId){
        return ServicePackService.getPackByPackId(packId);
    }

    @PostMapping()
    public String createServicePack(@RequestBody String jsonString){
        return ServicePackService.createServicePack(jsonString).toString();
    }

    @PutMapping()
    public String updateServicePack(@RequestBody String jsonString){
        return ServicePackService.updateServicePack(jsonString).toString();
    }

    @DeleteMapping()
    public String deleteServicePack(@RequestBody String jsonString){
        return ServicePackService.deleteServicePack(jsonString).toString();
    }
}
