package com.tbck.user_service.user_service;

import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

/**
 * Handles user authentication and account management.
 */
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
        GetItemRequest getItemRequest = GetItemRequest.builder()
            .tableName("TBCKUsers")
            .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
            .build();

        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);

        if (getItemResponse.hasItem()) {
            return User.fromMap(getItemResponse.item());
        } else {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }
    }

    /**
     * Handles user signup. Ensures unique emails, password validation, and stores user securely.
     */
    @PostMapping("/signup")
@ResponseStatus(HttpStatus.CREATED)
public ResponseEntity<Map<String, String>> createUser(@RequestBody User user) {
    System.out.println("Received Signup Request: " + user);

    // ✅ Ensure userId is a valid UUID
    user.setUserId(UUID.randomUUID());

    // Check if email is already in use
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

    // ✅ Ensure verification field is always set
    if (user.getVerified() == null) {
        user.setVerified(false);
    }

    // Save user
    Map<String, AttributeValue> item = user.toMap();
    PutItemRequest request = PutItemRequest.builder()
        .tableName("TBCKUsers")
        .item(item)
        .build();

    dynamoDbClient.putItem(request);

    return ResponseEntity.ok(Map.of("message", "User created successfully."));
}

    /**
     * Handles user login. Verifies credentials and returns user data.
     */
   @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String password = credentials.get("password");

    QueryRequest queryRequest = QueryRequest.builder()
        .tableName("TBCKUsers")
        .indexName("email-index")
        .keyConditionExpression("email = :email")
        .expressionAttributeValues(Map.of(":email", AttributeValue.builder().s(email).build()))
        .build();

    QueryResponse queryResponse = dynamoDbClient.query(queryRequest);
    
    if (queryResponse.count() == 0) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    User user = User.fromMap(queryResponse.items().get(0));

    // ✅ Debugging: Print all user fields
    System.out.println("User Found: " + user.getEmail());
    System.out.println("User Verified Status: " + user.getVerified());
    System.out.println("User First Name: " + user.getFirstName());
    System.out.println("User Last Name: " + user.getLastName());
    System.out.println("User Role: " + user.getRole());
    System.out.println("User Password: " + user.getPassword());

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 🚨 Ensure no null fields are causing issues
    if (user.getPassword() == null) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Password is missing for this user.");
    }

    if (!passwordEncoder.matches(password, user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    // ✅ Return user details (without password)
    Map<String, Object> userData = Map.of(
        "userId", user.getUserId(),
        "firstName", user.getFirstName() != null ? user.getFirstName() : "Unknown",
        "lastName", user.getLastName() != null ? user.getLastName() : "Unknown",
        "email", user.getEmail(),
        "role", user.getRole() != null ? user.getRole() : "guest"
    );

    return ResponseEntity.ok(userData);
}
    /**
     * Updates an existing user.
     */
    @PatchMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@PathVariable UUID userId, @RequestBody User user) {
        GetItemRequest getItemRequest = GetItemRequest.builder()
            .tableName("TBCKUsers")
            .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
            .build();

        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);
        if (!getItemResponse.hasItem()) {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }

        // Map existing user data
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
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }
        if (user.getVerified() != null) {
            existingUser.setVerified(user.getVerified());
        }

        // Save updates to database
        Map<String, AttributeValue> item = existingUser.toMap();
        PutItemRequest request = PutItemRequest.builder()
            .tableName("TBCKUsers")
            .item(item)
            .build();

        dynamoDbClient.putItem(request);
        return existingUser;
    }

    /**
     * Verifies a user and assigns a role.
     */
    @PatchMapping(path = "verify/{userId}/{role}")
    @ResponseStatus(code = HttpStatus.OK)
    public User verifyUser(@PathVariable UUID userId, @PathVariable String role) {
        GetItemRequest getItemRequest = GetItemRequest.builder()
            .tableName("TBCKUsers")
            .key(Map.of("userId", AttributeValue.builder().s(userId.toString()).build()))
            .build();

        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);
        if (!getItemResponse.hasItem()) {
            throw new RuntimeException("User with ID " + userId + " not found.");
        }

        // Map existing user data
        Map<String, AttributeValue> existingUserMap = getItemResponse.item();
        User existingUser = User.fromMap(existingUserMap);

        existingUser.setVerified(true);
        existingUser.setRole(role);

        // Save updates to database
        Map<String, AttributeValue> item = existingUser.toMap();
        PutItemRequest request = PutItemRequest.builder()
            .tableName("TBCKUsers")
            .item(item)
            .build();

        dynamoDbClient.putItem(request);
        return existingUser;
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
}

