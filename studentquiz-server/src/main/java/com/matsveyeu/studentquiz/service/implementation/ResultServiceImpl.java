package com.matsveyeu.studentquiz.service.implementation;

import com.matsveyeu.studentquiz.entity.Quiz;
import com.matsveyeu.studentquiz.entity.Result;
import com.matsveyeu.studentquiz.entity.User;
import com.matsveyeu.studentquiz.exception.EntityNotFoundException;
import com.matsveyeu.studentquiz.repository.ResultRepository;
import com.matsveyeu.studentquiz.service.CalculationService;
import com.matsveyeu.studentquiz.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;

@Service
public class ResultServiceImpl implements ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private CalculationService calculationService;

    @Override
    public Result findById(String id) {
        return resultRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No such id"));
    }

    @Override
    public Collection<Result> findAll() {
        return resultRepository.findAll();
    }

    @Override
    public Result add(Result result) {
        if (result == null) {
            throw new EntityNotFoundException("Result entity is null");
        }

        Quiz quiz = result.getQuiz();
        double threshold = quiz.getThreshold();
        double percentage = calculationService.calculatePercentage(quiz.getQuestions(), result.getAnswers());

        result.setPercentage(percentage);
        result.setSuccess(percentage >= threshold);
        result.setTimestamp(LocalDateTime.now());

        return resultRepository.save(result);
    }

    @Override
    public Result update(Result result) {
        if (result == null) {
            throw new EntityNotFoundException("Result entity not found");
        }

        return resultRepository.save(result);
    }

    @Override
    public void remove(Result result) {
        if (result == null) {
            throw new EntityNotFoundException("Result entity not found");
        }

        resultRepository.delete(result);
    }

    @Override
    public Collection<Result> findByUser(User user) {
        return resultRepository.findByUser(user);
    }
}
