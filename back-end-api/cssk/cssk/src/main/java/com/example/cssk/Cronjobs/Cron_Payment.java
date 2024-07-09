package com.example.cssk.Cronjobs;

import com.example.cssk.Service.Implement.PaymentServiceImp;
import com.example.cssk.Service.Implement.SendEmailServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@AllArgsConstructor
public class Cron_Payment {
    @Autowired
    private final PaymentServiceImp paymentServiceImp;
    @Autowired
    private final SendEmailServiceImp sendEmailServiceImp;
    //@Scheduled(cron = "0/10 * * * * *")
    //public void runEverySecond() {
    //    Date date = new Date();
    //    Timestamp timestamp = new Timestamp(date.getTime());
    //    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //    System.out.println("Cron payment at: " + sdf.format(timestamp.getTime())+ paymentServiceImp.createPaymentAuto());
    //}
    //@Scheduled(cron = "0/30 * * * * *")
    //public void runEverySecond() throws JsonProcessingException {
    //    Date date = new Date();
    //    Timestamp timestamp = new Timestamp(date.getTime());
    //    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //    System.out.println("Cron check payment at: " + sdf.format(timestamp.getTime())+ paymentServiceImp.fetchDataFromExternalAPI());
    //}
    //@Scheduled(cron = "0 0 23 * * ?")
    //public void sendActivity() throws JsonProcessingException {
    //    Date date = new Date();
    //    Timestamp timestamp = new Timestamp(date.getTime());
    //    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //    System.out.println("Cron check payment at: " + sdf.format(timestamp.getTime())+ sendEmailServiceImp.send_mail_activity());
    //}

}