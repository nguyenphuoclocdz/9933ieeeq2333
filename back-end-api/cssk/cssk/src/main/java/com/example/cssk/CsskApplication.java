package com.example.cssk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CsskApplication {

    public static void main(String[] args) {
        SpringApplication.run(CsskApplication.class, args);
    }

}
