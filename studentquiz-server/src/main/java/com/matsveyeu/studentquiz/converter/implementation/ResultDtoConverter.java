package com.matsveyeu.studentquiz.converter.implementation;

import com.matsveyeu.studentquiz.converter.DtoConverter;
import com.matsveyeu.studentquiz.dto.ResultDto;
import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.service.QuizService;
import com.matsveyeu.studentquiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResultDtoConverter implements DtoConverter<Result, ResultDto> {

    @Autowired
    private QuizService quizService;

    @Autowired
    private UserService userService;

    @Override
    public ResultDto fromEntityToDto(Result result) {
        if (result == null) {
            return null;
        }

        ResultDto dto = new ResultDto();
        dto.setResultId(result.getId());
        dto.setQuizId(result.getQuiz().getId());
        dto.setUserId(result.getUser().getId());
        dto.setPercentage(result.getPercentage());
        return dto;
    }

    @Override
    public Result fromDtoToEntity(ResultDto dto) {
        if (dto == null) {
            return null;
        }

        Result result = new Result();
        result.setId(dto.getResultId());
        result.setQuiz(quizService.findById(dto.getQuizId()));
        result.setUser(userService.findById(dto.getUserId()));
        result.setPercentage(dto.getPercentage());
        return result;
    }
}
