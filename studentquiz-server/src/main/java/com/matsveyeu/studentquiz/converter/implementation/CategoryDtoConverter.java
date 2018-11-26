package com.matsveyeu.studentquiz.converter.implementation;

import com.matsveyeu.studentquiz.converter.DtoConverter;
import com.matsveyeu.studentquiz.dto.CategoryDto;
import com.matsveyeu.studentquiz.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoConverter implements DtoConverter<Category, CategoryDto> {

    @Override
    public CategoryDto fromEntityToDto(final Category category) {
        if (category == null) {
            return null;
        }

        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }

    @Override
    public Category fromDtoToEntity(final CategoryDto dto) {
        if (dto == null) {
            return null;
        }

        Category category = new Category();
        category.setId(dto.getId());
        category.setName(dto.getName());
        return category;
    }
}
