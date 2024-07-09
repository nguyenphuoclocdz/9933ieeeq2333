package com.example.cssk.Models;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User{

    @Id
    @Field("userId")
    private Long userId;
    @Field("fullname")
    private String fullname;
    @Field("email")
    private String email;
    @Field("username")
    private String username;
    @Field("password")
    private String password;
    @Field("role")
    private Integer role;
    @Field("keyFaceId")
    private String keyFaceId;
    @Field("secretKey")
    private String secretKey;
    @Field("image")
    private String image;
    @Field("phone")
    private String phone;
    @Field("domicile")
    private String domicile;
    @Field("disable")
    private boolean disable;
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
