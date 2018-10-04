package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.User;
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

        Collection<User> existentUsers = userRepository.findUsersByLoginOrEmail(user.getLogin(), user.getEmail());
        if (existentUsers.size() > 0) {
            throw new IllegalOperationException("User is already exist");
        }

        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        if (user == null) {
            throw new EntityNotFoundException("User entity is null");
        }
        return userRepository.save(user);
    }

    @Override
    public void remove(User user) {
        if (user == null) {
            throw new EntityNotFoundException("User entity is null");
        }
        userRepository.delete(user);
    }
}
