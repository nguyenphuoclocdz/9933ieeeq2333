package com.example.cssk.Controller.Users;

import com.example.cssk.Models.User;
import com.example.cssk.Service.Implement.Users.UserServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3001/")
@AllArgsConstructor
public class UserController {
    @Autowired
    private final UserServiceImp userServiceImp;

    @GetMapping
    public String getAllUser() throws JsonProcessingException {
        return userServiceImp.getAllUsers().toString();
    }

    @GetMapping("/{userId}")
    public Optional<Optional<User>> getUserByUserId(@PathVariable Long userId) throws JsonProcessingException {
        return Optional.ofNullable(userServiceImp.getUserByUserId(userId));
    }
    


    @PostMapping("/new")
    public String createUser(@RequestBody String jsonString) {
        return String.valueOf(userServiceImp.createUser(jsonString));
    }

    @PutMapping("/edit/{userId}")
    public String updateUser(@PathVariable Long userId, @RequestBody String jsonString) throws JsonProcessingException {
        return String.valueOf(userServiceImp.updateUser(userId, jsonString));
    }

    @GetMapping("/find")
    public String findUserByUserName(@RequestBody String jsonString){
        return String.valueOf(userServiceImp.getUserByUsername(jsonString));
    }

    @PostMapping("/register")
    public String registerUser(HttpServletRequest request, @RequestBody String Jon) {
        return String.valueOf(userServiceImp.Register(request ,Jon));
    }

    @PostMapping("/confirm")
    public String registerUser_Confirm(@RequestBody String Jon, HttpServletRequest request) throws JsonProcessingException {
        return String.valueOf(userServiceImp.registerUser(Jon, request));
    }

    @GetMapping("/elderly")
    public String listElderly() throws JsonProcessingException {
        return String.valueOf(userServiceImp.findAllElderlyByUserId());
    }


}
