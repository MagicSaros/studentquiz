package com.matsveyeu.studentquiz.dto;

import org.springframework.hateoas.ResourceSupport;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Set;

public class QuizDto extends ResourceSupport {

    private String id;
    private String name;
    private CategoryDto category;
    private String authorLogin;
    private Double threshold;
    private LocalDateTime created;

    private Set<QuestionDto> questions;

    public String getQuizId() {
        return id;
    }

    public void setQuizId(String id) {
        this.id = id;
    }

    @NotEmpty
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull
    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }

    @NotEmpty
    public String getAuthorLogin() {
        return authorLogin;
    }

    public void setAuthorLogin(String authorLogin) {
        this.authorLogin = authorLogin;
    }

    @NotNull
    @Size(min = 1)
    public Set<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionDto> questions) {
        this.questions = questions;
    }

    @NotNull
    @Min(0)
    @Max(100)
    public Double getThreshold() {
        return threshold;
    }

    public void setThreshold(Double threshold) {
        this.threshold = threshold;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
}
