package com.example.cssk.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "services_arising")
public class ServicesArising {
    @Id
    @Field("servicesArisingId")
    private Long servicesArisingId;
    @Field("elderlyId")
    private long elderlyId;
    @Field("service")
    private String service;
    @Field("money")
    private Long money;
    @Field("time")
    private LocalDateTime time;
    @Field("status")
    private boolean status;
}
