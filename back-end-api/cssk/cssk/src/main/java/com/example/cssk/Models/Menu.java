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
@Document(collection = "menu")
public class Menu {
    @Setter
    @Getter
    @Id
    @Field("menuId")
    private Long menuId;
    @Field("dishName")
    private String dishName;
    @Field("dishType")
    private String dishType;
    @Field("mealCategory")
    private String mealCategory;
    @Field("price")
    private double price;
    @Field("isVegetarian")
    private boolean isVegetarian;
    @Field("ingredients")
    private String ingredients;

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
