package com.tbck.news_service.news_service.Authorization;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import javax.crypto.spec.SecretKeySpec;



@Component
public class JwtTokenUtil {
    

    private final static String secretKeyString = "5paCEZO84dhJsfJSbU9oq7bgqwqhZrLT0wcGgNe7Nyo";  // Example secret key
    private final long expirationTime = 86400000L;  // 1 day expiration

    private static Key getSigningKey() {
        return new SecretKeySpec(secretKeyString.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
    }
    

    // Extract email from JWT token
    public static String extractEmail(String token) {
        try{
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); 
        } catch (Exception e) {
            System.out.println("Error: " + e);
            System.out.println("error message: " + e.getMessage());
            return null;
        }
    }

    // Extract user ID from JWT token
    public static String extractUserId(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("userId", String.class);  // Extract custom claim "userId"
    }

    // Extract user role from JWT token
    public static String extractRole(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);  // Extract custom claim "role"
    }

    // Validate token
    public boolean isTokenValid(String token, String email) {
        //if the email provided is the same as the one in the token and the expiration date is not before the current date
        //then the token is valid
        return email.equals(extractEmail(token)) && !isTokenExpired(token);
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        //check the expiration date of the token
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from token
    private Date extractExpiration(String token) {
        try{
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        } catch (Exception e) {
            System.out.println("Error: " + e);
            return null;
        }
    }
    }