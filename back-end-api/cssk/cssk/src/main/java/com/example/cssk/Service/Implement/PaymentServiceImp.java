package com.example.cssk.Service.Implement;

import com.example.cssk.Models.*;
import com.example.cssk.Repository.*;
import com.example.cssk.Service.IService.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.http.HttpEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PaymentServiceImp implements PaymentService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PaymentRepository paymentRepository;
    @Autowired
    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;
    @Autowired
    private final RestTemplate restTemplate;
    @Autowired
    private final ServicePackRepository servicePackRepository;
    @Autowired
    private final ServiceArisingRepository serviceArisingRepository;
    @Autowired
    private final ElderlyRepository elderlyRepository;
    @Autowired
    private final SendEmailServiceImp sendEmailServiceImp;

    @Override
    public String getAllPayment() {
        JSONObject response = new JSONObject();
        Integer role = jwtTokenProviderServiceImp.GetRole();
        if (role == 1 || role == 6) {
            List<Payment> Payment = paymentRepository.findAll();
            if (Payment.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Do have any information");
            } else {
                response.put("status", "success");
                response.put("data", Payment);
            }
        } else if (role == 2) {
            List<Payment> Payment = paymentRepository.findPaymentsByUserId(jwtTokenProviderServiceImp.GetUserId());
            if (Payment.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Do have any information");
            } else {
                response.put("status", "success");
                response.put("data", Payment);
            }
        }
        return response.toString();

    }

    @Override
    public String getPayment(Integer paymentID) {
        JSONObject response = new JSONObject();
        Payment payment = paymentRepository.findPaymentByPaymentID(paymentID);
        if (payment == null) {
            response.put("status", "error");
            response.put("message", "Do have any information");
        } else {
            response.put("status", "success");
            response.put("data", new JSONObject(payment));
        }
        return response.toString();
    }

    public String fetchDataFromExternalAPI() throws JsonProcessingException {
        String url = "http://localhost/get.php?type=3";
        String jsonData = restTemplate.getForObject(url, String.class);
        // Create ObjectMapper instance
        ObjectMapper objectMapper = new ObjectMapper();

        // Initialize a StringBuilder to store the result
        StringBuilder resultBuilder = new StringBuilder();

        try {
            // Parse JSON data string to JsonNode
            JsonNode jsonNode = objectMapper.readTree(jsonData);

            // Get "transactions" array from JSON
            JsonNode transactionsNode = jsonNode.get("transactions");

            // Loop through each transaction
            for (JsonNode transactionNode : transactionsNode) {
                // Get "Amount" and "Description" fields from transaction
                String amountStr = transactionNode.get("Amount").asText();
                int amount = Integer.parseInt(amountStr.replace(",", "")); // Remove comma and parse to int
                String description = transactionNode.get("Description").asText();

                // Append amount and description to the result
                resultBuilder.append("Amount: ").append(amount).append("\n");
                resultBuilder.append("Description: ").append(description).append("\n");
            }
        } catch (JsonProcessingException e) {
            // Handle JsonProcessingException
            e.printStackTrace();
            // Re-throw the exception to the caller
            throw e;
        }

        // Return the result as a String
        return "success";
        //return resultBuilder.toString();
    }


    @Override
    public String createPayment(String jsonString) {
        JSONObject requestData = new JSONObject(jsonString);
        Payment lastPayment = paymentRepository.findTopByOrderByPaymentIDDesc();
        int newId = (lastPayment != null) ? lastPayment.getPaymentID() + 1 : 1;
        Long userID = userRepository.findByUsername(jwtTokenProviderServiceImp.GetUserName()).getUserId();

        Payment payment = new Payment();
        payment.setPaymentID(newId);
        payment.setUserId(userID);
        payment.setContent(requestData.getString("content"));

        JSONArray serviceArray = requestData.getJSONArray("services");
        List<Services> services = new ArrayList<>();
        long total = 0;
        for (int i = 0; i < serviceArray.length(); i++) {
            JSONObject serviceObj = serviceArray.getJSONObject(i);
            String serviceName = serviceObj.getString("name");
            long servicePrice = serviceObj.getLong("price");
            total += servicePrice;
            Services service = new Services();
            service.setName(serviceName);
            service.setPrice(servicePrice);
            services.add(service);
        }

        payment.setServices(services);
        payment.setMoney(total);
        payment.setQrdata(getqrbank(newId, total));
        payment.setStatus(0);
        payment.setCreated_at(LocalDateTime.now());
        paymentRepository.save(payment);

        return getResponse("success", "Payment created successfully", paymentRepository.findPaymentByPaymentID(newId).getQrdata(), newId);
    }


    @Override
    public String createPaymentAuto() {
        long currentTimestamp = Instant.now().toEpochMilli();
        long twentyDaysAgo = currentTimestamp - (20 * 24 * 60 * 60 * 1000);
        List<Elderly> elderlyList = elderlyRepository.findByTimestampPaymentBeforeAndStatus(twentyDaysAgo, 1);
        for (Elderly elderly : elderlyList) {
            Payment lastPayment = paymentRepository.findTopByOrderByPaymentIDDesc();
            int newId = (lastPayment != null) ? lastPayment.getPaymentID() + 1 : 1;


            elderly.setTimestamp_payment(elderly.getTimestamp_payment() + 2592000000L);
            elderlyRepository.save(elderly);

            Payment payment = new Payment();
            payment.setPaymentID(newId);
            payment.setUserId(elderly.getUserId());
            payment.setContent("Payment Auto");

            ServicePack servicePack = servicePackRepository.findServicePackByPackId(elderly.getServiceId());
            List<Services> services = new ArrayList<>();

            Services servicePackService = new Services();
            servicePackService.setName("Service Pack " + servicePack.getNamePack());
            servicePackService.setPrice(servicePack.getMoney());
            services.add(servicePackService);

            long total = servicePack.getMoney();
            for (ServicesArising servicesArising : serviceArisingRepository.findByElderlyIdAndStatus(elderly.getElderlyId(), false)) {
                Services service = new Services();
                service.setName(servicesArising.getService());
                service.setPrice(servicesArising.getMoney());
                services.add(service);
                total += servicesArising.getMoney();
                servicesArising.setStatus(true);
                serviceArisingRepository.save(servicesArising);
            }

            payment.setServices(services);
            payment.setMoney(total);
            payment.setQrdata(getqrbank(newId, total));
            payment.setStatus(0);
            payment.setCreated_at(LocalDateTime.now());
            paymentRepository.save(payment);
            sendEmailServiceImp.send_mail_payment(userRepository.findByUserId(elderly.getUserId()).getEmail(), "Automatic payment invoice of "+ elderly.getFullNameElderly(), payment.getQrdata(), newId);
            System.out.println("send to " + userRepository.findByUserId(elderly.getUserId()).getEmail());
            System.out.println(getResponse("success", "Payment created successfully", paymentRepository.findPaymentByPaymentID(newId).getQrdata(), newId));
        }
        return getSuccessResponse("Payment created successfully", null);
    }


    @Override
    public String check(int paymentID) throws JsonProcessingException {
        int status = 0;
        String url = "http://localhost/get.php?type=3";
        Payment payment = paymentRepository.findPaymentByPaymentID(paymentID);
        if (payment == null) {
            return getErrorResponse("paymentID does not exist!");
        }
        if (payment.getStatus() == 1) {
            status = 1;
        }
        String jsonData = restTemplate.getForObject(url, String.class);
        ObjectMapper objectMapper = new ObjectMapper();

        // Initialize a StringBuilder to store the result
        StringBuilder resultBuilder = new StringBuilder();

        try {
            // Parse JSON data string to JsonNode
            JsonNode jsonNode = objectMapper.readTree(jsonData);

            // Get "transactions" array from JSON
            JsonNode transactionsNode = jsonNode.get("transactions");

            // Loop through each transaction
            for (JsonNode transactionNode : transactionsNode) {
                // Get "Amount" and "Description" fields from transaction
                String amountStr = transactionNode.get("Amount").asText();
                int amount = Integer.parseInt(amountStr.replace(",", "")); // Remove comma and parse to int
                String description = transactionNode.get("Description").asText();

                String contentbank = "PAY" + payment.getPaymentID() + "CSSK";
                if (description.contains(contentbank) && amount >= payment.getMoney()) {
                    payment.setStatus(1);
                    payment.setUpdated_at(LocalDateTime.now());
                    paymentRepository.save(payment);
                    System.out.println(payment.getPaymentID() + "Paid");
                    status = 1;
                }

                // Append amount and description to the result
                resultBuilder.append("Amount: ").append(amount).append("\n");
                resultBuilder.append("Description: ").append(description).append("\n");
            }
        } catch (JsonProcessingException e) {
            // Handle JsonProcessingException
            e.printStackTrace();
            // Re-throw the exception to the caller
            throw e;
        }

        // Return the result as a String
        if (status == 1) {
            return getSuccessResponse("Bill " + payment.getPaymentID() + " Paid", null);
        } else {
            return getResponse("error", "Unpaid", payment.getQrdata(), null);
        }

    }

    public String getqrbank(int paymentID, Long money) {
        HttpClient httpClient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("https://api.vietqr.io/v2/generate");

        // Set headers
        httpPost.setHeader("Content-Type", "application/json");

        // JSON payload
        JSONObject jsonPayload = new JSONObject();
        jsonPayload.put("accountNo", "9073399999");
        jsonPayload.put("accountName", "Nguyen Phuoc Loc");
        jsonPayload.put("acqId", 970436);
        jsonPayload.put("amount", money);
        jsonPayload.put("addInfo", "PAY_" + paymentID + "_CSSK");
        jsonPayload.put("format", "text");
        jsonPayload.put("template", "PAY_" + paymentID + "_CSSK");

        String qrDataURL = null;
        try {
            // Set JSON payload
            StringEntity entity = new StringEntity(jsonPayload.toString());
            httpPost.setEntity(entity);

            // Execute HTTP request
            HttpResponse response = httpClient.execute(httpPost);

            // Get response entity
            HttpEntity responseEntity = response.getEntity();

            if (responseEntity != null) {
                // Convert response entity to string
                String jsonResponse = EntityUtils.toString(responseEntity);
                // Parse JSON response
                JSONObject jsonObject = new JSONObject(jsonResponse);

                // Get data object from JSON
                JSONObject dataObject = jsonObject.getJSONObject("data");

                // Get qrDataURL from data object
                qrDataURL = dataObject.getString("qrDataURL");

                // Print qrDataURL
                //System.out.println("qrDataURL: " + qrDataURL);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return qrDataURL;
    }

    @Override
    public String getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data, null);
    }

    @Override
    public String getErrorResponse(String message) {
        return getResponse("error", message, null, null);
    }

    @Override
    public String getResponse(String status, String message, Object data, Integer ID) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        response.put("id", ID);
        return response.toString();
    }
}
