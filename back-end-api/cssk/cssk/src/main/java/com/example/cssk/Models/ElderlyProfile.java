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
@Document(collection = "ElderlyProfile")
public class ElderlyProfile {
    @Id
    @Field("id")
    private long id;
    @Field("administrativePaperwork")
    private AdministrativePaperwork administrativePaperwork;
    @Field("medicalHistory")
    private MedicalHistory medicalHistory;
    @Field("status")
    private boolean status;
    @Field("elderlyId")
    private long elderlyId;
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
