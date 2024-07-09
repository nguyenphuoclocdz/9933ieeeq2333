package com.example.cssk;


import com.example.cssk.Service.Implement.JwtTokenProviderServiceImp;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.BufferedReader;
import java.io.IOException;

@WebFilter("/*")
@CrossOrigin(origins = "http://localhost:3001/")
public class TokenValidationFilter implements Filter {

    private final JwtTokenProviderServiceImp jwtTokenProviderServiceImp;


    public TokenValidationFilter(JwtTokenProviderServiceImp jwtTokenProviderServiceImp) {
        this.jwtTokenProviderServiceImp = jwtTokenProviderServiceImp;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();

        String requestMethod = httpRequest.getMethod();


        if ("OPTIONS".equals(requestMethod)) {
            chain.doFilter(request, response);
            return;
        }


        if (!requestURI.startsWith("/api")) {
            chain.doFilter(request, response);
            return;
        }

        if (requestURI.equals("/api/user/register") ||
                requestURI.equals("/api/user/confirm") ||
                requestURI.equals("/api/account/info") ||
                requestURI.equals("/api/account/captcha") ||
                requestURI.equals("/api/account/login") ||
                requestURI.equals("/api/account/reset") ||
                requestURI.equals("/api/account/confirmPassword") ||
                requestURI.equals("/api/account/confirmCode")||
                // test chức năng export
                requestURI.equals("/api/exportToExcel/role1") ||
                requestURI.equals("/api/exportToExcel/role2") ||
                requestURI.equals("/api/exportToExcel/role3") ||
                requestURI.equals("/api/exportToExcel/role4") ||
                requestURI.equals("/api/exportToExcel/role5") ||
                requestURI.equals("/api/exportToExcel/role6") ||
                requestURI.equals("/api/exportToExcel/role7") ||
                requestURI.equals("/api/exportToExcel/elderly") ||
                requestURI.equals("/api/excel/import")  ||
                requestURI.equals("/api/excel/importElerly") ||
                requestURI.equals("/api/exportToExcel/menu") ||
                requestURI.equals("/api/excel/importMenu") ||
                requestURI.equals("/api/exportToExcel/medicine") ||
                requestURI.equals("/api/excel/importMedicine") ||
                requestURI.equals("/api/exportToExcel/arising") ||
                requestURI.equals("/api/excel/importArising")) {
            chain.doFilter(request, response);
            return;
        }


        String authorizationHeader = httpRequest.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token not found or token format is incorrect!");
            return;
        }

        String token = authorizationHeader.substring(7); // Bỏ qua phần "Bearer "
        if (jwtTokenProviderServiceImp.getUsernameFromToken(token) == null) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is invalid or expired!");
            return;
        }

        String username = jwtTokenProviderServiceImp.getUsernameFromToken(token);
        Long userid = jwtTokenProviderServiceImp.getUserIdFromToken(token);
        Integer role = jwtTokenProviderServiceImp.getRoleFromToken(token);


        //filter accountant
        if (requestURI.startsWith("/api/accountant/") || requestURI.equals("/api/accountant")) {
            if (requestMethod.equals("PUT")) {
                if (role != 1 && userid.equals(get_ID(requestURI))) {
                    chain.doFilter(request, response);
                    return;
                }
            }
            if (role != 1) {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "");
                return;
            }
        }

        //filter admin
        if (requestURI.startsWith("/api/account/info/")) {
            if (role != 1) {
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Permission error!");
                return;
            }
        }

        if (requestURI.startsWith("/api/nurse/") || requestURI.equals("/api/nurse")) {
            if (requestMethod.equals("PUT")) {
                if (role != 1 && userid.equals(get_ID(requestURI))) {
                    chain.doFilter(request, response);
                    return;
                }
            }
        }

        chain.doFilter(request, response);
    }

    public Long get_ID(String requestURI) {
        String[] parts = requestURI.split("/");
        String lastPart = parts[parts.length - 1];
        return Long.valueOf((lastPart));
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {
    }


}
