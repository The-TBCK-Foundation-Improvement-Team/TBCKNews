package com.tbck.user_service.user_service.Authorization;

import com.tbck.user_service.user_service.SecretsManagerUtil;
import com.tbck.user_service.user_service.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Component;



@Component
public class JwtTokenUtil {
    
    private static final String JWT_SECRET = SecretsManagerUtil.getSecret("JWT_SECRET");
    private final long expirationTime = 86400000L;  // 1 day expiration

    private static Key getSigningKey() {
        return new SecretKeySpec(JWT_SECRET.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
    }


    //make the token with all the users info inside it
    public String generateToken(User user) {
        System.out.println("Generating token for user: " + user.getEmail());
        return Jwts.builder()
                .setSubject(user.getEmail())  // Set the email as the subject
                .claim("userId", user.getUserId())  // Add the userId (uuid) as a custom claim
                .claim("email", user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("role", "ROLE_" + user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))  // Set expiration time for the token
                .signWith(getSigningKey())  // Signing the token with a secret key
                .compact();
    }

    // Extract all claims from JWT token
    public io.jsonwebtoken.Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
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