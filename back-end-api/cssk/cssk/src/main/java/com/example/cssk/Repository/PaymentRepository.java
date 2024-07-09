package com.example.cssk.Repository;


import com.example.cssk.Models.Payment;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface PaymentRepository extends MongoRepository<Payment, String> {
    Payment findPaymentByPaymentID(Integer paymentID);
    Payment findTopByOrderByPaymentIDDesc();

    List<Payment> findPaymentsByUserId(Long userId);

}