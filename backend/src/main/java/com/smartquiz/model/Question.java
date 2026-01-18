package com.smartquiz.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private String id;
    private QuestionType type;
    private String text;
    private String imageUrl;
    private List<Answer> answers;
    private String explanation;
    private int points;
    private int timeLimit; // in seconds, 0 for no limit
    
    public enum QuestionType {
        SINGLE_CHOICE,
        MULTIPLE_CHOICE,
        TRUE_FALSE,
        IMAGE
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Answer {
        private String id;
        private String text;
        private String imageUrl;
        private boolean correct;
    }
}
