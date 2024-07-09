package com.example.cssk.Models;

import com.example.cssk.Objects.HealthInsuranceCard;
import com.example.cssk.Objects.IdentificationCard;
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
@Document(collection = "AdministrativePaperwork")
public class AdministrativePaperwork {
    @Id
    @Field("paperworkId")
    private long paperworkId;
    @Field("elderlyId")
    private long elderlyId;
    @Field("healthInsuranceCard")
    private HealthInsuranceCard healthInsuranceCard;
    @Field("identificationCard")
    private IdentificationCard identificationCard;
    @Field("status")
    private boolean status;
    @Field("created_at")
    @CreatedDate
    private LocalDateTime created_at;

    @Field("updated_at")
    @LastModifiedDate
    private LocalDateTime updated_at;


}
