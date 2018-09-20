package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.Category;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.repository.CategoryRepository;
import com.matsveyeu.studentquiz.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No such id"));
    }

    @Override
    public Collection<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category add(Category category) {
        if (category == null) {
            throw new EntityNotFoundException("Entity is null");
        }

        Long id = categoryRepository.count() + 1;
        category.setId(id);

        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category) {
        if (category == null) {
            throw new EntityNotFoundException("Entity is null");
        }
        return categoryRepository.save(category);
    }

    @Override
    public void remove(Category category) {
        if (category == null) {
            throw new EntityNotFoundException("Entity is null");
        }
        categoryRepository.delete(category);
    }
}
