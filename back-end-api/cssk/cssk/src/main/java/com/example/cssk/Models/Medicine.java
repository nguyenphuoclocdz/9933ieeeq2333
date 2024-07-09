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
@Document(collection = "medicines")
public class Medicine {
    @Id
    @Field("medicineId")
    private Long medicineId;
    @Field("drugName")
    private String drugName;
    @Field("form")
    private String form;
    @Field("quantity")
    private Integer quantity;
    @Field("expiryDate")
    private LocalDateTime expiryDate;
    @Field("sideEffects")
    private String sideEffects;
    @Field("indications")
    private String indications;
    @Field("contraindications")
    private String contraindications;
    @Field("price")
    private Double price;

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

    public void setDaysRemaining(long daysRemaining) {
    }
}
