package com.example.cssk.Models;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "payment")
public class Payment {

    @Getter
    @Setter

    @Id
    @Field("paymentID")
    private int paymentID;
    @Field("content")
    private String content;
    @Field("userId")
    private Long userId;
    @Field("money")
    private Long money;
    @Field("status")
    private int status;
    @Field("qrdata")
    private String qrdata;
    @Field("services")
    private List<Services> services;
    @Field("created_at")
    @CreatedDate
    private LocalDateTime created_at;
    @Field("updated_at")
    @LastModifiedDate
    private LocalDateTime updated_at;

    public void setCreatedAt(LocalDateTime createdAt) {
        this.created_at = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updated_at = updatedAt;
    }


}
