package com.tbck.user_service.user_service.Authorization;
import org.springframework.http.HttpMethod;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenUtil jwtTokenUtil;

    public SecurityConfig(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors().and()
        .csrf().disable()  //Disable CSRF for APIs
        .authorizeHttpRequests()
            .requestMatchers(HttpMethod.POST, "/user").permitAll() //Allow signup
            .requestMatchers("/authenticate/login", "/user/{userId}").permitAll()  //Allow these paths
            .anyRequest().authenticated()  //Requires authentication for other paths
        .and()
        .addFilterBefore(new TokenAuthenticationFilter(jwtTokenUtil), UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

}
