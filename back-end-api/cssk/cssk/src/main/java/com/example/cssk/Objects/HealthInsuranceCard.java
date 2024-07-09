package com.example.cssk.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthInsuranceCard {
    @Field("cardNo")
    private String cardNo;
    @Field("placeOfIssue")
    private String placeOfIssue;
    @Field("placeOfConsultation")
    private String placeOfConsultation;
    @Field("dateOfEffect")
    private LocalDateTime dateOfEffect;
}
