package com.tbck.news_service.news_service.Authorization;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

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

    @Override
    //routes listed here should not need to go through the filter/ anyone can access them
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // List routes where token authentication is not required
        return request.getRequestURI().equals("/news") || request.getRequestURI().equals("/news/get/{newsId}");
        //only things not filtered is the home page, news pages, and login
        //we need to filter any post/update/delete requests
        //commenting needs to be filtered, only verfied users can comment
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = extractJwtFromRequest(request);
        if (token != null && jwtTokenUtil.isTokenValid(token, jwtTokenUtil.extractEmail(token))) {
            SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(token));
        }
        filterChain.doFilter(request, response);
    }

}