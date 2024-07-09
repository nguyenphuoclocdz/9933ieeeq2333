package com.example.cssk.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "elderlys")
public class Elderly {
    @Id
    @Field("elderlyId")
    private long elderlyId;
    @Field("userId")
    private long userId;
    @Field("fullNameElderly")
    private String fullNameElderly;
    @Field("birthdayElderly")
    private LocalDateTime birthdayElderly;
    @Field("genderElderly")
    private String genderElderly;
    @Field("resident")
    private String resident;
    @Field("domicile")
    private String domicile;
    @Field("position")
    private String position;
    @Field("serviceId")
    private Long serviceId;
    @Field("roomName")
    private String roomName;
    @Field("status")
    private Integer status;
    @Field("relative")
    private String relative;
    @Field("namePack")
    private String namePack;
    @Field("remove")
    private boolean remove;
    @Field("created_at")
    @CreatedDate
    private LocalDateTime created_at;
    @Field("updated_at")
    @LastModifiedDate
    private LocalDateTime updated_at;
    @Field("timestamp_payment")
    private long timestamp_payment;

    public void setCreatedAt(LocalDateTime createdAt) {
        this.created_at = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updated_at = updatedAt;
    }
}
