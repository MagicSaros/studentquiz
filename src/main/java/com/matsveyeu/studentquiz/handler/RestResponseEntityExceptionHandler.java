package com.matsveyeu.studentquiz.handler;

import com.matsveyeu.studentquiz.exception.ApiError;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.exception.IllegalOperationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({EntityNotFoundException.class})
    public ResponseEntity<ApiError> handleEntityNotFound(Exception e) {
        ApiError apiError = new ApiError.Builder()
                .setTitle("Entity not found")
                .setStatus(HttpStatus.NOT_FOUND.value())
                .setMessage(e.getMessage())
                .setTimestamp(new Date().getTime())
                .setDeveloperMessage(e.getClass().getName())
                .build();
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({IllegalOperationException.class})
    public ResponseEntity<ApiError> handleIllegalOperation(Exception e) {
        ApiError apiError = new ApiError.Builder()
                .setTitle("Illegal operation")
                .setStatus(HttpStatus.NOT_FOUND.value())
                .setMessage(e.getMessage())
                .setTimestamp(new Date().getTime())
                .setDeveloperMessage(e.getClass().getName())
                .build();
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e, HttpHeaders headers, HttpStatus status,
            WebRequest request) {
        ApiError apiError = new ApiError.Builder()
                .setTitle("Validation failed")
                .setStatus(HttpStatus.BAD_REQUEST.value())
                .setMessage(e.getMessage())
                .setTimestamp(new Date().getTime())
                .setDeveloperMessage(e.getClass().getName())
                .build();
        return handleExceptionInternal(e,
                apiError, headers, status, request);
    }
}
