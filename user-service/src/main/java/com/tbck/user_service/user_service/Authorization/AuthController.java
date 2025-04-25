package com.tbck.user_service.user_service.Authorization;

import com.tbck.user_service.user_service.User;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
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
public ResponseEntity<Map<String, String>> login(@RequestBody User loginRequest) {
    // Step 1: Validate the user's credentials

    QueryRequest queryRequest = QueryRequest.builder()
        .tableName("TBCKUsers") 
        .indexName("email-index") 
        .keyConditionExpression("email = :email")
        .expressionAttributeValues(Map.of(":email", AttributeValue.builder().s(loginRequest.getEmail()).build()))
        .build();

    QueryResponse queryResponse = dynamoDbClient.query(queryRequest);

    if (queryResponse.count() == 0) {
        System.out.println("User with email " + loginRequest.getEmail() + " not found.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
    }

    Map<String, AttributeValue> item = queryResponse.items().get(0);
    User user = User.fromMap(item);

    // If the user is null or password is incorrect
    if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
    }

    // Ensure user is verified before login
    if (!user.getVerified()) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Account is not verified. Contact admin."));
    }

    // Step 2: Generate JWT token when the user is valid
    String token = jwtTokenUtil.generateToken(user); // Generate token with the user's UUID

    // Send back user data and token
    return ResponseEntity.ok(Map.of(
        "message", "Login successful",
        "token", token,
        "userId", user.getUserId().toString(),
        "email", user.getEmail(),
        "firstName", user.getFirstName(),
        "lastName", user.getLastName(),
        "role", user.getRole()
    ));
}
}
