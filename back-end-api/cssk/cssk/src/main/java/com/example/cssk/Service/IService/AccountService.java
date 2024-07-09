package com.example.cssk.Service.IService;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;

import java.awt.image.BufferedImage;
import java.io.IOException;

public interface AccountService {
    JSONObject getSuccessResponse(String message, Object data);

    JSONObject getErrorResponse(String message);

    JSONObject getResponse(String status, String message, Object data);

    String hashString(String input);

    JSONObject login(String jsonString, HttpServletRequest request);

    JSONObject forgetPassword(String jsonString, HttpServletRequest request) throws JsonProcessingException;

    JSONObject confirm_code(String jsonString, HttpServletRequest request) throws JsonProcessingException;

    JSONObject confirm_password(String jsonString, HttpServletRequest request) throws JsonProcessingException;

    JSONObject generateCaptcha(HttpServletRequest request) throws IOException;

    JSONObject changePassword(String jsonString) throws JsonProcessingException;

    String convertBufferedImageToBase64(BufferedImage bufferedImage) throws IOException;

    JSONObject logout(HttpServletRequest request) throws IOException;

    JSONObject update2fa(String jsonString);

    String findUpdate2fa(String jsonString) throws JsonProcessingException;

    JSONObject getInfoUser();

    JSONObject deleteAccount(Long userId);

    JSONObject getInfoUserID(Long userId);

    JSONObject ToggleDisable(Long userId);
}
