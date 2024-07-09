package com.example.cssk.Service.IService;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface PaymentService {
    String getAllPayment();

    String getPayment(Integer paymentID);

    String createPayment(String jsonString);

    String createPaymentAuto();

    String check(int paymentID) throws JsonProcessingException;
    String getSuccessResponse(String message, Object data);
    String getErrorResponse(String message);
    String getResponse(String status, String message, Object data, Integer ID);
}
