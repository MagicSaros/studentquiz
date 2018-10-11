package com.matsveyeu.studentquiz.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matsveyeu.studentquiz.converter.implementation.ResultDtoConverter;
import com.matsveyeu.studentquiz.dto.ResultDto;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.service.ResultService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ResultControllerTest {

    private static final String URL_PREFIX = "/api/results";
    private static final String CONTENT_TYPE = "application/hal+json;charset=UTF-8";
    private List<Result> results;
    private List<ResultDto> resultsDto;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResultService resultService;

    @MockBean
    private ResultDtoConverter resultDtoConverter;

    @Autowired
    private ObjectMapper mapper;

    @Before
    public void init() {
        Quiz quiz = new Quiz();
//        quiz.setId("1");

        User user = new User();
//        user.setId("1");

        Result result = new Result();
        result.setId("1");
        result.setQuiz(quiz);
        result.setUser(user);
        result.setPercentage(100D);

        ResultDto resultDto = new ResultDto();
        resultDto.setResultId("1");
//        resultDto.setQuiz("1");
//        resultDto.setUser("1");
        resultDto.setPercentage(100D);

        results = new LinkedList<>();
        results.add(result);

        resultsDto = new LinkedList<>();
        resultsDto.add(resultDto);
    }

    @Test
    public void getResultTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        Result result = results.get(0);
        ResultDto dto = resultsDto.get(0);

        BDDMockito.given(resultService.findById(result.getId())).willReturn(result);
        BDDMockito.given(resultDtoConverter.fromEntityToDto(result)).willReturn(dto);

        mockMvc
                .perform(get(url, result.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.resultId").value(dto.getResultId()))
                .andExpect(jsonPath("$.quizId").value(dto.getQuiz()))
                .andExpect(jsonPath("$.userId").value(dto.getUser()))
                .andExpect(jsonPath("$.percentage").value(dto.getPercentage()));

        BDDMockito.given(resultService.findById("0")).willThrow(new EntityNotFoundException("Result not found"));

        mockMvc
                .perform(get(url, "0"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.title").value("Entity not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Result not found"));
    }

    @Test
    public void createResultTest() throws Exception {
        final String url = URL_PREFIX;

        Result result = results.get(0);
        ResultDto dto = resultsDto.get(0);

        String resultJson = mapper.writeValueAsString(dto);

        BDDMockito.given(resultDtoConverter.fromDtoToEntity(dto)).willReturn(result);
        BDDMockito.given(resultService.add(result)).willReturn(result);
        BDDMockito.given(resultDtoConverter.fromEntityToDto(result)).willReturn(dto);

        mockMvc
                .perform(post(url)
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(resultJson))
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.resultId").value(dto.getResultId()))
                .andExpect(jsonPath("$.quizId").value(dto.getQuiz()))
                .andExpect(jsonPath("$.userId").value(dto.getUser()))
                .andExpect(jsonPath("$.percentage").value(dto.getPercentage()));
    }

    @Test
    public void updateResultTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        Result result = results.get(0);
        ResultDto dto = resultsDto.get(0);

        String resultJson = mapper.writeValueAsString(dto);

        BDDMockito.given(resultService.findById(result.getId())).willReturn(result);
        BDDMockito.given(resultDtoConverter.fromDtoToEntity(dto)).willReturn(result);
        BDDMockito.given(resultService.update(result)).willReturn(result);
        BDDMockito.given(resultDtoConverter.fromEntityToDto(result)).willReturn(dto);

        mockMvc
                .perform(put(url, result.getId())
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(resultJson))
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultId").value(dto.getResultId()))
                .andExpect(jsonPath("$.quizId").value(dto.getQuiz()))
                .andExpect(jsonPath("$.userId").value(dto.getUser()))
                .andExpect(jsonPath("$.percentage").value(dto.getPercentage()));
    }

    @Test
    public void deleteResultTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        Result result = results.get(0);
        ResultDto dto = resultsDto.get(0);

        BDDMockito.given(resultService.findById(result.getId())).willReturn(result);
        BDDMockito.given(resultDtoConverter.fromEntityToDto(result)).willReturn(dto);
        mockMvc
                .perform(delete(url, result.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.resultId").value(dto.getResultId()))
                .andExpect(jsonPath("$.quizId").value(dto.getQuiz()))
                .andExpect(jsonPath("$.userId").value(dto.getUser()))
                .andExpect(jsonPath("$.percentage").value(dto.getPercentage()));

    }
}
