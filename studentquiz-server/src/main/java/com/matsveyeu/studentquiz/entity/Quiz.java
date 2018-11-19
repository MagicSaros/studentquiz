package com.matsveyeu.studentquiz.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.time.LocalDateTime;
import java.util.Set;

public class Quiz {

    private String id;
    private String name;
    private Category category;
    private User author;
    private Double threshold;
    private LocalDateTime created;
    private Set<Question> questions;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Double getThreshold() {
        return threshold;
    }

    public void setThreshold(Double threshold) {
        this.threshold = threshold;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
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
                .append(author, quiz.author)
                .append(threshold, quiz.threshold)
                .append(questions, quiz.questions)
                .append(created, quiz.created)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(id)
                .append(name)
                .append(category)
                .append(author)
                .append(threshold)
                .append(questions)
                .append(created)
                .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("name", name)
                .append("category", category)
                .append("author", author)
                .append("threshold", threshold)
                .append("questions", questions)
                .append("created", created)
                .toString();
    }
}
