package com.matsveyeu.studentquiz.entity;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.Map;

public class Question {

    private String text;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Question question = (Question) o;

        return new EqualsBuilder()
                .append(text, question.text)
                .append(options, question.options)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(text)
                .append(options)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Question{" +
                ", text='" + text + '\'' +
                ", options=" + options +
                '}';
    }
}
