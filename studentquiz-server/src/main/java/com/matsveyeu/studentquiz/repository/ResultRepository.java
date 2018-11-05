package com.matsveyeu.studentquiz.repository;

import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;

public interface ResultRepository extends MongoRepository<Result, String> {

    Collection<Result> findByUser(User user);
}
