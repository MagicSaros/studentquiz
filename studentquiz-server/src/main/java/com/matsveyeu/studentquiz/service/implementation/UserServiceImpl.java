package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.enums.UserRole;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.exception.IllegalOperationException;
import com.matsveyeu.studentquiz.repository.UserRepository;
import com.matsveyeu.studentquiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No such id"));
    }

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User add(User user) {
        if (user == null) {
            throw new EntityNotFoundException("User entity is null");
        }

        if (userRepository
                .findUserByLoginOrEmail(user.getLogin(), user.getEmail())
                .isPresent()) {
            throw new IllegalOperationException("User is already exist");
        }

        user.setRole(UserRole.STUDENT);

        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        if (user == null) {
            throw new EntityNotFoundException("User entity is null");
        }

        String newLogin = user.getLogin();
        String newEmail = user.getEmail();

        User oldUser = findById(user.getId());
        String oldLogin = oldUser.getLogin();
        String oldEmail = oldUser.getEmail();

        if (!newLogin.equals(oldLogin) && isLoginUsed(newLogin)) {
            throw new IllegalOperationException("Login already in use");
        }

        if (!newEmail.equals(oldEmail) && isEmailUsed(newEmail)) {
            throw new IllegalOperationException("Email already in use");
        }

        user.setPassword(oldUser.getPassword());
        user.setRole(oldUser.getRole());

        return userRepository.save(user);
    }

    @Override
    public void remove(User user) {
        if (user == null) {
            throw new EntityNotFoundException("User entity is null");
        }
        userRepository.delete(user);
    }

    @Override
    public User findByLogin(String login) {
        return userRepository
                .findUserByLogin(login)
                .orElseThrow(() -> new EntityNotFoundException("User does not exist"));
    }

    private boolean isLoginUsed(String login) {
        return userRepository
                .findUserByLogin(login)
                .isPresent();
    }

    private boolean isEmailUsed(String email) {
        return userRepository
                .findUserByEmail(email)
                .isPresent();
    }
}
