package com.tbck.user_service.user_service;

import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;


//NEED TO SET UP DATABSE CONNECTION FOR THESE ROUTES TO FUNCTION
@RestController
@RequestMapping("/user")
public class UserRestController {

    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public UserRestController(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    @GetMapping(path = "/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public User getUser(@PathVariable("userId") UUID userId) {

        // Get the user from the database
        GetItemRequest getItemRequest = GetItemRequest.builder()
            .tableName("TBCKUsers") // Your DynamoDB table name
            .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build())) // Primary key
            .build();

        // Get the item from the database
        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);

        // Check if the item exists
        if (getItemResponse.hasItem()) {
            System.out.println("User found: " + getItemResponse.item());
            return User.fromMap(getItemResponse.item()); // Return the user
        } else {
            System.out.println("User with ID " + userId + " not found.");
            return null; // User not found
        }
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {

        user.setUserId(UUID.randomUUID());

        //check if the email is already in use
        QueryRequest queryRequest = QueryRequest.builder()
        .tableName("TBCKUsers") // Replace with your table name
        .indexName("email-index") // Replace with your actual index name
        .keyConditionExpression("email = :email")
        .expressionAttributeValues(Map.of(":email", AttributeValue.builder().s(user.getEmail()).build()))
        .build();

        QueryResponse queryResponse = dynamoDbClient.query(queryRequest);


        if (queryResponse.count() != 0) {
            System.out.println("User with email " + user.getEmail() + " already exists.");
            throw new RuntimeException("User with email " + user.getEmail() + " already exists."); // User already exists
            
        }

        //check is password is valid lenth, has 1 capital letter, 1 number, and 1 special character
        if (user.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long.");
        }
        if (!user.getPassword().matches(".*[A-Z].*")) {
            throw new RuntimeException("Password must contain at least one capital letter.");
        }
        if (!user.getPassword().matches(".*[0-9].*")) {
            throw new RuntimeException("Password must contain at least one number.");
        }
        if (!user.getPassword().matches(".*[!@#$%^&*()].*")) {
            throw new RuntimeException("Password must contain at least one special character.");
        }

        //hash user password 
        String userPassword = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userPassword);
        user.setPassword(hashedPassword);

        Map<String, AttributeValue> item = user.toMap();
        
        PutItemRequest request = PutItemRequest.builder()
            .tableName("TBCKUsers")
            .item(item)
            .build();

        dynamoDbClient.putItem(request);

        return user;
    }

    @PatchMapping(path = "/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public User updateUser(@PathVariable(required = true) UUID userId, @RequestBody User user) {

        //get the user from the db
        GetItemRequest getItemRequest = GetItemRequest.builder()
                .tableName("TBCKUsers") 
                .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
                .build();

        //check the user response
        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);

        //if the user is not found return an error
        if (!getItemResponse.hasItem()) {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }

        //Map the data we want to update
        Map<String, AttributeValue> existingUserMap = getItemResponse.item();
        User existingUser = User.fromMap(existingUserMap); 

        existingUser.setUserId(userId);
    
        if (user.getFirstName() != null) {
            existingUser.setFirstName(user.getFirstName());
        }
        if (user.getLastName() != null) {
            existingUser.setLastName(user.getLastName());
        }
        if (user.getEmail() != null) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getPassword() != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            existingUser.setPassword(hashedPassword);
        }
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }
        if (user.getVerified() != null) {
            existingUser.setVerified(user.getVerified());
        }

        //remap the user to a map
        Map<String, AttributeValue> item = existingUser.toMap();
        
        //update the user in the db
        PutItemRequest request = PutItemRequest.builder()
            .tableName("TBCKUsers")
            .item(item)
            .build();

        dynamoDbClient.putItem(request);

        //return the updated user
        return existingUser;
    }
    
    @DeleteMapping(path = "/{userId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable(required = true) UUID userId) {

        //get the user to delete
        DeleteItemRequest deleteItemRequest = DeleteItemRequest.builder()
            .tableName("TBCKUsers")
            .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
            .build();

        // delete the user from the db
        dynamoDbClient.deleteItem(deleteItemRequest);
    }




    
}
