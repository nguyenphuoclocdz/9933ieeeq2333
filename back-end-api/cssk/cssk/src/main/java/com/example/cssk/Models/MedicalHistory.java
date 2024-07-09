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
@Document(collection = "MedicalHistory")
public class MedicalHistory {
    @Id
    @Field("id")
    private long id;
    @Field("elderlyId")
    private long elderlyId;
    @Field("medicalHistory")
    private String medicalHistory;
    @Field("signsAndSymptoms")
    private String signs;
    @Field("surgicalHistory ")
    private String surgicalHistory;
    @Field("allergyHistory")
    private String allergyHistory;
    @Field("psychologicalHistory")
    private String psychologicalHistory;
    @Field("status")
    private boolean status;

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
