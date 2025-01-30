package com.tbck.user_service.user_service;
import jakarta.servlet.http.HttpServletResponse;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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

@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public ResponseEntity<Map<String, String>> createUser(@RequestBody User user, HttpServletResponse response) {
    // Set CORS headers
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
    if (user.getVerified() == null) {
        user.setVerified(false);
    }

    // Save user to database
    Map<String, AttributeValue> item = user.toMap();
    PutItemRequest request = PutItemRequest.builder()
        .tableName("TBCKUsers")
        .item(item)
        .build();

    dynamoDbClient.putItem(request); // Save user

    return ResponseEntity.ok(Map.of("message", "User created successfully."));
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

