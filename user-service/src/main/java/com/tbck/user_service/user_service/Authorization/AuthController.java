package com.tbck.user_service.user_service.Authorization;

import com.tbck.user_service.user_service.User;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate")
public class AuthController {

    private final JwtTokenUtil jwtTokenUtil;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public AuthController(JwtTokenUtil jwtTokenUtil, DynamoDbClient dynamoDbClient) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.dynamoDbClient = dynamoDbClient;
    }

    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        // Step 1: Validate the user's credentials

          QueryRequest queryRequest = QueryRequest.builder()
        .tableName("TBCKUsers") // Replace with your table name
        .indexName("email-index") // Replace with your actual index name
        .keyConditionExpression("email = :email")
        .expressionAttributeValues(Map.of(":email", AttributeValue.builder().s(loginRequest.getEmail()).build()))
        .build();

        QueryResponse queryResponse = dynamoDbClient.query(queryRequest);


        if (queryResponse.count() == 0) {
            System.out.println("User with email " + loginRequest.getEmail() + " not found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password"); // User not found
        }

        Map<String, AttributeValue> item = queryResponse.items().get(0);
        User user = User.fromMap(item);

        //if the user is null or the password is not correct
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        
        // Step 2: Generate JWT token when the user is valid
        String token = jwtTokenUtil.generateToken(user); // Generate token with the user's uuid

        // Step 3: Return the token to the client
        return ResponseEntity.ok(token);
    }
    
}
