package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.QuizDtoConverter;
import com.matsveyeu.studentquiz.dto.QuizDto;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuizDtoConverter quizDtoConverter;

    @GetMapping("/{id}")
    public ResponseEntity<QuizDto> getQuiz(@PathVariable String id) {
        Quiz quiz = quizService.findById(id);
        QuizDto dto = quizDtoConverter.fromEntityToDto(quiz);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Collection<QuizDto>> getAllQuizzes() {
        Collection<QuizDto> quizzes = quizService
                .findAll()
                .stream()
                .map(quizDtoConverter::fromEntityToDto)
                .collect(Collectors.toSet());

        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<QuizDto> createQuiz(@Valid @RequestBody QuizDto dto) {
        Quiz quiz = quizDtoConverter.fromDtoToEntity(dto);
        quiz = quizService.add(quiz);
        dto = quizDtoConverter.fromEntityToDto(quiz);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizDto> updateQuiz(@PathVariable String id, @Valid @RequestBody QuizDto dto) {
        quizService.findById(id);

        Quiz quiz = quizDtoConverter.fromDtoToEntity(dto);
        quiz = quizService.update(quiz);
        dto = quizDtoConverter.fromEntityToDto(quiz);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<QuizDto> deleteQuiz(@PathVariable String id) {
        Quiz quiz = quizService.findById(id);
        quizService.remove(quiz);

        QuizDto dto = quizDtoConverter.fromEntityToDto(quiz);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
