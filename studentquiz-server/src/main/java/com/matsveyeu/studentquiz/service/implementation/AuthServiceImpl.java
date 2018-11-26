package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.exception.IllegalOperationException;
import com.matsveyeu.studentquiz.repository.UserRepository;
import com.matsveyeu.studentquiz.service.AuthService;
import com.matsveyeu.studentquiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void changePassword(String userId, String oldPassword, String newPassword) {
        User user = userService.findById(userId);

        if (!encoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalOperationException("Password doesn't match");
        }

        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
    }
}
