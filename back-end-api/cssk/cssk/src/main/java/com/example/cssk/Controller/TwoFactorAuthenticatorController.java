package com.example.cssk.Controller;


import com.example.cssk.Service.IService.TwoFactorAuthenticatorService;
import com.example.cssk.Service.Implement.TwoFactorAuthenticatorImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.zxing.WriterException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class TwoFactorAuthenticatorController {

    private final TwoFactorAuthenticatorService TwoFactorAuthenticatorService;

    @Autowired
    public TwoFactorAuthenticatorController(TwoFactorAuthenticatorImp twoFactorAuthenticator) {
        this.TwoFactorAuthenticatorService = twoFactorAuthenticator;
    }

    @GetMapping()
    public String get2fa() throws JsonProcessingException {
        return TwoFactorAuthenticatorService.generateSecretKey().toString();
    }

    @GetMapping("/{SecretKey}")
    public String get2fa(@PathVariable String SecretKey) throws JsonProcessingException {
        return TwoFactorAuthenticatorService.generateOtp(SecretKey).toString();
    }


    @PostMapping()
    public String check2fa(@RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(TwoFactorAuthenticatorService.verifyOtp(jsonString));
    }


    @PostMapping("/user")
    public String check2faUser(@RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(TwoFactorAuthenticatorService.verifyOtpUser(jsonString));
    }

    @PostMapping("/2fa")
    public String create2fa(@RequestBody String jsonString) throws IOException, WriterException {
        JSONObject requestData = new JSONObject(jsonString);
        if (!requestData.has("secretKey") && requestData.has("username")) {
            return String.valueOf(TwoFactorAuthenticatorService.update2fa());
        } else {
            return String.valueOf(TwoFactorAuthenticatorService.findUpdate2fa(jsonString));
        }
    }

    @PostMapping("/2faVerify")
    public String verifyCreate(@RequestBody String jsonString) {
        return String.valueOf(TwoFactorAuthenticatorService.verifyCreate(jsonString));

    }

    @PostMapping("/verifyLogin")
    public String verifyLogin(@RequestBody String jsonString) {
        return String.valueOf(TwoFactorAuthenticatorService.verifyLogin(jsonString));

    }

    @GetMapping("/off2fa")
    public String off2fa() {
        return String.valueOf(TwoFactorAuthenticatorService.off2fa());

    }
}
