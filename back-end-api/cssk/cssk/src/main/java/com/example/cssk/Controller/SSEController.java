package com.example.cssk.Controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
public class SSEController {

    private final List<User> users = new CopyOnWriteArrayList<>();
    private final List<String> messages = new CopyOnWriteArrayList<>();

    @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public String streamSSE(String username) {
        // Logic to add user to the list
        users.add(new User(username));

        // Notify all users about the new user
        broadcastMessage(username + " joined the chat");

        // Return SSE stream for the specific user
        return "data: " + messages.stream().map(message -> "data: " + message).reduce("", (a, b) -> a + "\n" + b) + "\n\n";
    }

    @PostMapping("/send-message")
    public void sendMessage(@RequestParam String username, @RequestParam String message) {
        String formattedMessage = username + ": " + message;
        broadcastMessage(formattedMessage);
    }
    // Utility method to broadcast a message to all users
    private void broadcastMessage(String message) {
        messages.add(message);
        for (User user : users) {
            sendEventToUser(user, message);
        }
    }

    // Utility method to send an SSE event to a specific user
    private void sendEventToUser(User user, String message) {
        // Logic to send SSE message to the specific user
        // You can use a message broker or maintain a separate SSE session for each user
    }

    private static class User {
        private final String username;

        public User(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }
    }
}

