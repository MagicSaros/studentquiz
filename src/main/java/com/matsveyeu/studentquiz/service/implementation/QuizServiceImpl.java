package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.repository.QuizRepository;
import com.matsveyeu.studentquiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz findById(Long id) {
        return quizRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No such id"));
    }

    @Override
    public Collection<Quiz> findAll() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz add(Quiz quiz) {
        if (quiz == null) {
            throw new EntityNotFoundException("Entity is null");
        }
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz update(Quiz quiz) {
        if (quiz == null) {
            throw new EntityNotFoundException("Entity is null");
        }
        return quizRepository.save(quiz);
    }

    @Override
    public void remove(Quiz quiz) {
        if (quiz == null) {
            throw new EntityNotFoundException("Entity is null");
        }
        quizRepository.delete(quiz);
    }
}
