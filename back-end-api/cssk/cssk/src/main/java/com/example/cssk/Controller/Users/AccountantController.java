package com.example.cssk.Controller.Users;

import com.example.cssk.Service.Implement.Users.AccountantServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accountant")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class AccountantController {
    @Autowired
    private final AccountantServiceImp accountantServiceImp;

    @GetMapping()
    public String getAllAccountant() {
        return String.valueOf(accountantServiceImp.findAllAccountant());
    }

    @PostMapping()
    public String createAccountant(@RequestBody String jsonString){
        return String.valueOf(accountantServiceImp.createAccountant(jsonString));
    }

    @GetMapping("/{accountantId}")
    public String getElderlyByAccountantId(@PathVariable Long accountantId) {
        return String.valueOf(accountantServiceImp.getAccountantByAccountantId(accountantId));
    }

    @PutMapping("/{accountantId}")
    public String updateAccountant(@PathVariable Long accountantId, @RequestBody String jsonString) {
        return String.valueOf(accountantServiceImp.updateAccountant(accountantId, jsonString));
    }

}
