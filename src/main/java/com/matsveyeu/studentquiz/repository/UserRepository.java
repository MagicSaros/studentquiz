package com.matsveyeu.studentquiz.repository;

import com.matsveyeu.studentquiz.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
