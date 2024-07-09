package com.example.cssk.Controller;
import com.example.cssk.Service.Implement.RoomServiceImp;
import com.example.cssk.Service.Implement.SendEmailServiceImp;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/send_email")
@CrossOrigin(origins = "http://localhost:3001/")
public class SendEmailController {

    private final SendEmailServiceImp sendEmailServiceImp;

    public SendEmailController(SendEmailServiceImp sendEmailServiceImp) {
        this.sendEmailServiceImp = sendEmailServiceImp;
    }

    @PostMapping()
    public String sendEmail(@RequestBody String jsonString){
        return String.valueOf(sendEmailServiceImp.send_email(jsonString));
    }

    @GetMapping("/activity")
    public String sendEmailActivity(){
        return String.valueOf(sendEmailServiceImp.send_mail_activity());
    }

}

