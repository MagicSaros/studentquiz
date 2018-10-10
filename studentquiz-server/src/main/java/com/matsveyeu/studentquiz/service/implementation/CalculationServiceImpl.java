package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.Question;
import com.matsveyeu.studentquiz.service.CalculationService;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@Service
public class CalculationServiceImpl implements CalculationService {

    @Override
    public double calculatePercentage(Set<Question> questions, Map<String, String> answers) {
        long total = questions
                .stream()
                .filter(question -> isRight(question, answers))
                .count();

        return Math.round(total / (double) questions.size() * 100);
    }

    private boolean isRight(Question question, Map<String, String> answers) {
        String text = question.getText();
        if (!answers.containsKey(text)) {
            return false;
        }

        String answer = answers.get(text);
        Map<String, Boolean> options = question.getOptions();
        if (!options.containsKey(answer)) {
            return false;
        }

        return options.get(answer);
    }
}
