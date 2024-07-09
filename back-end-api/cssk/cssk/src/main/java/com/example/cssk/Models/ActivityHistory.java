package com.example.cssk.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "activityHistory")
public class ActivityHistory {
    @Id
    @Field("activityId")
    private long activityId;
    @Field("elderlyId")
    private long elderlyId;
    @Field("history")
    private String history;
    @Field("role")
    private String role;
    @Field("title")
    private String title;

    @Field("date_create")
    private LocalDateTime time;

    @Field("updated_at")
    @LastModifiedDate
    private LocalDateTime updated_at;

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updated_at = updatedAt;
    }
}
