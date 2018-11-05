package com.matsveyeu.studentquiz.service;

import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.entity.User;

import java.util.Collection;

public interface ResultService {

    Result findById(String id);

    Collection<Result> findAll();

    Result add(Result result);

    Result update(Result result);

    void remove(Result result);

    Collection<Result> findByUser(User user);
}
