package com.smartquiz.dto;

import com.smartquiz.model.Quiz;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizSummaryDto {
    private String id;
    private String title;
    private String description;
    private String categoryId;
    private String categoryName;
    private Quiz.DifficultyLevel difficulty;
    private int questionCount;
    private int timeLimit;
    private String imageUrl;
    private List<String> tags;
    private int attemptCount;
    private double averageScore;
    
    public static QuizSummaryDto fromQuiz(Quiz quiz) {
        return QuizSummaryDto.builder()
            .id(quiz.getId())
            .title(quiz.getTitle())
            .description(quiz.getDescription())
            .categoryId(quiz.getCategoryId())
            .categoryName(quiz.getCategoryName())
            .difficulty(quiz.getDifficulty())
            .questionCount(quiz.getQuestionCount())
            .timeLimit(quiz.getTimeLimit())
            .imageUrl(quiz.getImageUrl())
            .tags(quiz.getTags())
            .attemptCount(quiz.getAttemptCount())
            .averageScore(quiz.getAverageScore())
            .build();
    }
}
