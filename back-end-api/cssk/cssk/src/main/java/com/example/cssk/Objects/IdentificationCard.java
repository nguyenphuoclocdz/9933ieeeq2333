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
public class IdentificationCard {
    @Field("cardNo")
    private String cardNo;
    @Field("placeOfOrigin")
    private String placeOfOrigin;
    @Field("placeOfResidence")
    private String placeOfResidence;
    @Field(("placeOfIssue"))
    private String placeOfIssue;
    @Field("dateOfIssue")
    private LocalDateTime dateOfIssue;
    @Field("expiredDate")
    private LocalDateTime expiredDate;
}
