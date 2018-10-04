package com.matsveyeu.studentquiz.repository;

import com.matsveyeu.studentquiz.entity.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz, String> {
}
