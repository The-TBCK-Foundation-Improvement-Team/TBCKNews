package com.tbck.news_service.news_service.Authorization;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

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
        .csrf().disable()  // Disable CSRF for APIs
        .cors().and()
            .authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET,"/news/get/{newsId}").permitAll()  // Allows access to these paths without authentication
                .requestMatchers(HttpMethod.GET, "/news").permitAll()
                .requestMatchers(HttpMethod.GET, "/news/newest").permitAll()
                .requestMatchers(HttpMethod.GET, "/news/category/{category}").permitAll()
                .requestMatchers(HttpMethod.POST, "/news/comment/{newsId}").hasAnyRole("GUEST", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/news").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/news/{newsId}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/news/{newsId}").hasRole("ADMIN")
                .anyRequest().authenticated()  // Requires authentication for other paths
                .and()
                .addFilterBefore(new TokenAuthenticationFilter(jwtTokenUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
                
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");  // Allow your frontend origin
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
