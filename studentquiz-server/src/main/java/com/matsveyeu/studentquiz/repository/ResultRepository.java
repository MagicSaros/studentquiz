package com.matsveyeu.studentquiz.repository;

import com.matsveyeu.studentquiz.entity.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResultRepository extends MongoRepository<Result, String> {
}
