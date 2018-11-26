package com.matsveyeu.studentquiz.service;

import com.matsveyeu.studentquiz.entity.Question;
import com.matsveyeu.studentquiz.enums.QuestionType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static junit.framework.TestCase.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CalculationServiceTest {

    @Autowired
    private CalculationService calculationService;

    @Test
    public void calculatePercentageTest() {
        Map<String, Boolean> options = new HashMap<>();
        options.put("First", true);
        options.put("Second", false);
        options.put("Third", false);

        Question questionOne = new Question();
        questionOne.setText("Question one");
        questionOne.setType(QuestionType.ONE_OPTION);
        questionOne.setOptions(options);

        Question questionTwo = new Question();
        questionTwo.setText("Question two");
        questionTwo.setType(QuestionType.ONE_OPTION);
        questionTwo.setOptions(options);

        Set<Question> questions = new HashSet<>();
        questions.add(questionOne);
        questions.add(questionTwo);

        Map<String, String> answers = new HashMap<>();
        answers.put("Question one", "First");
        answers.put("Question two", "Second");

        Double expected = 50D;
        Double actual = calculationService.calculatePercentage(questions, answers);

        assertEquals(expected, actual);
    }
}
