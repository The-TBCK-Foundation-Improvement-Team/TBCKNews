package com.tbck.news_service.news_service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

public class SecretsManagerUtil {
    private static final String SECRET_NAME = "JWT_SECRET"; // Name of your AWS Secret
    private static final String REGION = "us-east-2"; // Update to your AWS region
    private static Map<String, String> secretsCache = new HashMap<>();

    // Load secrets from AWS Secrets Manager
    static {
        try {
            SecretsManagerClient client = SecretsManagerClient.builder()
                    .region(Region.of(REGION))
                    .build();

            GetSecretValueRequest request = GetSecretValueRequest.builder()
                    .secretId(SECRET_NAME)
                    .build();

            GetSecretValueResponse response = client.getSecretValue(request);

            // Parse the JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.secretString());

            // Store all secrets in a map for quick access
            jsonNode.fields().forEachRemaining(entry -> secretsCache.put(entry.getKey(), entry.getValue().asText()));

        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve secrets from AWS Secrets Manager", e);
        }
    }

    // Method to get a specific secret
    public static String getSecret(String key) {
        return secretsCache.getOrDefault(key, null);
    }
}
