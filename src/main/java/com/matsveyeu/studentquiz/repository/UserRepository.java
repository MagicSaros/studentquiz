package com.matsveyeu.studentquiz.repository;

import com.matsveyeu.studentquiz.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Collection;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{ $or: [ { login: ?0 }, { email: ?1 } ]}")
    Collection<User> findUsersByLoginOrEmail(String login, String email);

    Optional<User> findUserByLogin(String login);
}
