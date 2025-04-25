package com.tbck.news_service.news_service.Authorization;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    public TokenAuthenticationFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    private String extractJwtFromRequest(HttpServletRequest request) {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            System.out.println("Token: " + header.substring(7));
            return header.substring(7);  // Extract token part after "Bearer "
        }
        return null;
    }

    // @Override
    // //routes listed here should not need to go through the filter/ anyone can access them
    // protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    //     // List routes where token authentication is not required
    //     return request.getRequestURI().equals("/news") || request.getRequestURI().equals("/news/get/{newsId}");
    //     //only things not filtered is the home page, news pages, and login
    //     //we need to filter any post/update/delete requests
    //     //commenting needs to be filtered, only verfied users can comment
    // }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = extractJwtFromRequest(request);
        
        if (token != null && jwtTokenUtil.isTokenValid(token, jwtTokenUtil.extractEmail(token))) {
            Claims claims = jwtTokenUtil.extractAllClaims(token);
            String email = claims.getSubject();
            String role = claims.get("role", String.class); // Extract the role

            // Convert role to Spring Security format
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

            // Create authentication token with user details and authorities
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

}