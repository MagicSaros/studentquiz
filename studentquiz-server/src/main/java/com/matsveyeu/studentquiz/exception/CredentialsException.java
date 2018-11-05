package com.matsveyeu.studentquiz.exception;

public class CredentialsException extends RuntimeException {

    public CredentialsException() {
        this("Credentials exception");
    }

    public CredentialsException(String message) {
        super(message);
    }
}
