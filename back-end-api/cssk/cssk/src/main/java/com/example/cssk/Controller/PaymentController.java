package com.example.cssk.Controller;
import com.example.cssk.Service.IService.PaymentService;
import com.example.cssk.Service.Implement.PaymentServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@AllArgsConstructor
public class PaymentController {
    @Autowired
    private final PaymentService PaymentService;
    @PostMapping()
    public String createBill(@RequestBody String jsonString) throws JsonProcessingException {
        return PaymentService.createPayment(jsonString).toString();
    }
    //@GetMapping()
    //public String get() throws JsonProcessingException {
    //    return paymentServiceImp.fetchDataFromExternalAPI();
    //}
    @GetMapping()
    public String getAll() throws JsonProcessingException {
        return PaymentService.getAllPayment();
    }

    @GetMapping("/cronjob")
    public String createPaymentAuto() {
        return PaymentService.createPaymentAuto();
    }

    @GetMapping("/{paymentID}")
    public String getPaymentID(@PathVariable int paymentID) {
        return PaymentService.getPayment(paymentID);
    }
    @GetMapping("/check/{paymentID}")
    public String check(@PathVariable int paymentID) throws JsonProcessingException {
        return PaymentService.check(paymentID);
    }
}
