package com.matsveyeu.studentquiz.service;

import com.matsveyeu.studentquiz.entity.User;

import java.util.Collection;

public interface UserService {

    User findById(String id);

    Collection<User> findAll();

    User add(User user);

    User update(User user);

    void remove(User user);
}
