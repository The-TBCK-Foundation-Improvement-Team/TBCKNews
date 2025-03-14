package com.tbck.user_service.user_service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanResponse;

/**
 * Handles user authentication and account management.
 */
@CrossOrigin(origins = "https://tbcktimes.org", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserRestController {

    private final DynamoDbClient dynamoDbClient;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserRestController(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    /**
     * Retrieves a user by their user ID.
     */
    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable("userId") UUID userId) {

        User user = getUserFromDB(userId);
        if (user != null) {
            return user;
        } else {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }
    }

    @GetMapping("/name/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public String getUserName(@PathVariable("userId") UUID userId) {
        User user = getUserFromDB(userId);
        if (user != null) {
            return user.getFirstName() + " " + user.getLastName();
        } else {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }
    }

    /**
     * Retrieves a user all users that are unverified
     */
    @GetMapping("/unverified")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUnverifiedUsers() {
        ScanRequest scanRequest = ScanRequest.builder()
                .tableName("TBCKUsers")
                .filterExpression("verified = :verified")
                .expressionAttributeValues(Map.of(":verified", AttributeValue.builder().bool(false).build()))
                .build();

        ScanResponse scanResponse = dynamoDbClient.scan(scanRequest);
        return scanResponse.items().stream()
                .map(User::fromMap)
                .collect(Collectors.toList());
    }

    /**
     * Handles user signup. Ensures unique emails, password validation, and
     * stores user securely.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Map<String, String>> createUser(@RequestBody User user, HttpServletResponse response) {
        // Set CORS headers
        response.setHeader("Access-Control-Allow-Origin", "https://tbcktimes.org");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        System.out.println("Received Signup Request: " + user);

        user.setUserId(UUID.randomUUID());

        QueryRequest queryRequest = QueryRequest.builder()
                .tableName("TBCKUsers")
                .indexName("email-index")
                .keyConditionExpression("email = :email")
                .expressionAttributeValues(Map.of(":email", AttributeValue.builder().s(user.getEmail()).build()))
                .build();

        QueryResponse queryResponse = dynamoDbClient.query(queryRequest);
        if (queryResponse.count() != 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "User with this email already exists."));
        }

        // Validate and hash password
        validatePassword(user.getPassword());
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

        // Ensure verification field is set
        user.setVerified(false);
       
        user.setRole("GUEST");
        

        saveUser(user);

        return ResponseEntity.ok(Map.of("message", "User created successfully."));
    }

    /**
     * Updates an existing user.
     */
    @PatchMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@PathVariable UUID userId, @RequestBody User user) {

        // Map existing user data
        Map<String, AttributeValue> existingUserMap = getUserFromDB(userId).toMap();
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
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }
        if (user.getVerified() != null) {
            existingUser.setVerified(user.getVerified());
        }

        return saveUser(existingUser);
    }

    /**
     * Verifies a user and assigns a role.
     */
    @PatchMapping(path = "/verify/{userId}/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.OK)
    public User verifyUser(@PathVariable UUID userId, @PathVariable String role) {

        // Map existing user data
        Map<String, AttributeValue> existingUserMap = getUserFromDB(userId).toMap();
        User existingUser = User.fromMap(existingUserMap);

        existingUser.setVerified(true);
        existingUser.setRole(role);

        // Save updates to database
        return saveUser(existingUser);
    }

    /**
     * Deletes a user by their ID.
     */
    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable UUID userId) {
        DeleteItemRequest deleteItemRequest = DeleteItemRequest.builder()
                .tableName("TBCKUsers")
                .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
                .build();

        dynamoDbClient.deleteItem(deleteItemRequest);
    }

    /**
     * Helper function to validate password strength.
     */
    private void validatePassword(String password) {
        if (password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long.");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new RuntimeException("Password must contain at least one capital letter.");
        }
        if (!password.matches(".*[0-9].*")) {
            throw new RuntimeException("Password must contain at least one number.");
        }
        if (!password.matches(".*[!@#$%^&*()].*")) {
            throw new RuntimeException("Password must contain at least one special character.");
        }
    }

    private User getUserFromDB(UUID userId) {
        GetItemRequest getItemRequest = GetItemRequest.builder()
                .tableName("TBCKUsers")
                .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
                .build();

        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);

        if (!getItemResponse.hasItem()) {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }

        return User.fromMap(getItemResponse.item());
    }

    private User saveUser(User user) {
        Map<String, AttributeValue> item = user.toMap();

        PutItemRequest request = PutItemRequest.builder()
                .tableName("TBCKUsers")
                .item(item)
                .build();

        PutItemResponse response = dynamoDbClient.putItem(request);

        if (response.sdkHttpResponse().isSuccessful()) {
            return user;
        } else {
            throw new RuntimeException("Failed to save user");
        }
    }
}
