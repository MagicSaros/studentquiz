package com.matsveyeu.studentquiz.converter.implementation;

import com.matsveyeu.studentquiz.converter.DtoConverter;
import com.matsveyeu.studentquiz.dto.QuestionDto;
import com.matsveyeu.studentquiz.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionDtoConverter implements DtoConverter<Question, QuestionDto> {

    @Override
    public QuestionDto fromEntityToDto(final Question question) {
        if (question == null) {
            return null;
        }

        QuestionDto dto = new QuestionDto();
        dto.setText(question.getText());
        dto.setOptions(question.getOptions());
        return dto;
    }

    @Override
    public Question fromDtoToEntity(final QuestionDto dto) {
        if (dto == null) {
            return null;
        }

        Question question = new Question();
        question.setText(dto.getText());
        question.setOptions(dto.getOptions());
        return question;
    }
}
