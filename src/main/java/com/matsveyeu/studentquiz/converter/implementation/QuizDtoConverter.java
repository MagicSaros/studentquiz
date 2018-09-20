package com.matsveyeu.studentquiz.converter.implementation;

import com.matsveyeu.studentquiz.converter.DtoConverter;
import com.matsveyeu.studentquiz.dto.QuizDto;
import com.matsveyeu.studentquiz.entity.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class QuizDtoConverter implements DtoConverter<Quiz, QuizDto> {

    @Autowired
    private QuestionDtoConverter questionDtoConverter;

    @Autowired
    private CategoryDtoConverter categoryDtoConverter;

    @Override
    public QuizDto fromEntityToDto(final Quiz quiz) {
        if (quiz == null) {
            return null;
        }

        QuizDto dto = new QuizDto();
        dto.setId(quiz.getId());
        dto.setName(quiz.getName());
        dto.setCategory(categoryDtoConverter.fromEntityToDto(quiz.getCategory()));
        dto.setQuestions(quiz
                .getQuestions()
                .stream()
                .map(questionDtoConverter::fromEntityToDto)
                .collect(Collectors.toSet()));
        return dto;
    }

    @Override
    public Quiz fromDtoToEntity(final QuizDto dto) {
        if (dto == null) {
            return null;
        }

        Quiz quiz = new Quiz();
        quiz.setId(dto.getId());
        quiz.setName(dto.getName());
        quiz.setCategory(categoryDtoConverter.fromDtoToEntity(dto.getCategory()));
        quiz.setQuestions(dto
                .getQuestions()
                .stream()
                .map(questionDtoConverter::fromDtoToEntity)
                .collect(Collectors.toSet()));
        return quiz;
    }
}
