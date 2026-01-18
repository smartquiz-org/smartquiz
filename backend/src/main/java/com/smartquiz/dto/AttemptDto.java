package com.smartquiz.dto;

import com.smartquiz.model.QuizAttempt;
import com.smartquiz.model.Question;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttemptDto {
    private String id;
    private String quizId;
    private String quizTitle;
    private QuizAttempt.AttemptMode mode;
    private QuizAttempt.AttemptStatus status;
    private int currentQuestionIndex;
    private int totalQuestions;
    private int score;
    private int totalPoints;
    private double percentage;
    private boolean passed;
    private int timeSpent;
    private int timeLimit;
    private Instant startedAt;
    private Instant completedAt;
    private List<QuestionDto> questions; // Only for in-progress attempts
    private List<AnswerResultDto> results; // Only for completed attempts
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionDto {
        private String id;
        private Question.QuestionType type;
        private String text;
        private String imageUrl;
        private List<AnswerOptionDto> answers;
        private int points;
        private int timeLimit;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnswerOptionDto {
        private String id;
        private String text;
        private String imageUrl;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AnswerResultDto {
        private String questionId;
        private String questionText;
        private List<String> selectedAnswerIds;
        private List<String> correctAnswerIds;
        private boolean correct;
        private int pointsEarned;
        private String explanation;
    }
}
