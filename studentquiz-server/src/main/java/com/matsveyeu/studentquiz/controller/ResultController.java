package com.matsveyeu.studentquiz.controller;

import com.matsveyeu.studentquiz.converter.implementation.ResultDtoConverter;
import com.matsveyeu.studentquiz.dto.ResultDto;
import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("api/results")
@CrossOrigin
public class ResultController {

    @Autowired
    private ResultService resultService;

    @Autowired
    private ResultDtoConverter resultDtoConverter;

    @GetMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<ResultDto> getResult(@PathVariable String id) {
        Result result = resultService.findById(id);
        ResultDto dto = resultDtoConverter.fromEntityToDto(result);

        Link selfLink = linkTo(ResultController.class).slash(dto.getResultId()).withSelfRel().withType("GET");
        Link userLink = linkTo(methodOn(UserController.class).getUser(dto.getUserId())).withRel("user").withType("GET");
        Link quizLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withRel("quiz").withType("GET");
        dto.add(selfLink, userLink, quizLink);

        return new Resource<>(dto, selfLink, userLink, quizLink);
    }

    @GetMapping(produces = {"application/hal+json"})
    public Resources<ResultDto> getAllResults() {
        Collection<ResultDto> results = resultService
                .findAll()
                .stream()
                .map(resultDtoConverter::fromEntityToDto)
                .peek(dto -> {
                    Link selfLink = linkTo(ResultController.class).slash(dto.getResultId()).withSelfRel().withType("GET");
                    Link userLink = linkTo(methodOn(UserController.class).getUser(dto.getUserId())).withRel("user").withType("GET");
                    Link quizLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withRel("quiz").withType("GET");
                    dto.add(selfLink, userLink, quizLink);
                })
                .collect(Collectors.toSet());

        Link selfLink = linkTo(ResultController.class).withSelfRel().withType("GET");

        return new Resources<>(results, selfLink);
    }

    @PostMapping(produces = {"application/hal+json"})
    @ResponseStatus(HttpStatus.CREATED)
    public Resource<ResultDto> createResult(@Valid @RequestBody ResultDto dto) {
        Result result = resultDtoConverter.fromDtoToEntity(dto);
        result = resultService.add(result);
        dto = resultDtoConverter.fromEntityToDto(result);

        Link selfLink = linkTo(ResultController.class).slash(dto.getResultId()).withSelfRel().withType("GET");
        Link userLink = linkTo(methodOn(UserController.class).getUser(dto.getUserId())).withRel("user").withType("GET");
        Link quizLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withRel("quiz").withType("GET");
        dto.add(selfLink, userLink, quizLink);

        return new Resource<>(dto, selfLink, userLink, quizLink);
    }

    @PutMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<ResultDto> updateResult(@PathVariable String id, @Valid @RequestBody ResultDto dto) {
        resultService.findById(id);

        Result result = resultDtoConverter.fromDtoToEntity(dto);
        result = resultService.update(result);
        dto = resultDtoConverter.fromEntityToDto(result);

        Link selfLink = linkTo(ResultController.class).slash(dto.getResultId()).withSelfRel().withType("GET");
        Link userLink = linkTo(methodOn(UserController.class).getUser(dto.getUserId())).withRel("user").withType("GET");
        Link quizLink = linkTo(methodOn(QuizController.class).getQuiz(dto.getQuizId())).withRel("quiz").withType("GET");
        dto.add(selfLink, userLink, quizLink);

        return new Resource<>(dto, selfLink, userLink, quizLink);
    }

    @DeleteMapping(value = "/{id}", produces = {"application/hal+json"})
    public Resource<ResultDto> deleteResult(@PathVariable String id) {
        Result result = resultService.findById(id);
        resultService.remove(result);

        ResultDto dto = resultDtoConverter.fromEntityToDto(result);

        Link createLink = linkTo(ResultController.class).withRel("create").withType("POST");
        dto.add(createLink);

        return new Resource<>(dto, createLink);
    }
}
