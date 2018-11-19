package com.matsveyeu.studentquiz.service;

public interface AuthService {

    void changePassword(String userId, String oldPassword, String newPassword);
}
