package com.tbck.user_service.user_service.Authorization;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenUtil jwtTokenUtil;

    public SecurityConfig(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()  // ✅ Enable CORS
            .csrf().disable()  // ✅ Disable CSRF for API security
            .authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/user").permitAll() // ✅ Allow user signup
                .requestMatchers(HttpMethod.POST, "/authenticate/login").permitAll() // ✅ Allow user login
                .requestMatchers(HttpMethod.GET, "/user/{userId}").authenticated() // ✅ Protect user data
                .requestMatchers("/ws/**").permitAll() // ✅ Allow WebSockets
                .anyRequest().authenticated()  // ✅ Require authentication for everything else
            .and()
            .addFilterBefore(new TokenAuthenticationFilter(jwtTokenUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
