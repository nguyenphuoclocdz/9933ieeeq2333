package com.example.cssk.Models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "room")
public class Room {

    @Getter
    @Setter

    @Id
    @Field("nameRoom")
    private String nameRoom;
    @Field("status")
    private Integer status;
    @Field("user")
    private Integer user;
    @Field("elderlyId")
    private Long elderlyId;
    @Field("serviceId")
    private Long serviceId;
}
