package com.matsveyeu.studentquiz.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matsveyeu.studentquiz.exception.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        ApiError apiError = new ApiError.Builder()
                .setTitle("Forbidden")
                .setStatus(HttpStatus.FORBIDDEN.value())
                .setMessage(accessDeniedException.getMessage())
                .setTimestamp(new Date().getTime())
                .setDeveloperMessage(accessDeniedException.getClass().getName())
                .build();
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(apiError);
        response.getOutputStream().println(json);
    }
}
