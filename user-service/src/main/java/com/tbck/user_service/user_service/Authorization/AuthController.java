package com.tbck.user_service.user_service.Authorization;

import com.tbck.user_service.user_service.User;

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

    @Autowired
    public AuthController(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;

    }

    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        // Step 1: Validate the user's credentials
        User user = null; // Fetch user from database using loginRequest.getEmail()

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
