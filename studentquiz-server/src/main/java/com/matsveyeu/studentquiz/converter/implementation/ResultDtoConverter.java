package com.matsveyeu.studentquiz.converter.implementation;

import com.matsveyeu.studentquiz.converter.DtoConverter;
import com.matsveyeu.studentquiz.dto.QuizDto;
import com.matsveyeu.studentquiz.dto.ResultDto;
import com.matsveyeu.studentquiz.dto.UserDto;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.entity.User;
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
        QuizDto quizDto = new QuizDto();
        quizDto.setQuizId(result.getQuiz().getId());
        quizDto.setName(result.getQuiz().getName());
        dto.setQuiz(quizDto);
        UserDto userDto = new UserDto();
        userDto.setUserId(result.getUser().getId());
        userDto.setLogin(result.getUser().getLogin());
        dto.setUser(userDto);
        dto.setPercentage(result.getPercentage());
        dto.setSuccess(result.isSuccess());
        dto.setAnswers(result.getAnswers());
        return dto;
    }

    @Override
    public Result fromDtoToEntity(ResultDto dto) {
        if (dto == null) {
            return null;
        }

        Result result = new Result();
        result.setId(dto.getResultId());
        Quiz quiz = quizService.findById(dto.getQuiz().getQuizId());
        result.setQuiz(quiz);
        User user = userService.findById(dto.getUser().getUserId());
        result.setUser(user);
        result.setPercentage(dto.getPercentage());
        result.setSuccess(dto.isSuccess());
        result.setAnswers(dto.getAnswers());
        return result;
    }
}
