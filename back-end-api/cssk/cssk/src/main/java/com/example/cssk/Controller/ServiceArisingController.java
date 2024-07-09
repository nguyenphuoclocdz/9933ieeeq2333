package com.example.cssk.Controller;

import com.example.cssk.Service.IService.ServiceArisingService;
import com.example.cssk.Service.Implement.ServiceArisingImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/arising")
@AllArgsConstructor
public class ServiceArisingController {
    @Autowired
    private final ServiceArisingService ServiceArisingService;

    @GetMapping()
    public String getAllServiceArising()  {
        return ServiceArisingService.findAllServiceArising();
    }

    @GetMapping("/{serviceArisingId}")
    public String getById(@PathVariable long serviceArisingId ){
        return String.valueOf(ServiceArisingService.getServiceArisingByServiceArisingId(serviceArisingId));
    }
    @PostMapping()
    public String creatServiceArising(@RequestBody String jsonString) throws JsonProcessingException {
        return ServiceArisingService.createServiceArising(jsonString);
    }
    @PutMapping("/{serviceArisingId}")
    public String updateServiceArisingById(@PathVariable Long serviceArisingId, @RequestBody String jsonString) throws JsonProcessingException {
        return ServiceArisingService.updateServiceArisingById(serviceArisingId, jsonString );
    }
    @DeleteMapping("/{serviceArisingId}")
    public String deleteServiceArising(@PathVariable Long serviceArisingId) throws JsonProcessingException {
        return ServiceArisingService.deleteServiceArising(serviceArisingId);
    }

}
