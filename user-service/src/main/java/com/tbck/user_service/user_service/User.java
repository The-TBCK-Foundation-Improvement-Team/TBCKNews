package com.tbck.user_service.user_service;

import java.util.HashMap;
import java.util.UUID;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

public class User {

    private UUID userId;
    private String FirstName;
    private String LastName;
    private String email;
    private String password;
    private String role; //geust, admin
    private boolean verified; //is this user a verified by admin or not
    //verified users can comment on news articles
   

    
    public boolean isVerified() {
        return verified;
    }
    public void setVerified(boolean verified) {
        this.verified = verified;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getFirstName() {
        return FirstName;
    }
    public void setFirstName(String firstName) {
        FirstName = firstName;
    }
    public String getLastName() {
        return LastName;
    }
    public void setLastName(String lastName) {
        LastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public HashMap<String, AttributeValue> toMap() {
        HashMap<String, AttributeValue> item = new HashMap<>();
        item.put("userId", AttributeValue.builder().s(userId.toString()).build());
        item.put("FirstName", AttributeValue.builder().s(FirstName).build());
        item.put("LastName", AttributeValue.builder().s(LastName).build());
        item.put("email", AttributeValue.builder().s(email).build());
        item.put("password", AttributeValue.builder().s(password).build());
        item.put("role", AttributeValue.builder().s(role).build());
        item.put("verified", AttributeValue.builder().bool(verified).build());
        return item;
    }

    @Override
    public String toString() {
        return "User [FirstName=" + FirstName + ", LastName=" + LastName + ", email=" + email + ", password=" + password
                + ", userId=" + userId + ", role=" + role + ""+ ", verified=" + verified + "]";
    }
    
}
