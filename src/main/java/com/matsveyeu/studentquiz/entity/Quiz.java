package com.matsveyeu.studentquiz.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.Set;

public class Quiz {

    private Long id;

    private String name;

    private Category category;

    private Set<Question> questions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Quiz quiz = (Quiz) o;

        return new EqualsBuilder()
                .append(id, quiz.id)
                .append(name, quiz.name)
                .append(category, quiz.category)
                .append(questions, quiz.questions)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(name)
                .append(category)
                .append(questions)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category=" + category +
                ", questions=" + questions +
                '}';
    }
}
