package com.matsveyeu.studentquiz.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

public class Result {

    private String id;
    private Quiz quiz;
    private User user;
    private double percentage;

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

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Result result1 = (Result) o;

        return new EqualsBuilder()
                .append(percentage, result1.percentage)
                .append(id, result1.id)
                .append(quiz, result1.quiz)
                .append(user, result1.user)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(quiz)
                .append(user)
                .append(percentage)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Result{" +
                "id='" + id + '\'' +
                ", quiz=" + quiz +
                ", user=" + user +
                ", percentage=" + percentage +
                '}';
    }
}
