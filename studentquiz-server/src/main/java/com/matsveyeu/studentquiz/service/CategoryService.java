package com.matsveyeu.studentquiz.service;

import com.matsveyeu.studentquiz.entity.Category;

import java.util.Collection;

public interface CategoryService {

    Category findById(String id);

    Collection<Category> findAll();

    Category add(Category category);

    Category update(Category category);

    void remove(Category category);

    Category findOne(Category category);
}
