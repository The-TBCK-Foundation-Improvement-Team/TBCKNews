package com.tbck.user_service.user_service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

public class User {

    private UUID userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role; //guest, admin
    private Boolean verified; //is this user a verified by admin or not
    //verified users can comment on news articles
   

    
    public Boolean getVerified() {
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
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
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
        item.put("firstName", AttributeValue.builder().s(firstName).build());
        item.put("lastName", AttributeValue.builder().s(lastName).build());
        item.put("email", AttributeValue.builder().s(email).build());
        item.put("password", AttributeValue.builder().s(password).build());
        item.put("role", AttributeValue.builder().s(role).build());
        item.put("verified", AttributeValue.builder().bool(verified).build());
        return item;
    }

    public static User fromMap(Map<String, AttributeValue> map) {
    User user = new User();
    user.setUserId(UUID.fromString(map.get("userId").s()));
    user.setFirstName(map.get("firstName") != null ? map.get("firstName").s() : null);
    user.setLastName(map.get("lastName") != null ? map.get("lastName").s() : null);
    user.setEmail(map.get("email") != null ? map.get("email").s() : null);
    user.setRole(map.get("role") != null ? map.get("role").s() : "guest");
    user.setPassword(map.get("password") != null ? map.get("password").s() : null);

    //Fix: Read `verified` field properly
    if (map.containsKey("verified") && map.get("verified").bool() != null) {
        user.setVerified(map.get("verified").bool());
    } else {
        user.setVerified(false); //Default to false if not present
    }

    return user;
}

    @Override
    public String toString() {
        return "User [FirstName=" + firstName + ", LastName=" + lastName + ", email=" + email + ", password=" + password
                + ", userId=" + userId + ", role=" + role + ""+ ", verified=" + verified + "]";
    }
    
}
