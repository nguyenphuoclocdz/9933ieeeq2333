package com.example.cssk.Service.Implement;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;


@Component
public class JwtTokenProviderServiceImp {

    @Value("${jwt.secret}")
    private String jwtSecretKey;

    @Value("${jwt.expiration}")
    private long validityInMilliseconds;

    // Hàm tạo khóa cho AES
    private final HttpServletRequest request;

    public JwtTokenProviderServiceImp(HttpServletRequest request) {
        this.request = request;
    }

    public String generateToken(String username, Long userID, Integer role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);
        return Jwts.builder()
                .setSubject(username)
                .claim("userID", userID) // Thêm userID vào payload
                .claim("role", role) // Thêm vai trò vào payload
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody();
            return claims.getSubject();
        } else {
            return null;
        }
    }

    public Integer getRoleFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody();
            return (Integer) claims.get("role");
        } else {
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Invalid token
            return false;
        }
    }


    public Long getUserIdFromToken(String token) {
        if (validateToken(token)) {
            Claims claims = Jwts.parser().setSigningKey(jwtSecretKey).parseClaimsJws(token).getBody();
            Number userId = (Number) claims.get("userID");
            return userId.longValue();
        } else {
            return null;
        }
    }



    public String GetUserName(){
        HttpServletRequest httpRequest = request;
        String authorizationHeader = httpRequest.getHeader("Authorization");
        String token = authorizationHeader.substring(7); // Bỏ qua phần "Bearer "


        return getUsernameFromToken(token);
    }

    public Integer GetRole(){
        HttpServletRequest httpRequest = request;
        String authorizationHeader = httpRequest.getHeader("Authorization");
        String token = authorizationHeader.substring(7); // Bỏ qua phần "Bearer "

        return getRoleFromToken(token);
    }

    public Long GetUserId(){
        HttpServletRequest httpRequest = request;
        String authorizationHeader = httpRequest.getHeader("Authorization");
        String token = authorizationHeader.substring(7); // Bỏ qua phần "Bearer "
        return getUserIdFromToken(token);
    }

    public String GetToken(){
        HttpServletRequest httpRequest = request;
        String authorizationHeader = httpRequest.getHeader("Authorization");
        String token = authorizationHeader.substring(7); // Bỏ qua phần "Bearer "

        return token;
    }
}
