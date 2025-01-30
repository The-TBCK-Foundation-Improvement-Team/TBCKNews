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
public ResponseEntity<Map<String, Object>> login(@RequestBody User loginRequest) {
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

    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
    }

    // ✅ Generate JWT Token
    String token = jwtTokenUtil.generateToken(user);

    // ✅ Return both token & user details
    Map<String, Object> response = Map.of(
        "token", token,
        "user", user
    );

    return ResponseEntity.ok(response);
}

    
}
