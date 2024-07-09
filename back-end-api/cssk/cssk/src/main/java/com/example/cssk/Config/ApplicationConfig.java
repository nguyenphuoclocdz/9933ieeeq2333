package com.example.cssk.Config;

import com.example.cssk.Service.Implement.JwtTokenProviderServiceImp;
import com.example.cssk.TokenValidationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApplicationConfig {


    public ApplicationConfig(JwtTokenProviderServiceImp jwtTokenProviderServiceImp) {
        this.jwtTokenProviderServiceImp = jwtTokenProviderServiceImp;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    private JwtTokenProviderServiceImp jwtTokenProviderServiceImp;

    @Autowired
    public void AppConfig(JwtTokenProviderServiceImp jwtTokenProviderServiceImp) {
        this.jwtTokenProviderServiceImp = jwtTokenProviderServiceImp;
    }

    @Bean
    public FilterRegistrationBean<TokenValidationFilter> loggingFilter() {
        FilterRegistrationBean<TokenValidationFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new TokenValidationFilter(jwtTokenProviderServiceImp));
        registrationBean.addUrlPatterns("/*");

        return registrationBean;
    }
}
