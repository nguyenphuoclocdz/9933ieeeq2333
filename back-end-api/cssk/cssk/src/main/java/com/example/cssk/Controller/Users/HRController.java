package com.example.cssk.Controller.Users;

import com.example.cssk.Service.Implement.Users.HRServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/hr")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class HRController {
    private final HRServiceImp hrServiceImp;

    @GetMapping()
    public String getAllHR() {
        return String.valueOf(hrServiceImp.findAllHR());
    }

    @PostMapping()
    public String createHR(@RequestBody String jsonString) {
        return String.valueOf(hrServiceImp.createHR(jsonString));
    }

    @GetMapping("/{hrId}")
    public String getInfoHR(@PathVariable Long hrId) {
        return String.valueOf(hrServiceImp.getHRByHRId(hrId));
    }

    @PutMapping("/{hrId}")
    public String updateHR(@PathVariable Long hrId, @RequestBody String jsonString) {
        return String.valueOf(hrServiceImp.updateHR(hrId, jsonString));
    }

}
