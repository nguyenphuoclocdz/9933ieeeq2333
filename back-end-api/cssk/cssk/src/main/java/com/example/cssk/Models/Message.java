package com.example.cssk.Models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "messages")
public class Message {

    @Getter
    @Setter
    private String content;

    private String username;

}
