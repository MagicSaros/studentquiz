package com.matsveyeu.studentquiz.service;

import com.matsveyeu.studentquiz.entity.Quiz;

import java.util.Collection;

public interface QuizService {

    Quiz findById(String id);

    Collection<Quiz> findAll();

    Quiz add(Quiz quiz);

    Quiz update(Quiz quiz);

    void remove(Quiz quiz);
}
