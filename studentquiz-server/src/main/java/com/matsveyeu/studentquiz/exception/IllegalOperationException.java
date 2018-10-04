package com.matsveyeu.studentquiz.exception;

public class IllegalOperationException extends RuntimeException {

    public IllegalOperationException() {
        this("Illegal operation exception");
    }

    public IllegalOperationException(String message) {
        super(message);
    }
}
