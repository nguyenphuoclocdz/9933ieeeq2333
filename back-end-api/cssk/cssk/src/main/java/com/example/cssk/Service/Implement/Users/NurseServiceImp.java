package com.example.cssk.Service.Implement.Users;
import com.example.cssk.Models.User;
import com.example.cssk.Service.IService.Users.INurseService;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Service.Implement.JwtTokenProviderServiceImp;
import com.example.cssk.Validation.Validation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class NurseServiceImp implements INurseService {
    @Autowired
    private final UserRepository repository;
    @Autowired
    private final ObjectMapper objectMapper;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;

    @Override
    public JSONObject findAllNurse() {
        JSONObject response = new JSONObject();
        List<User> users;
        users = repository.findAllByDisableFalseAndRole(4);
        if (users.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No users found with role Accountant");
        } else {
            response.put("status", "success");
            response.put("data", users);
        }
        return response;
    }

    @Override
    public String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public long findMaxNurseId() {
        User latestUser = repository.findTopByOrderByUserIdDesc();
        if (latestUser != null) {
            return latestUser.getUserId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public JSONObject createNurse(String jsonString) throws JsonProcessingException {
        JSONObject response = new JSONObject();
        JSONObject requestData = new JSONObject(jsonString); // Chuyển đổi chuỗi JSON thành JSONObject

        Map<String, String> validationErrors = Validation.checkUsers(requestData, false);
        if (!validationErrors.isEmpty()) {
            JSONObject errorMessage = new JSONObject(validationErrors);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage.toString());
        }
        if (repository.existsByUsername(requestData.getString("username"))) {
            response.put("status", "error");
            response.put("message", "Username is already taken");
        } else if (repository.existsByEmail(requestData.getString("email"))) {
            response.put("status", "error");
            response.put("message", "Email is already taken");
        } else if (repository.existsByPhone(requestData.getString("phone"))) {
            response.put("status", "error");
            response.put("message", "Phone number is already taken");
        } else {
            User user = createNurseFromJson(jsonString);

            user.setUserId(findMaxNurseId());
            user.setUpdatedAt(LocalDateTime.now());
            user.setCreatedAt(LocalDateTime.now());
            user.setPassword(hashString(user.getPassword()));
            user.setRole(4);
            user.setDisable(false);
            User createdUser = repository.save(user);

            response.put("status", "success");
            response.put("massage", "Create successfully");
            response.put("data", new JSONObject(createdUser));
        }

        return response;
    }


    @Override
    public User createNurseFromJson(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, User.class);
    }

    @Override
    public JSONObject getNurseByNurseId(Long NurseId) {
        JSONObject response = new JSONObject();
        User user = repository.findByUserId(NurseId);
        if (user != null && user.getRole() == 4) {
            response.put("status", "success");
            response.put("data", new JSONObject(user));
            return response;
        } else {
            response.put("status", "error");
            response.put("data", "The Nurse that you searched does not exist!");
            return response;
        }
    }

    @Override
    public JSONObject updateNurse(Long nurseId, String jsonString) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        JSONObject response = new JSONObject();

        Map<String, String> validationErrors = Validation.checkUsers(requestData, true);
        if (!validationErrors.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, validationErrors.toString());
        }
        User savedNurse = repository.findByUserId(nurseId);
        if (savedNurse != null && savedNurse.getRole() == 4) {
            User updateNurse = createNurseFromJson(jsonString);
            savedNurse.setUpdatedAt(LocalDateTime.now());
            savedNurse.setFullname(updateNurse.getFullname());
            savedNurse.setDomicile(updateNurse.getDomicile());
            savedNurse.setPhone(updateNurse.getPhone());
            repository.save(savedNurse);
            response.put("status", "success");
            response.put("massage", "The nurse have been updated successfully");
            return response;
        } else {
            response.put("status", "error");
            response.put("massage", "The id does not exist!. Get Information Fail");
            return response;
        }
    }
}



