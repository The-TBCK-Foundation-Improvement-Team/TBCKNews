package com.tbck.user_service.user_service;

import java.util.UUID;
import org.springframework.http.HttpStatus;
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


//NEED TO SET UP DATABSE CONNECTION FOR THESE ROUTES TO FUNCTION
@RestController
@RequestMapping("/user")
public class UserRestContreoller {

    @GetMapping(path = "/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public User getUser(@PathVariable("userId") UUID userId) {

         return null;
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Iterable<User> getUsers() {

        return null;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {

        user.setUserId(UUID.randomUUID());

        //hash user password 
        String userPassword = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userPassword);
        user.setPassword(hashedPassword);
        

        return null;
    }

    @PatchMapping(path = "/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public User updateUser(@PathVariable(required = true) UUID userId, @RequestBody User user) {

        //get the user to update
        User existingUser = null;
    

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
            existingUser.setPassword(user.getPassword());
        }


        //save the existing user to the DB
        return null;
    }
    
    @DeleteMapping(path = "/{userId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable(required = true) UUID userId) {

        
        //delete the user from the DB
    }




    
}
