package com.example.cssk.Controller;

import com.example.cssk.Service.Implement.AccountServiceImp;
import com.example.cssk.Service.IService.*;
import com.example.cssk.Service.Implement.Users.UserServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class AccountController {

    @Autowired
    private final AccountService AccountService;

    //@PostMapping("/login")
    //public String loginUser(@RequestBody String jsonString, HttpServletRequest request) {
    //    return String.valueOf(accountServiceImp.login(jsonString, request));
    //}
    @PostMapping("/login")
    public String loginUser(@RequestBody String jsonString, HttpServletRequest request) {
        return String.valueOf(AccountService.login(jsonString, request));
    }

    @PostMapping("/reset")
    public String forgetPass(@RequestBody String Jon, HttpServletRequest request) throws JsonProcessingException {
        return String.valueOf(AccountService.forgetPassword(Jon, request));
    }

    @PostMapping("/confirmCode")
    public String cofirmCode(@RequestBody String Jon, HttpServletRequest request) throws JsonProcessingException {
        return String.valueOf(AccountService.confirm_code(Jon, request));
    }

    @PostMapping("/confirmPassword")
    public String cofirmPassword(@RequestBody String Jon, HttpServletRequest request) throws JsonProcessingException {
        return String.valueOf(AccountService.confirm_password(Jon, request));
    }

    @GetMapping("/captcha")
    public String generateCaptcha(HttpServletRequest request) throws IOException {
        return String.valueOf(AccountService.generateCaptcha(request));
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) throws IOException {
        return String.valueOf(AccountService.logout(request));
    }

    @PostMapping("/changePassword")
    public String changePassword(@RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(AccountService.changePassword(jsonString));
    }

    @PostMapping("/2fa")
    public String create2fa(@RequestBody String jsonString) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        if (!requestData.has("secretKey") && requestData.has("userId")) {
            return String.valueOf(AccountService.update2fa(jsonString));
        } else {
            return String.valueOf(AccountService.findUpdate2fa(jsonString));
        }

    }

    @GetMapping("/info")
    public String info() {
        return String.valueOf(AccountService.getInfoUser());
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable Long userId) {
        return AccountService.deleteAccount(userId).toString();
    }

    @GetMapping("/info/{userId}")
    public String infoUserId(@PathVariable Long userId) {
        return String.valueOf(AccountService.getInfoUserID(userId));
    }

    @PutMapping("/disable/{userId}")
    public String ToggleDisable(@PathVariable Long userId){
        return String.valueOf(AccountService.ToggleDisable(userId));
    }
}
