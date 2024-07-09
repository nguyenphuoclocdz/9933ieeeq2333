package com.example.cssk.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "service_pack")
public class ServicePack {
    @Id
    @Field("packId")
    private long packId;
    @Field("namePack")
    private String namePack;
    @Field("money")
    private Long money;
    @Field("serviceDetail")
    private String[] serviceDetail;
}
