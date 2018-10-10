package com.matsveyeu.studentquiz.dto;

import org.springframework.hateoas.ResourceSupport;

import javax.validation.constraints.NotNull;
import java.util.Map;

public class ResultDto extends ResourceSupport {

    private String resultId;
    private QuizDto quiz;
    private UserDto user;
    private Double percentage;
    private boolean success;
    private Map<String, String> answers;

    public String getResultId() {
        return resultId;
    }

    public void setResultId(String resultId) {
        this.resultId = resultId;
    }

    @NotNull
    public QuizDto getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDto quiz) {
        this.quiz = quiz;
    }

    @NotNull
    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    @NotNull
    public Map<String, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, String> answers) {
        this.answers = answers;
    }
}
