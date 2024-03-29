package com.matsveyeu.studentquiz.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matsveyeu.studentquiz.exception.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authenticationException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        ApiError apiError = new ApiError.Builder()
                .setTitle("Unauthorized")
                .setStatus(HttpStatus.UNAUTHORIZED.value())
                .setMessage(authenticationException.getMessage())
                .setTimestamp(new Date().getTime())
                .setDeveloperMessage(authenticationException.getClass().getName())
                .build();
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(apiError);
        response.getOutputStream().println(json);
    }
}
