package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.QuizDtoConverter;
import com.matsveyeu.studentquiz.dto.QuizDto;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuizDtoConverter quizDtoConverter;

    @GetMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<QuizDto> getQuiz(@PathVariable String id) {
        Quiz quiz = quizService.findById(id);
        QuizDto dto = quizDtoConverter.fromEntityToDto(quiz);

        Link selfLink = linkTo(methodOn(QuizController.class).getQuiz(id)).withSelfRel().withType("GET");
        Link updateLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("update").withType("PUT");
        Link deleteLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("delete").withType("DELETE");
        dto.add(selfLink);
        dto.add(updateLink);
        dto.add(deleteLink);

        return new Resource<>(dto, selfLink, updateLink, deleteLink);
    }

    @GetMapping(produces = {"application/hal+json"})
    public Resources<QuizDto> getAllQuizzes() {
        Collection<QuizDto> quizzes = quizService
                .findAll()
                .stream()
                .map(quizDtoConverter::fromEntityToDto)
                .peek(dto -> {
                    Link selfLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withSelfRel().withType("GET");
                    Link updateLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("update").withType("PUT");
                    Link deleteLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("delete").withType("DELETE");
                    dto.add(selfLink);
                    dto.add(updateLink);
                    dto.add(deleteLink);
                })
                .collect(Collectors.toSet());

        Link selfLink = linkTo(methodOn(QuizController.class).getAllQuizzes()).withSelfRel();

        return new Resources<>(quizzes, selfLink);
    }

    @PostMapping(produces = {"application/hal+json"})
    public Resource<QuizDto> createQuiz(@Valid @RequestBody QuizDto dto) {
        Quiz quiz = quizDtoConverter.fromDtoToEntity(dto);
        quiz = quizService.add(quiz);
        dto = quizDtoConverter.fromEntityToDto(quiz);

        Link selfLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withSelfRel().withType("GET");
        Link updateLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("update").withType("PUT");
        Link deleteLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("delete").withType("DELETE");
        dto.add(selfLink);
        dto.add(updateLink);
        dto.add(deleteLink);

        return new Resource<>(dto, selfLink);
    }

    @PutMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<QuizDto> updateQuiz(@PathVariable String id, @Valid @RequestBody QuizDto dto) {
        quizService.findById(id);

        Quiz quiz = quizDtoConverter.fromDtoToEntity(dto);
        quiz = quizService.update(quiz);
        dto = quizDtoConverter.fromEntityToDto(quiz);

        Link selfLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withSelfRel().withType("GET");
        Link updateLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("update").withType("PUT");
        Link deleteLink = linkTo(QuizController.class).slash(dto.getQuizId()).withRel("delete").withType("DELETE");
        dto.add(selfLink);
        dto.add(updateLink);
        dto.add(deleteLink);

        return new Resource<>(dto, selfLink);
    }

    @DeleteMapping("/{id}")
    public Resource<QuizDto> deleteQuiz(@PathVariable String id) {
        Quiz quiz = quizService.findById(id);
        quizService.remove(quiz);

        QuizDto dto = quizDtoConverter.fromEntityToDto(quiz);

        Link createLink = linkTo(QuizController.class).withRel("create").withType("POST");
        dto.add(createLink);

        return new Resource<>(dto, createLink);
    }
}
