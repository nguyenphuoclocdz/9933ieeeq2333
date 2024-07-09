package com.example.cssk.Service.Implement;

import com.example.cssk.Models.User;
import com.example.cssk.Repository.UserRepository;
import com.example.cssk.Service.IService.TwoFactorAuthenticatorService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@AllArgsConstructor
public class TwoFactorAuthenticatorImp implements TwoFactorAuthenticatorService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final MongoTemplate mongoTemplate;

    // Generate a secret key for two-factor authentication
    public JSONObject generateSecretKey() {
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        GoogleAuthenticatorKey key = gAuth.createCredentials();
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("SecretKey", key.getKey());
        return response;
    }

    // Generate a one-time password (OTP) for a given secret key
    public JSONObject generateOtp(String SecretKey) {
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("otp", gAuth.getTotpPassword(SecretKey));
        return response;
    }

    // Verify the OTP provided by the user
    public JSONObject verifyOtp(String jsonString) {
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        JSONObject response = new JSONObject();
        JSONObject requestData = new JSONObject(jsonString);
        String SecretKey = requestData.getString("SecretKey");
        String OTP = requestData.getString("OTP");
        if (gAuth.authorize(SecretKey, Integer.parseInt(OTP))) {
            response.put("status", "success");
            return response;
        } else {
            response.put("status", "error");
            return response;
        }
    }

    // Verify the OTP provided by the user based on their user ID
    public JSONObject verifyOtpUser(String jsonString) {
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        JSONObject response = new JSONObject();
        JSONObject requestData = new JSONObject(jsonString);
        String UserId = requestData.getString("UserId");
        Long userId = Long.parseLong(UserId);
        User user = userRepository.findByUserId(userId);
        String OTP = requestData.getString("OTP");
        if (gAuth.authorize(user.getSecretKey(), Integer.parseInt(OTP))) {
            response.put("status", "success");
            return response;
        } else {
            response.put("status", "error");
            return response;
        }
    }

    // Update 2FA for a user and generate QR code for the updated secret key
    @Override
    public JSONObject update2fa() throws IOException, WriterException {

            GoogleAuthenticator gAuth = new GoogleAuthenticator();
            GoogleAuthenticatorKey key = gAuth.createCredentials();
            String secretKey = key.getKey();
            String qrCodeBase64 = generateQRCodeBase64(jwtTokenProviderServiceImp.GetUserName(), secretKey);
            JSONObject response = new JSONObject();
        System.out.println(jwtTokenProviderServiceImp.GetUserName());
            response.put("status", "success");
            response.put("secretKey", secretKey);
            response.put("image", "data:image/png;base64," + qrCodeBase64);
            return response;

    }

    // Generate QR code base64 string for the provided username and secret key
    private String generateQRCodeBase64(String username, String secretKey) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode("otpauth://totp/" + username + "?secret=" + secretKey + "&issuer=YourIssuer",
                com.google.zxing.BarcodeFormat.QR_CODE, 200, 200);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);
        return java.util.Base64.getEncoder().encodeToString(baos.toByteArray());
    }

    // Verify OTP for user creation and update user's secret key if OTP is valid
    @Override
    public JSONObject verifyCreate(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);

        String secretKey = requestData.getString("secretKey");
        String otp = requestData.getString("otp");

        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        if (gAuth.authorize(secretKey, Integer.parseInt(otp))) {
            Query query = new Query(Criteria.where("username").is(jwtTokenProviderServiceImp.GetUserName()));
            Update update = new Update().set("secretKey", secretKey);
            mongoTemplate.updateFirst(query, update, User.class);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Successfully created 2FA code");
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Incorrect or expired OTP");
            return response;
        }

    }

    // Verify OTP for user login
    @Override
    public JSONObject verifyLogin(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        String username = requestData.getString("username");
        String otp = requestData.getString("otp");
        User user = userRepository.findByUsername(username);
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        if (gAuth.authorize(user.getSecretKey(), Integer.parseInt(otp))) {
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "Login successful");
            String token = jwtTokenProviderServiceImp.generateToken(username, user.getUserId(), user.getRole());
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("username", user.getUsername());
            return response;
        } else {
            JSONObject response = new JSONObject();
            response.put("status", "error");
            response.put("message", "Incorrect or expired OTP");
            return response;
        }
    }

    // Turn off 2FA for a user
    @Override
    public JSONObject off2fa() {
            Query query = new Query(Criteria.where("token").is(jwtTokenProviderServiceImp.GetToken()));
            Update update = new Update().set("secretKey", "");
            mongoTemplate.updateFirst(query, update, User.class);
            JSONObject response = new JSONObject();
            response.put("status", "success");
            response.put("message", "2FA turned off successfully");
            return response;

    }

    // Find and update 2FA for a user
    @Override
    public String findUpdate2fa(String jsonString) throws JsonProcessingException {
        JSONObject requestData = new JSONObject(jsonString);
        String key = requestData.getString("secretKey");
        String jsonString_uot = new ObjectMapper().writeValueAsString(userRepository.findBySecretKey(key));
        return jsonString_uot;
    }
}
