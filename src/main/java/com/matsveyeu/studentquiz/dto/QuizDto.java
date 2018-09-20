package com.matsveyeu.studentquiz.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

public class QuizDto {

    private Long id;

    @NotEmpty
    private String name;

    @NotNull
    private CategoryDto category;

    @NotNull
    @Size(min = 1)
    private Set<QuestionDto> questions;

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

    public @NotNull CategoryDto getCategory() {
        return category;
    }

    public void setCategory(@NotNull CategoryDto category) {
        this.category = category;
    }

    public Set<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionDto> questions) {
        this.questions = questions;
    }
}
