package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.CategoryDtoConverter;
import com.matsveyeu.studentquiz.dto.CategoryDto;
import com.matsveyeu.studentquiz.entity.Category;
import com.matsveyeu.studentquiz.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/config")
@CrossOrigin
public class ConfigController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryDtoConverter categoryDtoConverter;

    @GetMapping("/countries")
    public ResponseEntity<?> getAllowedCountries() {
        String[] countryCodes = Locale.getISOCountries();
        Map<String, String> countries = new HashMap<>();
        for (String countryCode : countryCodes) {
            Locale locale = new Locale("", countryCode);
            countries.put(locale.getCountry(), locale.getDisplayName());
        }
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    @GetMapping("/quizzes/categories")
    public ResponseEntity<?> getCategories() {
        Collection<CategoryDto> categoriesDto = categoryService
                .findAll()
                .stream()
                .map(categoryDtoConverter::fromEntityToDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(categoriesDto, HttpStatus.OK);
    }
}
