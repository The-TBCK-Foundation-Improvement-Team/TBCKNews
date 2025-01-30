package com.tbck.user_service.user_service.Authorization;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final String token;// The JWT token

    // Constructor that takes the token and validates it
    public JwtAuthenticationToken(String token) {
        super(null);  // No authorities at this point
        this.token = token;
        setAuthenticated(true);  // Mark as authenticated once the token is validated
    }

    @Override
    public Object getCredentials() {
        return token;  // No credentials needed since the token is already validated, setting to token info
    }

    @Override
    public Object getPrincipal() {
        return null;  // The email can be considered the principal (or you can return the user object)
    }


    // Get the JWT token itself
    public String getToken() {
        return token;
    }
    
}
