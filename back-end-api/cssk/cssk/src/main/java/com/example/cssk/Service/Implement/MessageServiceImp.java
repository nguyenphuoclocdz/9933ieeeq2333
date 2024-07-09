package com.example.cssk.Service.Implement;

import com.example.cssk.Models.Message;
import com.example.cssk.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImp {
    @Autowired
    private final MessageRepository messageRepository;

    @Autowired
    public MessageServiceImp(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }


    public void saveMessage(Message content) {
        Message message = content;
        messageRepository.save(message);
    }

    public List<Message> getAllMessage() {
        return messageRepository.findAll();
    }

    public void deleteAllMessages() {
        messageRepository.deleteAll();
    }
}
