package com.example.cssk.Repository;

import com.example.cssk.Models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface MessageRepository extends MongoRepository<Message, String> {
}