package com.example.cssk.Service.Implement.Users;

import com.example.cssk.Models.Elderly;
import com.example.cssk.Models.User;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Service.IService.Users.IUserService;
import com.example.cssk.Service.Implement.JwtTokenProviderServiceImp;
import com.example.cssk.Service.Implement.SendEmailServiceImp;
import com.example.cssk.Validation.Validation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;

@Service
@AllArgsConstructor
public class UserServiceImp implements IUserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ElderlyRepository elderlyRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final ObjectMapper objectMapper;
    @Autowired
    private final SendEmailServiceImp sendEmailServiceImp;
    @Override
    public JSONObject getAllUsers() {

        JSONObject response = new JSONObject();

        List<User> users ;

        users = userRepository.findAllByDisableFalseAndRole(2);
        if (users.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No users");
        } else {
            response.put("status", "success");
            response.put("data", users);
        }
        return response;
    }

    @Override
    public Optional<User> getUserByUserId(Long userId) {
        User user = userRepository.findByUserId(userId);
        return Optional.ofNullable(user);
    }

    @Override
    public JSONObject getUserByUsername(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        String token = requestData.getString("token");
        String username = jwtTokenProviderServiceImp.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        JSONObject response = new JSONObject();
        response.put("data", new JSONObject(user));
        return response;
    }

    @Override
    public JSONObject createUser(String jsonString) {
        try {
            User user = createUserFromJson(jsonString);
            if (userRepository.existsByUserId(user.getUserId())) {
                return getErrorResponse("User with the same ID already exists");
            }
            user.setRole(1);
            user.setDisable(false);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            User createdUser = userRepository.save(user);
            return getSuccessResponse("User created successfully", createdUser);
        } catch (JsonProcessingException e) {
            return getErrorResponse("Failed to create User");
        }

    }

    @Override
    public JSONObject updateUser(Long userId, String jsonString) {

        JSONObject requestData = new JSONObject(jsonString);
        Map<String, String> validationErrors = Validation.checkUsers(requestData, true);
        if (!validationErrors.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, validationErrors.toString());
        }

        LocalDateTime datecreate = userRepository.findByUserId(userId).getCreated_at();
        User user = userRepository.findByUserId(userId);
        user.setFullname(requestData.getString("fullname"));
        user.setPhone(requestData.getString("phone"));
        user.setDomicile(requestData.getString("domicile"));
        user.setUpdatedAt(LocalDateTime.now());
        user.setCreated_at(datecreate);
        User savedUser = userRepository.save(user);
        return getSuccessResponse("User updated successfully", savedUser);


    }

    @Override
    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    @Override
    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    @Override
    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", new JSONObject(data));
        return response;
    }

    @Override
    public User createUserFromJson(String jsonString) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, User.class);
    }

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
    public String Register(HttpServletRequest request, String jsonString) {
        JSONObject jsonResult = new JSONObject();
        HttpSession session = request.getSession();

        try {
            session.removeAttribute("code_register");
            JSONObject requestData = new JSONObject(jsonString);
            String email = requestData.getString("email");
            if (userRepository.existsByEmail(email)) {
                jsonResult.put("status", "error");
                jsonResult.put("message", "Email already exists!");
                return jsonResult.toString();
            } else if(userRepository.existsByUsername(requestData.getString("username"))){
                jsonResult.put("status", "error");
                jsonResult.put("message", "The username already exists!");
                return jsonResult.toString();
            }else {
                String username = requestData.getString("username");
                request.getSession().setAttribute("username", username);
                int randomNumber = new Random().nextInt(900000) + 100000;
                String subject = "OTP authentication";
                sendEmailServiceImp.send_otp(email, subject, randomNumber);
                request.getSession().setAttribute("code_register", String.valueOf(randomNumber));
                jsonResult.put("status", "success");
                jsonResult.put("message", "Email sent successfully");
                return jsonResult.toString();
            }
        } catch (MailException e) {
            jsonResult.put("status", "error");
            jsonResult.put("message", e.getMessage());
            return jsonResult.toString();
        }
    }

    @Override
    public String registerUser(String jsonString, HttpServletRequest request) throws JsonProcessingException {
        JSONObject jsonResult = new JSONObject();
        JSONObject requestData = new JSONObject(jsonString);
        String username = requestData.getString("username");
        User existingUserName = userRepository.findByUsername(username);
        if (existingUserName != null) {
            throw new RuntimeException("Username is already taken");
        } else {
            try {
                String enteredCode = requestData.getString("code");
                System.out.println(request.getSession().getAttribute("code_register"));
                if (enteredCode.equals(request.getSession().getAttribute("code_register"))) {
                    User usernew = new User();
                    usernew.setEmail(requestData.getString("email"));
                    usernew.setUserId(findMaxUserId());
                    usernew.setFullname(requestData.getString("fullname"));
                    usernew.setUsername(requestData.getString("username"));
                    usernew.setPassword(hashString(requestData.getString("password")));
                    usernew.setRole(2);
                    usernew.setDisable(false);
                    usernew.setPhone(requestData.getString("phone"));
                    usernew.setDomicile(requestData.getString("domicile"));
                    usernew.setCreatedAt(LocalDateTime.now());
                    usernew.setUpdatedAt(LocalDateTime.now());
                    userRepository.save(usernew);
                    jsonResult.put("status", "success");
                    jsonResult.put("message", "Code is correct");
                } else {
                    jsonResult.put("status", "error");
                    jsonResult.put("message", "Code is incorrect");
                }
                return jsonResult.toString();
            } catch (Exception e) {
                jsonResult.put("status", "error");
                jsonResult.put("message", e.getMessage());
                return jsonResult.toString();
            }
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
    public String findAllElderlyByUserId(){
        User user = userRepository.findByUserId(jwtTokenProviderServiceImp.GetUserId());
        List<Elderly> elderly = elderlyRepository.findElderlyByUserId(user.getUserId());
        if(elderly!=null){
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("data", elderly);
            return response.toString();
        }
        else{
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "Information is empty");
            return response.toString();
        }
    }
}
