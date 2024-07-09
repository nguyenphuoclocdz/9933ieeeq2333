package com.example.cssk.Service.Implement;

import com.example.cssk.Models.User;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Service.IService.AccountService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Random;

@Service
@AllArgsConstructor
public class AccountServiceImp implements AccountService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final SendEmailServiceImp sendEmailServiceImp;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private DefaultKaptcha captchaProducer;
    @Autowired
    private final MongoTemplate mongoTemplate;


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
        response.put("data", data);
        return response;
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
    public JSONObject login(String jsonString, HttpServletRequest request) {
        JSONObject requestData = new JSONObject(jsonString);
        String username = requestData.getString("username");
        String password = requestData.getString("password");
        String captcha = requestData.getString("captcha");
        if (captcha.equals(request.getSession().getAttribute("captcha"))) {
            User user = userRepository.findByUsername(username);
            if (user != null) {
                if (!user.isDisable()) {
                    String mkdamh = hashString(password);
                    String mkindb = user.getPassword();
                    if (mkdamh.matches(mkindb)) {
                        JSONObject response = new JSONObject();
                        response.put("status", "success");
                        request.getSession().setAttribute("username", username);
                        response.put("username", requestData.getString("username"));
                        if (user != null && user.getSecretKey() != null && !user.getSecretKey().isEmpty()) {
                            response.put("token", "");
                        } else {
                            String token = jwtTokenProviderServiceImp.generateToken(username, user.getUserId(), user.getRole());
                            response.put("token", token);
                            response.put("role", user.getRole());
                        }
                        request.getSession().setAttribute("checklogin", "true");
                        return response;
                    } else {
                        JSONObject response = new JSONObject();
                        response.put("status", "error");
                        response.put("message", "Username or password is not correct!");
                        return response;
                    }
                } else {
                    JSONObject response = new JSONObject();
                    response.put("status", "error");
                    response.put("message", "Your account is disable. Please contact to the admin for more information");
                    return response;
                }
            } else {
                JSONObject response = new JSONObject();
                response.put("status", "error");
                response.put("message", "Login fail");
                return response;
            }
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Captcha does not correct!");
            return response;
        }
    }

    @Override
    public JSONObject forgetPassword(String jsonString, HttpServletRequest request) throws JsonProcessingException {
        JSONObject jsonResult = new JSONObject();
        HttpSession session = request.getSession();
        JSONObject requestData = new JSONObject(jsonString);
        String email = requestData.getString("email");
        if (userRepository.existsByEmail(email)) {
            try {
                session.removeAttribute("code_reset");
                int randomNumber = new Random().nextInt(900000) + 100000;
                String subject = "OTP authentication";
                sendEmailServiceImp.send_otp(email, subject, randomNumber);
                request.getSession().setAttribute("code_reset", String.valueOf(randomNumber));
                jsonResult.put("status", "success");
                jsonResult.put("message", "Email sent successfully");
                return jsonResult;
            } catch (MailException e) {
                jsonResult.put("status", "error");
                jsonResult.put("message", e.getMessage());
                return jsonResult;
            }
        } else {
            jsonResult.put("status", "error");
            jsonResult.put("message", "email does not match!");
            return jsonResult;
        }
    }
    @Override
    public JSONObject confirm_code(String jsonString, HttpServletRequest request) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        HttpSession session = request.getSession(true);
        String enteredCode = requestData.getString("code");
        if (enteredCode.equals(request.getSession().getAttribute("code_reset"))) {
            JSONObject response = new JSONObject();
            response.put("status", "success");
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Incorrect code");
            return response;
        }
    }

    @Override
    public JSONObject confirm_password(String jsonString, HttpServletRequest request) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        String email = requestData.getString("email");
        String password1 = requestData.getString("password1");
        String password2 = requestData.getString("password2");
        if (password1.equals(password2)) {
            JSONObject response = new JSONObject();
            User user = userRepository.findByEmail(email);
            user.setPassword(hashString(password2));
            userRepository.save(user);
            response.put("status", "success");
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Password does not match!");
            return response;
        }
    }

    @Override
    public JSONObject generateCaptcha(HttpServletRequest request) throws IOException {
        String captchaText = captchaProducer.createText();
        request.getSession().setAttribute("captcha", captchaText);
        System.out.println(captchaText);
        BufferedImage bufferedImage = captchaProducer.createImage(captchaText);
        String base64Image = convertBufferedImageToBase64(bufferedImage);
        JSONObject response = new JSONObject();
        String luu = "data:image/png;base64," + base64Image;
        response.put("status", "success");
        response.put("captcha", luu);
        return response;
    }

    @Override
    public JSONObject changePassword(String jsonString) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        User user = userRepository.findByUsername(jwtTokenProviderServiceImp.GetUserName());
        String oldPassword = requestData.getString("oldPassword");
        String newPassword1 = requestData.getString("newPassword1");
        String newPassword2 = requestData.getString("newPassword2");
        if (user != null) {
            if (user.getPassword().equals(hashString(oldPassword))) {
                if (newPassword1.equals(newPassword2)) {
                    JSONObject response = new JSONObject();
                    user.setPassword(hashString(newPassword1));
                    userRepository.save(user);
                    response.put("status", "success");
                    response.put("massage", "change password successfully");
                    return response;
                } else {
                    JSONObject response = new JSONObject();
                    response.put("status", "error");
                    response.put("massage", "new password not match");
                    return response;
                }
            }
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "old password is not correct");
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("massage", "can not find user");
            return response;
        }
    }

    @Override
    public String convertBufferedImageToBase64(BufferedImage bufferedImage) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    public JSONObject logout(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        session.invalidate();
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("message", "log-out");
        return response;
    }

    @Override
    public String findUpdate2fa(String jsonString) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        String key = requestData.getString("secretKey");
        String jsonString_uot = new ObjectMapper().writeValueAsString(userRepository.findBySecretKey(key));
        return jsonString_uot;
    }

    @Override
    public JSONObject update2fa(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        String userId = requestData.getString("userId");
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        GoogleAuthenticatorKey key = gAuth.createCredentials();
        String secretKey = key.getKey();
        Query query = new Query(Criteria.where("userId").is(userId));
        Update update = new Update().set("secretKey", secretKey);
        mongoTemplate.updateFirst(query, update, User.class);
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("secretKey", secretKey);
        return response;

    }

    @Override
    public JSONObject getInfoUser() {
        String username = jwtTokenProviderServiceImp.GetUserName();
        System.out.println(username);
        User user = userRepository.findByUsername(username);
        JSONObject response = new JSONObject();
        String[] Rolename = {"", "Admin", "User", "Doctor", "Nurse", "HR", "Accountant", "Parmacsic"};
        response.put("status", "success");
        response.put("userId", user.getUserId());
        response.put("fullname", user.getFullname());
        response.put("phone", user.getPhone());
        response.put("email", user.getEmail());
        response.put("username", user.getUsername());
        response.put("role", user.getRole());
        response.put("role_name", Rolename[user.getRole()]);
        response.put("created_at", user.getCreated_at());
        if (user != null && user.getSecretKey() != null && !user.getSecretKey().isEmpty()) {
            response.put("secretKey", true);
        } else {
            response.put("secretKey", false);
        }
        if (user != null && user.getImage() != null && !user.getImage().isEmpty()) {
            response.put("image", user.getImage());
        } else {
            response.put("image", user.getImage());
        }
        response.put("created_at", user.getCreated_at());
        return response;
    }


    @Override
    public JSONObject deleteAccount(Long userId) {
        String checkuser = jwtTokenProviderServiceImp.GetUserName();
        User user = userRepository.findByUsername(checkuser);
        if ((checkuser != null) && (user.getRole() == 1 || user.getRole() == 5) && (userRepository.existsByUserId(userId))) {
            User deleteUser = userRepository.findByUserId(userId);
            deleteUser.setDisable(true);
            userRepository.save(deleteUser);
            return getSuccessResponse("User deleted successfully", null);
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "delete user error!");
            return response;
        }
    }

    @Override
    public JSONObject getInfoUserID(Long userId) {
        User user = userRepository.findByUserId(userId);
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("data", user);
        return response;
    }

    @Override
    public JSONObject ToggleDisable(Long userId) {
        JSONObject response = new JSONObject();
        User user = userRepository.findByUserId(userId);
        if (jwtTokenProviderServiceImp.GetRole() == 1) {
            user.setDisable(!user.isDisable());
            userRepository.save(user);
            response.put("status", "success");
            response.put("data", user);
        } else {
            response.put("status", "error");
            response.put("message", "Unauthorized");
        }
        return response;
    }

}
