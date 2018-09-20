package com.matsveyeu.studentquiz.repository;

import com.matsveyeu.studentquiz.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface CategoryRepository extends MongoRepository<Category, Long> {
}
