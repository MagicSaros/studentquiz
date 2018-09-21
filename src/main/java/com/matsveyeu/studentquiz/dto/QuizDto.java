package com.matsveyeu.studentquiz.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

public class QuizDto {

    private String id;
    private String name;
    private CategoryDto category;

    private Set<QuestionDto> questions;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public void setCategory(@NotNull CategoryDto category) {
        this.category = category;
    }

    @NotNull
    @Size(min = 1)
    public Set<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionDto> questions) {
        this.questions = questions;
    }
}
