package com.matsveyeu.studentquiz.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.time.LocalDateTime;
import java.util.Map;

public class Result {

    private String id;
    private Quiz quiz;
    private User user;
    private Double percentage;
    private boolean success;
    private LocalDateTime timestamp;
    private Map<String, String> answers;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
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

    public Map<String, String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, String> answers) {
        this.answers = answers;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Result result = (Result) o;

        return new EqualsBuilder()
                .append(percentage, result.percentage)
                .append(success, result.success)
                .append(id, result.id)
                .append(quiz, result.quiz)
                .append(user, result.user)
                .append(timestamp, result.timestamp)
                .append(answers, result.answers)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(quiz)
                .append(user)
                .append(percentage)
                .append(success)
                .append(timestamp)
                .append(answers)
                .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("quiz", quiz)
                .append("user", user)
                .append("percentage", percentage)
                .append("success", success)
                .append("timestamp", timestamp)
                .append("answers", answers)
                .toString();
    }
}
