package com.matsveyeu.studentquiz.dto;

import com.matsveyeu.studentquiz.enums.QuestionType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Map;

public class QuestionDto {

    private String text;
    private QuestionType type;
    private Map<String, Boolean> options;

    @NotEmpty
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @NotNull
    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    @NotNull
    @Size(min = 2, max = 10)
    public Map<String, Boolean> getOptions() {
        return options;
    }

    public void setOptions(Map<String, Boolean> options) {
        this.options = options;
    }
}
