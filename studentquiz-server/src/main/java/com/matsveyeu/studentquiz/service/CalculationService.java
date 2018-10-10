package com.matsveyeu.studentquiz.service;

import com.matsveyeu.studentquiz.entity.Question;

import java.util.Map;
import java.util.Set;

public interface CalculationService {

    double calculatePercentage(Set<Question> questions, Map<String, String> answers);
}
