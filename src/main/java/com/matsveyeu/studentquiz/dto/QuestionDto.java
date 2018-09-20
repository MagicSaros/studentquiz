package com.matsveyeu.studentquiz.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Map;

public class QuestionDto {

    @NotEmpty
    private String text;

    @NotNull
    @Size(min = 2, max = 10)
    private Map<String, Boolean> options;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Map<String, Boolean> getOptions() {
        return options;
    }

    public void setOptions(Map<String, Boolean> options) {
        this.options = options;
    }
}
