package com.example.cssk.Controller;

import com.example.cssk.Models.Message;
import com.example.cssk.Service.Implement.MessageServiceImp;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@AllArgsConstructor
public class WebSocketController {
    @Autowired
    private final MessageServiceImp messageServiceImp;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message handleChatMessage(Message message) {
        System.out.println(message.getContent());
        messageServiceImp.saveMessage(message);
        return message;
    }

    @MessageMapping("/loginrt")
    @SendTo("/topic/login")
    public String zxc(String login) {
        return login;
    }

    @GetMapping("/getAllMessage")
    public String getAllMessage() {
        return getSuccessResponse("User retrieved successfully", messageServiceImp.getAllMessage());
    }

    @GetMapping("/deleteAllMessage")
    public void deleteAllMessage() {
        messageServiceImp.deleteAllMessages();
    }

    private String getSuccessResponse(String message, Object data) {
        return getResponse("success", message, data);
    }

    private String getErrorResponse(String message) {
        return getResponse("error", message, null);
    }

    private String getResponse(String status, String message, Object data) {
        JSONObject response = new JSONObject();
        response.put("status", status);
        response.put("message", message);
        response.put("data", data);
        return response.toString();
    }


}