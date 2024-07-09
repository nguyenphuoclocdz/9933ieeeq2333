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
@Document(collection = "MedicalExamination")
public class MedicalExamination {
    @Id
    @Field("medicalExaminationId")
    private Long medicalExaminationId;
    @Field("doctorId")
    private Long doctorId;
    @Field("elderlyId")
    private Long elderlyId;
    @Field("title")
    private String title;
    @Field("createTime")
    private LocalDateTime createTime;
    @Field("updateTime")
    private LocalDateTime updateTime;
    @Field("description")
    private String description;
    @Field("roomName")
    private String roomName;
    @Field("remove")
    private boolean remove;

}

