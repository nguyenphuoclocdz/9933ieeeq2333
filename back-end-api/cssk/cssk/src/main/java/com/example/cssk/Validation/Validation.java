package com.example.cssk.Validation;

import com.example.cssk.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Service
@AllArgsConstructor
public class Validation {
    @Autowired
    private final UserRepository userRepository;
    public static Map<String, String> checkUsers(JSONObject requestData, boolean isUpdate) {
        Map<String, String> validationErrors = new HashMap<>();

        if (!validateFullname(requestData.getString("fullname"))&& !validateName(requestData.getString("fullname"))) {
            validationErrors.put("fullname", "Invalid fullname format");
        }
        if (!isValidEmail(requestData.getString("email"))) {
            validationErrors.put("email", "Invalid email format");
        }
        if (!isValidPhoneNumber(requestData.getString("phone"))) {
            validationErrors.put("phone", "Invalid phone number format");
        }
        if (!isValidDomicileLength(requestData.getString("domicile"))) {
            validationErrors.put("domicile", "Domicile length exceeds maximum allowed");
        }
       if(!isUpdate){
           if(!validatePassword(requestData.getString("password"))){
               validationErrors.put("password", "Password should contain at least 1 upper, 1 special character. Length >8");
           }
       }
        if(!isValidUsername(requestData.getString("username"))){
            validationErrors.put("password", "Invalid username number format");
        }


        return validationErrors;
    }


    private static boolean validateFullname(String fullname) {
        if (fullname.isEmpty() || fullname.length() > 200) {
            return false;
        }
        String regex = "^[a-zA-Z0-9_\\s]*$";
        if (!fullname.matches(regex)) {
            return false;
        }
        return true; // No error
    }



    public static boolean isValidPhoneNumber(String phoneNumber) {
        String regex = "^(^\\+84|^84|^0)?(8|9|7|5|3)\\d{8}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }


    public static boolean isValidEmail(String email) {
        String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isValidUsername(String username) {

        if (username.length() < 6 || username.length() > 20) {
            return false;
        }

        String regex = "^[a-zA-Z0-9_]*$";
        return username.matches(regex);


    }


    public static boolean isValidDomicileLength(String domicile) {
        return domicile != null && domicile.length() > 2 && domicile.length() < 255;
    }

    public static boolean validatePassword(String password) {
        // Rule: Password length should be between 8 and 20 characters
        boolean isValidLength = password.length() >= 8 && password.length() <= 20;

        // Rule: Password should contain at least one uppercase letter
        boolean hasUppercase = password.matches(".*[A-Z].*");

        // Rule: Password should contain at least one lowercase letter
        boolean hasLowercase = password.matches(".*[a-z].*");

        // Rule: Password should contain at least one digit
        boolean hasDigit = password.matches(".*\\d.*");

        // Rule: Password should contain at least one special character
        boolean hasSpecialChar = password.matches(".*[!@#$%^&*()_+\\[\\]{};':\",.<>/?].*");

        return isValidLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
    }
    public static boolean validateName(String name) {
        // Rule: Name should contain at least two words, each at least two characters long
        String[] words = name.trim().split("\\s+");
        if (words.length < 2) {
            return false; // Less than two words
        }
        for (String word : words) {
            if (word.length() < 2) {
                return false; // Word is too short
            }
        }

        // Rule: Name should contain only alphabetic characters and spaces
        return name.matches("^[a-zA-Z\\s]+$");
    }
}
