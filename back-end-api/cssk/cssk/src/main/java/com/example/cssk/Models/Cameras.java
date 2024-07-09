package com.example.cssk.Models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cameras")
public class Cameras {

    @Getter
    @Setter

    @Id
    @Field("cameraId")
    private String cameraId;
    @Field("cameraName")
    private String cameraName;
    @Field("link")
    private String link;
    @Field("roomLook")
    private String roomLook;

}