package com.matsveyeu.studentquiz.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.matsveyeu.studentquiz.converter.implementation.QuizDtoConverter;
import com.matsveyeu.studentquiz.dto.CategoryDto;
import com.matsveyeu.studentquiz.dto.QuestionDto;
import com.matsveyeu.studentquiz.dto.QuizDto;
import com.matsveyeu.studentquiz.entity.Category;
import com.matsveyeu.studentquiz.entity.Question;
import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.service.QuizService;
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

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class QuizControllerTest {

    private static final String URL_PREFIX = "/api/quizzes";
    private static final String CONTENT_TYPE = "application/hal+json;charset=UTF-8";
    private List<Quiz> quizzes;
    private List<QuizDto> quizzesDto;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuizService quizService;

    @MockBean
    private QuizDtoConverter quizDtoConverter;

    @Before
    public void init() {
        Category categoryOne = new Category();
        categoryOne.setId("1");
        categoryOne.setName("CategoryOne");
        CategoryDto categoryDtoOne = new CategoryDto();
        categoryDtoOne.setId("1");
        categoryDtoOne.setName("CategoryOne");

        Map<String, Boolean> options = new HashMap<>();
        options.put("OptionOne", true);
        options.put("OptionTwo", false);

        Question question = new Question();
        question.setText("QuestionOne");
        question.setOptions(options);
        QuestionDto questionDto = new QuestionDto();
        questionDto.setText("QuestionOne");
        questionDto.setOptions(options);

        Set<Question> questions = new HashSet<>();
        questions.add(question);
        Set<QuestionDto> questionsDto = new HashSet<>();
        questionsDto.add(questionDto);

        Quiz quizOne = new Quiz();
        quizOne.setId("1");
        quizOne.setName("QuizOne");
        quizOne.setCategory(categoryOne);
        quizOne.setQuestions(questions);
        QuizDto quizDtoOne = new QuizDto();
        quizDtoOne.setQuizId("1");
        quizDtoOne.setName("QuizOne");
        quizDtoOne.setCategory(categoryDtoOne);
        quizDtoOne.setQuestions(questionsDto);

        quizzes = new LinkedList<>();
        quizzes.add(quizOne);

        quizzesDto = new LinkedList<>();
        quizzesDto.add(quizDtoOne);
    }

    @Test
    public void getQuizTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        Quiz quiz = quizzes.get(0);
        QuizDto dto = quizzesDto.get(0);

        Set<Question> questions = quiz.getQuestions();
        ObjectMapper mapper = new ObjectMapper();
        String questionsJson = mapper.writeValueAsString(questions);

        BDDMockito.given(quizService.findById(quiz.getId())).willReturn(quiz);
        BDDMockito.given(quizDtoConverter.fromEntityToDto(quiz)).willReturn(dto);

        mockMvc
                .perform(get(url, quiz.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.quizId").value(dto.getQuizId()))
                .andExpect(jsonPath("$.name").value(dto.getName()))
                .andExpect(jsonPath("$.category.id").value(dto.getCategory().getId()))
                .andExpect(jsonPath("$.category.name").value(dto.getCategory().getName()))
                .andExpect(jsonPath("$.questions").isArray());

        BDDMockito.given(quizService.findById("0")).willThrow(new EntityNotFoundException("Quiz not found"));

        mockMvc
                .perform(get(url, "0"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.title").value("Entity not found"))
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Quiz not found"));
    }

    @Test
    public void createQuizTest() throws Exception {
        final String url = URL_PREFIX;

        Quiz quiz = quizzes.get(0);
        QuizDto dto = quizzesDto.get(0);

        ObjectMapper mapper = new ObjectMapper();
        String quizJson = mapper.writeValueAsString(quiz);

        BDDMockito.given(quizDtoConverter.fromDtoToEntity(dto)).willReturn(quiz);
        BDDMockito.given(quizService.add(quiz)).willReturn(quiz);
        BDDMockito.given(quizDtoConverter.fromEntityToDto(quiz)).willReturn(dto);

        mockMvc
                .perform(post(url)
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(quizJson))
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(dto.getName()))
                .andExpect(jsonPath("$.category.id").value(dto.getCategory().getId()))
                .andExpect(jsonPath("$.category.name").value(dto.getCategory().getName()))
                .andExpect(jsonPath("$.questions").isArray());
    }

    @Test
    public void updateQuizTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        Quiz quiz = quizzes.get(0);
        quiz.setName("QuizQuizOne");
        QuizDto dto = quizzesDto.get(0);
        dto.setName("QuizQuizOne");

        ObjectMapper mapper = new ObjectMapper();
        String quizJson = mapper.writeValueAsString(quiz);

        BDDMockito.given(quizService.findById(quiz.getId())).willReturn(quiz);
        BDDMockito.given(quizDtoConverter.fromDtoToEntity(dto)).willReturn(quiz);
        BDDMockito.given(quizService.update(quiz)).willReturn(quiz);
        BDDMockito.given(quizDtoConverter.fromEntityToDto(quiz)).willReturn(dto);

        mockMvc
                .perform(put(url, quiz.getId())
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(quizJson))
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(dto.getName()))
                .andExpect(jsonPath("$.category.id").value(dto.getCategory().getId()))
                .andExpect(jsonPath("$.category.name").value(dto.getCategory().getName()))
                .andExpect(jsonPath("$.questions").isArray());
    }

    @Test
    public void deleteQuizTest() throws Exception {
        final String url = URL_PREFIX + "/{id}";

        Quiz quiz = quizzes.get(0);
        QuizDto dto = quizzesDto.get(0);

        BDDMockito.given(quizService.findById(quiz.getId())).willReturn(quiz);
        BDDMockito.given(quizDtoConverter.fromEntityToDto(quiz)).willReturn(dto);
        mockMvc
                .perform(delete(url, quiz.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(CONTENT_TYPE))
                .andExpect(jsonPath("$.name").value(dto.getName()))
                .andExpect(jsonPath("$.category.id").value(dto.getCategory().getId()))
                .andExpect(jsonPath("$.category.name").value(dto.getCategory().getName()))
                .andExpect(jsonPath("$.questions").isArray());

    }
}
