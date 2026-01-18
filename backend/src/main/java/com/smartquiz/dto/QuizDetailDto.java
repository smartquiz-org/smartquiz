package com.smartquiz.dto;

import com.smartquiz.model.Quiz;
import com.smartquiz.model.Question;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizDetailDto {
    private String id;
    private String title;
    private String description;
    private String categoryId;
    private String categoryName;
    private Quiz.DifficultyLevel difficulty;
    private int questionCount;
    private int totalPoints;
    private int timeLimit;
    private int passingScore;
    private String imageUrl;
    private List<String> tags;
    private int attemptCount;
    private double averageScore;
    private List<QuestionPreview> questions;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionPreview {
        private String id;
        private Question.QuestionType type;
        private int points;
    }
    
    public static QuizDetailDto fromQuiz(Quiz quiz) {
        List<QuestionPreview> questionPreviews = quiz.getQuestions() != null ?
            quiz.getQuestions().stream()
                .map(q -> QuestionPreview.builder()
                    .id(q.getId())
                    .type(q.getType())
                    .points(q.getPoints())
                    .build())
                .collect(Collectors.toList()) : null;
        
        return QuizDetailDto.builder()
            .id(quiz.getId())
            .title(quiz.getTitle())
            .description(quiz.getDescription())
            .categoryId(quiz.getCategoryId())
            .categoryName(quiz.getCategoryName())
            .difficulty(quiz.getDifficulty())
            .questionCount(quiz.getQuestionCount())
            .totalPoints(quiz.getTotalPoints())
            .timeLimit(quiz.getTimeLimit())
            .passingScore(quiz.getPassingScore())
            .imageUrl(quiz.getImageUrl())
            .tags(quiz.getTags())
            .attemptCount(quiz.getAttemptCount())
            .averageScore(quiz.getAverageScore())
            .questions(questionPreviews)
            .build();
    }
}
