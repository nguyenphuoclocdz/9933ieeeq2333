package com.example.cssk.Service.Implement.Users;

import com.example.cssk.Models.User;
import com.example.cssk.Service.IService.Users.IHRService;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Validation.Validation;
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
public class HRServiceImp implements IHRService {
    @Autowired
    private final UserRepository userRepository;

    @Override
    public String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(
                    input.getBytes(StandardCharsets.UTF_8));
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
    public long findMaxUserId() {
        User latestUser = userRepository.findTopByOrderByUserIdDesc();
        if (latestUser != null) {
            return latestUser.getUserId() + 1;
        } else {
            return 1;
        }
    }

    @Override
    public JSONObject createHR(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        JSONObject response = new JSONObject();
        Map<String, String> validationErrors = Validation.checkUsers(requestData, false);

        if (!validationErrors.isEmpty()) {
            JSONObject errorMessage = new JSONObject(validationErrors);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errorMessage.toString());
        }
        if (userRepository.existsByUsername(requestData.getString("username"))) {
            response.put("status", "error");
            response.put("message", "user name is already exist");
        } else  if (userRepository.existsByEmail(requestData.getString("email"))) {
            response.put("status", "error");
            response.put("message", "Email is already taken");
        } else  if (userRepository.existsByPhone(requestData.getString("phone"))) {
            response.put("status", "error");
            response.put("message", "Phone number is already taken");
        }
        else {
            User user = new User();
            user.setFullname(requestData.getString("fullname"));
            user.setUsername(requestData.getString("username"));
            user.setDomicile(requestData.getString("domicile"));
            user.setPhone(requestData.getString("phone"));
            user.setPassword(hashString(requestData.getString("password")));
            user.setEmail(requestData.getString("email"));
            user.setUserId(findMaxUserId());
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            user.setRole(5);
            user.setDisable(false);
            User createdUser = userRepository.save(user);
            response.put("status", "success");
            response.put("massage", "create successfully");
            response.put("data", new JSONObject(createdUser));

        }
        return response;
    }

    @Override
    public JSONObject getHRByHRId(Long userId) {
        if (userRepository.existsByUserId(userId)) {
            User user = userRepository.findByUserId(userId);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", new JSONObject(user));
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Get Information Fail");
            return response;
        }
    }

    @Override
    public JSONObject findAllHR() {
        JSONObject response = new JSONObject();
        List<User> users = userRepository.findAllByDisableFalseAndRole(5);
        if (users.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No users found with role 7");
        } else {
            response.put("status", "success");
            response.put("data", users);
        }
        return response;
    }

    @Override
    public JSONObject updateHR(Long userId, String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        JSONObject response = new JSONObject();
        User updatedUser = userRepository.findByUserId(userId);
        Map<String, String> validationErrors = Validation.checkUsers(requestData, true);
        if (!validationErrors.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, validationErrors.toString());
        } else if (!updatedUser.getEmail().equals(requestData.getString("email"))) {
            if (userRepository.existsByEmail(requestData.getString("email"))) {
                response.put("status", "error");
                response.put("message", "Email is already taken");
            }
        } else if(!updatedUser.getPhone().equals(requestData.getString("phone"))){
            if (userRepository.existsByPhone(requestData.getString("phone"))) {
                response.put("status", "error");
                response.put("message", "Phone number is already taken");
            }} else {
            LocalDateTime dateCreate = userRepository.findByUserId(userId).getCreated_at();


            updatedUser.setUpdatedAt(LocalDateTime.now());
            updatedUser.setFullname(requestData.getString("fullname"));
            updatedUser.setDomicile(requestData.getString("domicile"));
            updatedUser.setPhone(requestData.getString("phone"));

            updatedUser.setEmail(requestData.getString("email"));
            updatedUser.setCreated_at(dateCreate);
            User savedUser = userRepository.save(updatedUser);

            response.put("status", "success");
            response.put("data", new JSONObject(savedUser));
            return response;
        }
        return response;
    }


}
