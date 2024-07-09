package com.example.cssk.Service.Implement;

import com.example.cssk.Models.*;
import com.example.cssk.Repository.ElderlyRepository;
import com.example.cssk.Repository.PaymentRepository;
import com.example.cssk.Repository.UserRepository;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.text.DecimalFormat;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Service
@AllArgsConstructor
public class SendEmailServiceImp {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private DefaultKaptcha captchaProducer;
    @Autowired
    private final MongoTemplate mongoTemplate;
    @Autowired
    private final PaymentRepository paymentRepository;
    @Autowired
    private final ActivityHistoryImp activityHistoryImp;
    @Autowired
    private final ElderlyRepository elderlyRepository;


    public JSONObject getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    public JSONObject getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    public JSONObject getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response;
    }

    public JSONObject send_email(String jsonString) {
        JSONObject jsonResult = new JSONObject();
        JSONObject requestData = new JSONObject(jsonString);
        String email = requestData.getString("email");
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject(requestData.getString("subject"));

            String htmlContent = "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\" />\n" +
                    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                    "    <title>MUO - Technology, Simplified</title>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body style=\"font-family: Arial; margin: 0\">\n" +
                    "    <table style=\"\n" +
                    "        background-color: #f3f3f5;\n" +
                    "        padding: 16px 12px;\n" +
                    "        min-height: 100vh;\n" +
                    "        width: 80%;\n" +
                    "        margin: 0 auto;\n" +
                    "      \">\n" +
                    "        <tbody>\n" +
                    "            <tr>\n" +
                    "                <td style=\"vertical-align: top\">\n" +
                    "                    <table border=\"0\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"\n" +
                    "                width: 600px !important;\n" +
                    "                min-width: 600px !important;\n" +
                    "                max-width: 600px !important;\n" +
                    "                margin: auto;\n" +
                    "                border-spacing: 0;\n" +
                    "                border-collapse: collapse;\n" +
                    "                background: white;\n" +
                    "                border-radius: 0px 0px 10px 10px;\n" +
                    "                padding-left: 30px;\n" +
                    "                padding-right: 30px;\n" +
                    "                padding-top: 30px;\n" +
                    "                padding-bottom: 30px;\n" +
                    "                display: block;\n" +
                    "              \">\n" +
                    "                        <tbody>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"\n" +
                    "                      text-align: center;\n" +
                    "                      vertical-align: top;\n" +
                    "                      font-size: 0;\n" +
                    "                      border-collapse: collapse;\n" +
                    "                    \">\n" +
                    "                                    <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#F8F8F8\"\n" +
                    "                                        style=\"border-spacing: 0; border-collapse: collapse\">\n" +
                    "                                        <tbody>\n" +
                    "                                            <tr style=\"background-size: cover\">\n" +
                    "                                                <td style=\"\n" +
                    "                              width: 60%;\n" +
                    "                              text-align: left;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                              background: #fff;\n" +
                    "                              border-radius: 10px 10px 0px 0px;\n" +
                    "                              color: white;\n" +
                    "                              height: 50px;\n" +
                    "                            \">\n" +
                    "                                                    <img src=\"https://img.upanh.tv/2024/04/02/istockphoto-1371844292-170667a.jpg\"\n" +
                    "                                                        width=\"120px\" class=\"CToWUd\" />\n" +
                    "                                                </td>\n" +
                    "                                                <td style=\"\n" +
                    "                              width: 40%;\n" +
                    "                              text-align: right;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                              background: #fff;\n" +
                    "                              border-radius: 10px 10px 0px 0px;\n" +
                    "                              color: white;\n" +
                    "                              height: 50px;\n" +
                    "                            \">\n" +
                    "                                                    <div style=\"color: #828282; font-size: 14px\">\n" +
                    "                                                        02 Apr, 2024\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"\n" +
                    "                      vertical-align: top;\n" +
                    "                      font-size: 0;\n" +
                    "                      border-collapse: collapse;\n" +
                    "                    \">\n" +
                    "                                    <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#F8F8F8\"\n" +
                    "                                        style=\"border-spacing: 0; border-collapse: collapse\">\n" +
                    "                                        <tbody>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"\n" +
                    "                              padding-top: 30px;\n" +
                    "                              padding-bottom: 5px;\n" +
                    "                              background-color: white;\n" +
                    "                            \">\n" +
                    "                                                    <span style=\"font-size: 20px; color: #363636\">Hi !" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"\n" +
                    "                              padding-top: 5px;\n" +
                    "                              padding-bottom: 9px;\n" +
                    "                              background-color: white;\n" +
                    "                            \">\n" +
                    "                                                    <span style=\"\n" +
                    "                                font-size: 24px;\n" +
                    "                                color: #363636;\n" +
                    "                                font-weight: bold;\n" +
                    "                              \">Thank you for visiting our site.</span>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"\n" +
                    "                              padding: 10px 0px;\n" +
                    "                              background-color: white;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                            \">\n" +
                    "                                                    <div style=\"\n" +
                    "                                font-size: 18px;\n" +
                    "                                color: #828282;\n" +
                    "                                font-weight: normal;\n" +
                    "                              \">\n" +
                    "                                                        We hope you learnt something new today.\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "\n" +
                    "                                            <tr style=\"background-color: #ffd4e3\">\n" +
                    "                                                <td style=\"\n" +
                    "                              padding: 16px;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                              border-radius: 8px;\n" +
                    "                            \">\n" +
                    "                                                    <div style=\"\n" +
                    "                                font-size: 22px;\n" +
                    "                                color: #363636;\n" +
                    "                                font-weight: bold;\n" +
                    "                              \">\n" +
                    "                                                        Your verification code is!\n" +
                    "                                                    </div>\n" +
                    "                                                    <div style=\"\n" +
                    "                                font-size: 18px;\n" +
                    "                                margin-top: 8px;\n" +
                    "                                color: #444;\n" +
                    "                                margin-bottom: 20px;\n" +
                    "                              \">\n" +
                    "                                                        Rate our articles here.\n" +
                    "                                                    </div>\n" +
                    "\n" +
                    "                                                    <div style=\"width: 100%; display: flex\">\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">0</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">1</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">2</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">3</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">4</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">5</span>\n" +
                    "                                                        </a>\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"background: #ffffff; height: 20px\"></td>\n" +
                    "                                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                                <td>\n" +
                    "                                    <h1 style=\"text-align: left\">About Nursing home\n" +
                    "                                    </h1>\n" +
                    "                                    <p style=\"line-height: 1.4; letter-spacing: 0.5px\">\n" +
                    "                                        Welcome to An Nghi!\n" +
                    "                                        <br>\n" +
                    "                                        We are proud to be a dedicated senior care facility\n" +
                    "                                        committed to providing a safe, warm and supportive living environment for the\n" +
                    "                                        senior community.\n" +
                    "                                    </p>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td><br /></td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"\n" +
                    "                      background-color: #e23744;\n" +
                    "                      padding: 16px 0px;\n" +
                    "                      border-radius: 8px;\n" +
                    "                    \">\n" +
                    "                                    <h2 style=\"\n" +
                    "                        font-size: 35px;\n" +
                    "                        color: #ffffff;\n" +
                    "                        margin: 0;\n" +
                    "                        text-align: center;\n" +
                    "                      \">\n" +
                    "                                        Thanks You\n" +
                    "                                    </h2>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"text-align: center\">\n" +
                    "                                    <div style=\"\n" +
                    "                        width: 100%;\n" +
                    "                        margin-top: 30px;\n" +
                    "                        display: inline-block;\n" +
                    "                        border-top: 1px solid #e8e8e8;\n" +
                    "                      \"></div>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr></tr>\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                                <td>\n" +
                    "                                    <p style=\"\n" +
                    "                        line-height: 1.4;\n" +
                    "                        letter-spacing: 0.5px;\n" +
                    "                        text-align: center;\n" +
                    "                        color: #444;\n" +
                    "                        margin-bottom: 8px;\n" +
                    "                      \">\n" +
                    "                                        Copyright © 2024\n" +
                    "                                        <a href=\"https://vienduonglaoannghi.site/\"\n" +
                    "                                            style=\"text-decoration: none; color: #444\">vienduonglaoannghi.site</a>\n" +
                    "                                    </p>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                        </tbody>\n" +
                    "                    </table>\n" +
                    "                </td>\n" +
                    "            </tr>\n" +
                    "        </tbody>\n" +
                    "    </table>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>";

            // Thiết lập nội dung của email là HTML
            helper.setText(htmlContent, true);

            // Gửi email
            javaMailSender.send(message);
            jsonResult.put("status", "success");
            jsonResult.put("message", "Email sent successfully");
            return jsonResult;
        } catch (MessagingException | MailException e) {
            jsonResult.put("status", "error");
            jsonResult.put("message", e.getMessage());
            return jsonResult;
        }
    }


    public JSONObject send_otp(String email, String body, Integer randomNumber) {
        JSONObject jsonResult = new JSONObject();
        String[] parts = Integer.toString(randomNumber).split("(?<=.)");
        LocalDate currentDate = LocalDate.now();


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM, yyyy", Locale.ENGLISH);
        String formattedDate = currentDate.format(formatter);
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject(body);


            String htmlContent = "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\" />\n" +
                    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                    "    <title>MUO - Technology, Simplified</title>\n" +
                    "</head>\n" +
                    "\n" +
                    "<body style=\"font-family: Arial; margin: 0\">\n" +
                    "    <table style=\"\n" +
                    "        background-color: #f3f3f5;\n" +
                    "        padding: 16px 12px;\n" +
                    "        min-height: 100vh;\n" +
                    "        width: 80%;\n" +
                    "        margin: 0 auto;\n" +
                    "      \">\n" +
                    "        <tbody>\n" +
                    "            <tr>\n" +
                    "                <td style=\"vertical-align: top\">\n" +
                    "                    <table border=\"0\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" style=\"\n" +
                    "                width: 600px !important;\n" +
                    "                min-width: 600px !important;\n" +
                    "                max-width: 600px !important;\n" +
                    "                margin: auto;\n" +
                    "                border-spacing: 0;\n" +
                    "                border-collapse: collapse;\n" +
                    "                background: white;\n" +
                    "                border-radius: 0px 0px 10px 10px;\n" +
                    "                padding-left: 30px;\n" +
                    "                padding-right: 30px;\n" +
                    "                padding-top: 30px;\n" +
                    "                padding-bottom: 30px;\n" +
                    "                display: block;\n" +
                    "              \">\n" +
                    "                        <tbody>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"\n" +
                    "                      text-align: center;\n" +
                    "                      vertical-align: top;\n" +
                    "                      font-size: 0;\n" +
                    "                      border-collapse: collapse;\n" +
                    "                    \">\n" +
                    "                                    <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#F8F8F8\"\n" +
                    "                                        style=\"border-spacing: 0; border-collapse: collapse\">\n" +
                    "                                        <tbody>\n" +
                    "                                            <tr style=\"background-size: cover\">\n" +
                    "                                                <td style=\"\n" +
                    "                              width: 60%;\n" +
                    "                              text-align: left;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                              background: #fff;\n" +
                    "                              border-radius: 10px 10px 0px 0px;\n" +
                    "                              color: white;\n" +
                    "                              height: 50px;\n" +
                    "                            \">\n" +
                    "                                                    <img src=\"https://img.upanh.tv/2024/04/02/istockphoto-1371844292-170667a.jpg\"\n" +
                    "                                                        width=\"120px\" class=\"CToWUd\" />\n" +
                    "                                                </td>\n" +
                    "                                                <td style=\"\n" +
                    "                              width: 40%;\n" +
                    "                              text-align: right;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                              background: #fff;\n" +
                    "                              border-radius: 10px 10px 0px 0px;\n" +
                    "                              color: white;\n" +
                    "                              height: 50px;\n" +
                    "                            \">\n" +
                    "                                                    <div style=\"color: #828282; font-size: 14px\">\n" +
                    "                                                        "+formattedDate+"\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"\n" +
                    "                      vertical-align: top;\n" +
                    "                      font-size: 0;\n" +
                    "                      border-collapse: collapse;\n" +
                    "                    \">\n" +
                    "                                    <table border=\"0\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#F8F8F8\"\n" +
                    "                                        style=\"border-spacing: 0; border-collapse: collapse\">\n" +
                    "                                        <tbody>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"\n" +
                    "                              padding-top: 30px;\n" +
                    "                              padding-bottom: 5px;\n" +
                    "                              background-color: white;\n" +
                    "                            \">\n" +
                    "                                                    <span style=\"font-size: 20px; color: #363636\">Hi " +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"\n" +
                    "                              padding-top: 5px;\n" +
                    "                              padding-bottom: 9px;\n" +
                    "                              background-color: white;\n" +
                    "                            \">\n" +
                    "                                                    <span style=\"\n" +
                    "                                font-size: 24px;\n" +
                    "                                color: #363636;\n" +
                    "                                font-weight: bold;\n" +
                    "                              \">Thank you for visiting our site.</span>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"\n" +
                    "                              padding: 10px 0px;\n" +
                    "                              background-color: white;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                            \">\n" +
                    "                                                    <div style=\"\n" +
                    "                                font-size: 18px;\n" +
                    "                                color: #828282;\n" +
                    "                                font-weight: normal;\n" +
                    "                              \">\n" +
                    "                                                        We hope you learnt something new today.\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "\n" +
                    "                                            <tr style=\"background-color: #ffd4e3\">\n" +
                    "                                                <td style=\"\n" +
                    "                              padding: 16px;\n" +
                    "                              border-collapse: collapse;\n" +
                    "                              border-radius: 8px;\n" +
                    "                            \">\n" +
                    "                                                    <div style=\"\n" +
                    "                                font-size: 22px;\n" +
                    "                                color: #363636;\n" +
                    "                                font-weight: bold;\n" +
                    "                              \">\n" +
                    "                                                        Your verification code is!\n" +
                    "                                                    </div>\n" +
                    "                                                    <div style=\"\n" +
                    "                                font-size: 18px;\n" +
                    "                                margin-top: 8px;\n" +
                    "                                color: #444;\n" +
                    "                                margin-bottom: 20px;\n" +
                    "                              \">\n" +
                    "                                                        Use this code to identify.\n" +
                    "                                                    </div>\n" +
                    "\n" +
                    "                                                    <div style=\"width: 100%; display: flex\">\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">"+parts[0]+"</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">"+parts[1]+"</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">"+parts[2]+"</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">"+parts[3]+"</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">"+parts[4]+"</span>\n" +
                    "                                                        </a>\n" +
                    "                                                        <a style=\"\n" +
                    "                                  text-decoration: none;\n" +
                    "                                  width: 9%;\n" +
                    "                                  color: #1c1c1c;\n" +
                    "                                \" target=\"_blank\">\n" +
                    "                                                            <span style=\"\n" +
                    "                                    width: 70%;\n" +
                    "                                    padding-top: 20%;\n" +
                    "                                    padding-bottom: 20%;\n" +
                    "                                    padding-left: 5%;\n" +
                    "                                    padding-right: 5%;\n" +
                    "                                    border-radius: 20%;\n" +
                    "                                    border: 1px solid #f4a1bd;\n" +
                    "                                    display: block;\n" +
                    "                                    margin-bottom: 5px;\n" +
                    "                                    font-size: 20px;\n" +
                    "                                    font-weight: bold;\n" +
                    "                                    text-align: center;\n" +
                    "\n" +
                    "                                    background: #ffffff;\n" +
                    "                                  \">"+parts[5]+"</span>\n" +
                    "                                                        </a>\n" +
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"background: #ffffff; height: 20px\"></td>\n" +
                    "                                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                                <td>\n" +
                    "                                    <h1 style=\"text-align: left\">About Nursing home\n" +
                    "                                    </h1>\n" +
                    "                                    <p style=\"line-height: 1.4; letter-spacing: 0.5px\">\n" +
                    "                                        Welcome to An Nghi!\n" +
                    "                                        <br>\n" +
                    "                                        We are proud to be a dedicated senior care facility\n" +
                    "                                        committed to providing a safe, warm and supportive living environment for the\n" +
                    "                                        senior community.\n" +
                    "                                    </p>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td><br /></td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"\n" +
                    "                      background-color: #e23744;\n" +
                    "                      padding: 16px 0px;\n" +
                    "                      border-radius: 8px;\n" +
                    "                    \">\n" +
                    "                                    <h2 style=\"\n" +
                    "                        font-size: 35px;\n" +
                    "                        color: #ffffff;\n" +
                    "                        margin: 0;\n" +
                    "                        text-align: center;\n" +
                    "                      \">\n" +
                    "                                        Thanks You\n" +
                    "                                    </h2>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr>\n" +
                    "                                <td style=\"text-align: center\">\n" +
                    "                                    <div style=\"\n" +
                    "                        width: 100%;\n" +
                    "                        margin-top: 30px;\n" +
                    "                        display: inline-block;\n" +
                    "                        border-top: 1px solid #e8e8e8;\n" +
                    "                      \"></div>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                            <tr></tr>\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                                <td>\n" +
                    "                                    <p style=\"\n" +
                    "                        line-height: 1.4;\n" +
                    "                        letter-spacing: 0.5px;\n" +
                    "                        text-align: center;\n" +
                    "                        color: #444;\n" +
                    "                        margin-bottom: 8px;\n" +
                    "                      \">\n" +
                    "                                        Copyright © 2024\n" +
                    "                                        <a href=\"https://vienduonglaoannghi.site/\"\n" +
                    "                                            style=\"text-decoration: none; color: #444\">vienduonglaoannghi.site</a>\n" +
                    "                                    </p>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                        </tbody>\n" +
                    "                    </table>\n" +
                    "                </td>\n" +
                    "            </tr>\n" +
                    "        </tbody>\n" +
                    "    </table>\n" +
                    "</body>\n" +
                    "\n" +
                    "</html>";


            helper.setText(htmlContent, true);
            javaMailSender.send(message);
            jsonResult.put("status", "success");
            jsonResult.put("message", "Email sent successfully");
            return jsonResult;
        } catch (MessagingException | MailException e) {
            jsonResult.put("status", "error");
            jsonResult.put("message", e.getMessage());
            return jsonResult;
        }
    }


    public JSONObject send_mail_payment(String email, String body, String qr, Integer id) {
        JSONObject jsonResult = new JSONObject();
        String service_data = "";
        DecimalFormat decimalFormat = new DecimalFormat("#,### VND");
        Payment payment = paymentRepository.findPaymentByPaymentID(id);
        LocalDateTime currentDate = payment.getCreated_at();
        for (Services service : payment.getServices()) {
            service_data += "<tr><td style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">"
                    +service.getName()+"<br></td><td style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">"
                    +decimalFormat.format(service.getPrice())+"<br></td></tr>";
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM, yyyy", Locale.ENGLISH);
        String formattedDate = currentDate.format(formatter);
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject(body);


            String htmlContent = "<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:800px\" border=\"0\">\n" +
                    "  <tbody>\n" +
                    "    <tr>\n" +
                    "      <td align=\"center\" style=\"background-color:#ffffff\" bgcolor=\"#ffffff\" border=\"0\">\n" +
                    "\n" +
                    "        <table style=\"max-width:740px;width:100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "          <tbody>\n" +
                    "            <tr>\n" +
                    "              <td align=\"center\" style=\"margin-left:0px;margin-right:0px;padding:0px 15px 0px 15px\" border=\"0\">\n" +
                    "                <p></p>\n" +
                    "                <table style=\"width:100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "                  <tbody>\n" +
                    "                    <tr>\n" +
                    "                      <td style=\"border-bottom:3px solid #72bf00;padding:20px 0px 20px 0px\">\n" +
                    "                        <table style=\"width:100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "                          <tbody>\n" +
                    "                            <tr>\n" +
                    "                              <td style=\"font-size:0px;padding:0px 1px 0px 1px\" border=\"0\">\n" +
                    "                                <table style=\"width:100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "                                  <tbody>\n" +
                    "                                    <tr>\n" +
                    "                                      <td align=\"left\" valign=\"middle\" style=\"width:68%;font-size:0px;min-height:1px\"\n" +
                    "                                        border=\"0\">\n" +
                    "                                        <table\n" +
                    "                                          style=\"width:100%;max-width:100%;border-collapse:collapse;word-break:break-word\"\n" +
                    "                                          cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "                                          <tbody>\n" +
                    "                                            <tr>\n" +
                    "                                              <td width=\"21\"\n" +
                    "                                                style=\"vertical-align:middle;border-collapse:collapse;word-break:break-word\"\n" +
                    "                                                border=\"0\">\n" +
                    "                                                <a href=\"tel:1900545413\"\n" +
                    "                                                  style=\"font-family:'SF Pro Text',Arial,sans-serif;text-align:left;text-decoration:none;color:#4a4a4a\"\n" +
                    "                                                  target=\"_blank\">\n" +
                    "                                                  <img\n" +
                    "                                                    src=\"https://ci3.googleusercontent.com/meips/ADKq_NYBTAFr35Uc3uHwCM33VdOs403wgCsDoYHlq1rjm7LdXSLipN8p3q_FDIJWA3lmGWXU9Y4bzmf7-KbwuZfeRChBEqReKPVVInIZUISXMR2sfCOohlOpKgitD96q910BOZoMKQWLL5PmZwblKGg=s0-d-e1-ft#https://portal.vietcombank.com.vn/content/imagebase/PublishingImages/DigiBank/phone.png\"\n" +
                    "                                                    width=\"16\" alt=\"Vietcombank\"\n" +
                    "                                                    style=\"width:16px;max-width:100%;display:inline-block;height:auto\"\n" +
                    "                                                    border=\"0\" height=\"16\" class=\"CToWUd\" data-bit=\"iit\">\n" +
                    "                                                </a>\n" +
                    "                                              </td>\n" +
                    "                                              <td width=\"130\"\n" +
                    "                                                style=\"vertical-align:middle;border-collapse:collapse;word-break:break-word\"\n" +
                    "                                                border=\"0\">\n" +
                    "                                                <a href=\"tel:1900545413\"\n" +
                    "                                                  style=\"font-family:'SF Pro Text',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;text-decoration:none;color:#00381a\"\n" +
                    "                                                  target=\"_blank\">\n" +
                    "                                                  +1 (909) 5678999\n" +
                    "                                                </a>\n" +
                    "                                              </td>\n" +
                    "                                              <td style=\"border-collapse:collapse;word-break:break-word\" border=\"0\">\n" +
                    "                                              </td>\n" +
                    "                                            </tr>\n" +
                    "                                            <tr>\n" +
                    "                                              <td width=\"21\"\n" +
                    "                                                style=\"vertical-align:middle;border-collapse:collapse;word-break:break-word\"\n" +
                    "                                                border=\"0\">\n" +
                    "                                                <a href=\"https://portal.vietcombank.com.vn\"\n" +
                    "                                                  style=\"font-family:'SF Pro Text',Arial,sans-serif;text-align:left;text-decoration:none;color:#4a4a4a\"\n" +
                    "                                                  target=\"_blank\"\n" +
                    "                                                  data-saferedirecturl=\"https://www.google.com/url?q=https://portal.vietcombank.com.vn&amp;source=gmail&amp;ust=1713235037513000&amp;usg=AOvVaw20_1Nd1lsrtwwSoUvI3krK\">\n" +
                    "                                                  <img\n" +
                    "                                                    src=\"https://ci3.googleusercontent.com/meips/ADKq_NaSgvcWvSioZYbsnLzfw_sBtwCNeRDLKwoeuQnIvF-Z32YCDWUojnANYVpuUHUndKXCBBTgKxeIAsRzqWzgp79uoAy7yIqpEWEYs6Ig_GG1FBr-tQWNaKYjgD6seALb9wnRk-7aoQoQ2Nk2ayE=s0-d-e1-ft#https://portal.vietcombank.com.vn/content/imagebase/PublishingImages/DigiBank/globe.png\"\n" +
                    "                                                    width=\"17\" alt=\"Vietcombank\"\n" +
                    "                                                    style=\"width:17px;max-width:100%;display:inline-block;height:auto\"\n" +
                    "                                                    border=\"0\" height=\"17\" class=\"CToWUd\" data-bit=\"iit\">\n" +
                    "                                                </a>\n" +
                    "                                              </td>\n" +
                    "                                              <td width=\"230\"\n" +
                    "                                                style=\"vertical-align:middle;border-collapse:collapse;word-break:break-word\"\n" +
                    "                                                border=\"0\">\n" +
                    "                                                <a href=\"https://portal.vietcombank.com.vn\"\n" +
                    "                                                  style=\"font-family:'SF Pro Text',Arial,sans-serif;font-size:14px;line-height:20px;text-align:left;text-decoration:none;color:#00381a\"\n" +
                    "                                                  target=\"_blank\"\n" +
                    "                                                  data-saferedirecturl=\"https://www.google.com/url?q=https://portal.vietcombank.com.vn&amp;source=gmail&amp;ust=1713235037514000&amp;usg=AOvVaw0pXdX5hFg-lPuECW_wm5V3\">\n" +
                    "                                                  Vienduonglaoannghi.site\n" +
                    "                                                </a>\n" +
                    "                                              </td>\n" +
                    "                                              <td style=\"border-collapse:collapse;word-break:break-word\" border=\"0\">\n" +
                    "                                              </td>\n" +
                    "                                            </tr>\n" +
                    "                                          </tbody>\n" +
                    "                                        </table>\n" +
                    "                                      </td>\n" +
                    "                                      <td align=\"left\" valign=\"middle\" style=\"width:32%;font-size:0px;min-height:1px\"\n" +
                    "                                        border=\"0\">\n" +
                    "                                        <p\n" +
                    "                                          style=\"font-family:'SF Pro Text',Arial,sans-serif;font-size:12px;line-height:16px;text-align:right;margin:0px;color:#4a4a4a\">\n" +
                    "                                          <img src=\"https://img.upanh.tv/2024/04/02/istockphoto-1371844292-170667a.jpg\"\n" +
                    "                                            width=\"135\" alt=\"Vietcombank\"\n" +
                    "                                            style=\"width:135px;max-width:100%;display:inline-block;height:auto\"\n" +
                    "                                            border=\"0\" height=\"54.5\" class=\"CToWUd\" data-bit=\"iit\">\n" +
                    "                                        </p>\n" +
                    "                                      </td>\n" +
                    "                                    </tr>\n" +
                    "                                  </tbody>\n" +
                    "                                </table>\n" +
                    "                              </td>\n" +
                    "                            </tr>\n" +
                    "                          </tbody>\n" +
                    "                        </table>\n" +
                    "                      </td>\n" +
                    "                    </tr>\n" +
                    "                    <tr>\n" +
                    "                      <td align=\"left\" style=\"padding:30px 0px 20px 0px\" border=\"0\">\n" +
                    "                        <p\n" +
                    "                          style=\"font-family:'SF Pro Text',Arial,sans-serif;font-size:24px;line-height:29px;text-align:center;margin:0px;color:#4a4a4a\">\n" +
                    "                          <b>Automatic Bill Payment</b>\n" +
                    "\n" +
                    "                        </p>\n" +
                    "                      </td>\n" +
                    "                    </tr>\n" +
                    "                    <tr>\n" +
                    "                      <td align=\"left\" style=\"font-size:14px;line-height:20px;padding:0px 0px 30px 0px\" border=\"0\">\n" +
                    "                        <table\n" +
                    "                          style=\"width:100%;max-width:100%;border-collapse:collapse;word-break:break-word;min-width:640px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5\"\n" +
                    "                          cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "                          <tbody>\n" +
                    "                            <tr>\n" +
                    "                              <td width=\"200\"\n" +
                    "                                style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                                <b>Invoice creation date\n" +
                    "                                </b>\n" +
                    "                              </td>\n" +
                    "                              <td colspan=\"3\"\n" +
                    "                                style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                                "+formattedDate+"</td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                            <td\n" +
                    "                              style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                              <b>Service fees</b>\n" +
                    "                            </td>\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                              <td\n" +
                    "                                style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                                <b>Type of service</b><br>\n" +
                    "                              </td>\n" +
                    "                              <td\n" +
                    "                                style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                                <b>Price</b><br>\n" +
                    "                              </td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    service_data+
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                            <tr>\n" +
                    "                              <td\n" +
                    "                                style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                                <b>Total</b><br>\n" +
                    "                              </td>\n" +
                    "                              <td\n" +
                    "                                style=\"font-family:'SF Pro Text',Arial,sans-serif;border-collapse:collapse;word-break:break-word;font-size:14px;border-top:1px solid #c5c5c5;border-right:1px solid #c5c5c5;border-bottom:1px solid #c5c5c5;border-left:1px solid #c5c5c5;padding:5px 10px 5px 10px\">\n" +
                    "                                "+decimalFormat.format(payment.getMoney())+"<br>\n" +
                    "                              </td>\n" +
                    "                            </tr>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "                          </tbody>\n" +
                    "                        </table>\n" +
                    "                      </td>\n" +
                    "                    </tr>\n" +
                    "\n" +
                    "                    <tr>\n" +
                    "                      <td style=\"padding:0px 0px 30px 0px\" border=\"0\" align=\"center\">\n" +
                    "                        <p>You can scan the following QR to pay\n</p>\n" +
                    "<img width=\"30%\" alt=\"picture qr\" src=\""+uploadImage(payment.getQrdata())+"\">"+
                    "                      </td>\n" +
                    "                    </tr>\n" +
                    "\n" +
                    "                    <tr>\n" +
                    "                      <td style=\"padding:0px 0px 30px 0px\" border=\"0\" align=\"left\">\n" +
                    "                        <p\n" +
                    "                          style=\"font-family:'SF Pro Text','Arial',sans-serif;font-size:14px;line-height:20px;text-align:justify;margin:0px;color:#4a4a4a\">\n" +
                    "                          This is an automated email. Please do not send mail to this address. If you have any questions related to the service, please contact (i) Vienduonglaoangghi.site's customer support center at phone number +1 (909) 5678999; or (ii) interact directly on the channel at the Nursing Home; or (iii) contact support types at .\n" +
                    "California" +
                    "                        </p>\n" +
                    "                      </td>\n" +
                    "                    </tr>\n" +
                    "\n" +
                    "                  </tbody>\n" +
                    "                </table>\n" +
                    "              </td>\n" +
                    "            </tr>\n" +
                    "          </tbody>\n" +
                    "        </table>\n" +
                    "\n" +
                    "      </td>\n" +
                    "    </tr>\n" +
                    "  </tbody>\n" +
                    "</table>";

            helper.setText(htmlContent, true);

            javaMailSender.send(message);
            jsonResult.put("status", "success");
            jsonResult.put("message", "Email sent successfully");
            return jsonResult;
        } catch (MessagingException | MailException e) {
            jsonResult.put("status", "error");
            jsonResult.put("message", e.getMessage());
            return jsonResult;
        }
    }



    public String send_mail_activity() {
        List<Elderly> listElderly = elderlyRepository.findByStatus(1);
        for(Elderly listElderly_list: listElderly){
        JSONObject jsonResult = new JSONObject();
        LocalDateTime dateTime = LocalDateTime.now();
        LocalDate datetoday = LocalDate.now();
        List<ActivityHistory> activityHistories = activityHistoryImp.findActivityHistoryByDateTime(dateTime, listElderly_list.getElderlyId());
        String data_activity = "";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd MMM, yyyy", Locale.ENGLISH);
        for(ActivityHistory activityHistories_list : activityHistories){
            data_activity+="<div style=\"height: 50px; display: flex; align-items: center; \"><div style=\"height: 25px;width: 25px;background-color: #11cdef;border-radius: 100rem; margin-right: 30px;\">" +
                    "</div><span>"+activityHistories_list.getTitle()+"</span></div><div style=\"height: 50px; border-left: 2px solid #ccc; margin-left: 12px; padding-left: 44px;\">" +
                    "<div style=\"height: inherit; display: flex; flex-direction: column;\">" +
                    "<span style=\"margin-bottom: 10px;\">"+activityHistories_list.getTime().format(formatter)+" - <p>"+activityHistories_list.getHistory()+"</p></span></div></div><br>";
        }
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(userRepository.findByUserId(listElderly_list.getUserId()).getEmail());
            helper.setSubject("Activity report on "+datetoday+" of "+listElderly_list.getFullNameElderly());


            String htmlContent = "\n" +
                    "<div style=\"min-width:100%;width:100%!important;min-width:300px;max-width:100%;margin:0 auto;font-family:'SF Pro Text',Arial,sans-serif;min-height:100%;padding:0px;background-color:#e8e8e8\"\n" +
                    "    bgcolor=\"#e8e8e8\">\n" +
                    "    <div class=\"adM\">\n" +
                    "    </div>\n" +
                    "    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "        <tbody>\n" +
                    "            <tr>\n" +
                    "                <td align=\"center\" border=\"0\">\n" +
                    "\n" +
                    "                    <table style=\"width:100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                    "                        <tbody>\n" +
                    "                            <tr>\n" +
                    "                                <td align=\"center\" border=\"0\">\n" +
                    "                                    <table style=\"width:100%\" cellpadding=\"0\" cells pacing=\"0\" border=\"0\">\n" +
                    "                                        <tbody>\n" +
                    "                                            <tr>\n" +
                    "                                                <td align=\"center\"\n" +
                    "                                                    style=\"margin-left:0px;margin-right:0px;padding:20px 0px 20px 0px\"\n" +
                    "                                                    border=\"0\">\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                        </tbody>\n" +
                    "                    </table>\n" +
                    "\n" +
                    "\n" +
                    "                    <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:800px\" border=\"0\">\n" +
                    "                        <tbody>\n" +
                    "                            <tr>\n" +
                    "                                <td align=\"center\" style=\"background-color:#ffffff; border-radius: 20px;\"\n" +
                    "                                    bgcolor=\"#ffffff\" border=\"0\">\n" +
                    "\n" +
                    "                                    <table style=\"max-width:740px;width:100%; margin-top: 20px\" cellpadding=\"0\"\n" +
                    "                                        cellspacing=\"0\" border=\"0\">\n" +
                    "                                        <tbody>\n" +
                    "                                            <tr>\n" +
                    "                                                <td style=\"margin-left:0px;margin-right:0px;padding:0px 15px 0px 15px\"\n" +
                    "                                                    border=\"0\">\n" +
                    "                                                    <p></p>\n" +
                    "                                                    <h3 align=\"center\">\n" +
                    "                                                        Nursing home site sends notice of activities of the elderly at the nursing home on December 12, 2024\n\n" +
                    "                                                    </h3>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                            <tr>\n" +
                    "                                                <td>\n" +
                    "                                                    <div style=\"height: 350px\">\n" +data_activity+
                    "                                                    </div>\n" +
                    "                                                </td>\n" +
                    "                                            </tr>\n" +
                    "                                        </tbody>\n" +
                    "                                    </table>\n" +
                    "\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                        </tbody>\n" +
                    "                    </table>\n" +
                    "\n" +
                    "\n" +
                    "                    <table cellpadding=\" 0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:800px\" border=\"0\">\n" +
                    "                        <tbody>\n" +
                    "                            <tr>\n" +
                    "                                <td align=\"center\" style=\"padding:0px 0px 30px 0px\" border=\"0\">\n" +
                    "                                </td>\n" +
                    "                            </tr>\n" +
                    "                        </tbody>\n" +
                    "                    </table>\n" +
                    "\n" +
                    "                </td>\n" +
                    "            </tr>\n" +
                    "        </tbody>\n" +
                    "    </table>\n" +
                    "    <div class=\"yj6qo\"></div>\n" +
                    "    <div class=\"adL\">\n" +
                    "    </div>\n" +
                    "\n" +
                    "    <script type=\"module\" src=\"https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js\"></script>\n" +
                    "    <script nomodule src=\"https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js\"></script>\n" +
                    "</div>";

            helper.setText(htmlContent, true);

            javaMailSender.send(message);

        } catch (MessagingException | MailException e) {

        }
    }
        return "success";
    }

    public JSONObject logout(HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        session.invalidate();
        JSONObject response = new JSONObject();
        response.put("status", "success");
        response.put("message", "log-out");
        return response;
    }

    public String uploadImage(String base64Image) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("image", base64Image.split("data:image/png;base64,")[1]);
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);
        ResponseEntity<String> response = restTemplate.postForEntity("https://api.imgbb.com/1/upload?expiration=600&key=b99ad783079129d11206a7d520af7458", requestEntity, String.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            String imageUrl = jsonResponse.getJSONObject("data").getString("display_url");
            return imageUrl;
        } else {
            return "Error occurred: " + response.getStatusCodeValue();
        }
    }
}
