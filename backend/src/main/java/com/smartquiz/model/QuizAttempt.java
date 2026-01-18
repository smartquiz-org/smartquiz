package com.smartquiz.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.Instant;
import java.util.List;
import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quiz_attempts")
public class QuizAttempt {
    @Id
    private String id;
    
    @Indexed
    private String quizId;
    private String quizTitle;
    
    @Indexed
    private String userId;
    
    private AttemptMode mode;
    private AttemptStatus status;
    
    @Builder.Default
    private List<QuestionAnswer> answers = new ArrayList<>();
    
    private int currentQuestionIndex;
    
    private int score;
    private int totalPoints;
    private double percentage;
    private boolean passed;
    
    private int timeSpent; // in seconds
    private int timeLimit; // in seconds
    
    @CreatedDate
    private Instant startedAt;
    
    private Instant completedAt;
    
    @LastModifiedDate
    private Instant updatedAt;
    
    public enum AttemptMode {
        TRAINING,  // Shows feedback after each question
        EXAM       // Shows results only at the end
    }
    
    public enum AttemptStatus {
        IN_PROGRESS,
        COMPLETED,
        ABANDONED
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionAnswer {
        private String questionId;
        private List<String> selectedAnswerIds;
        private boolean correct;
        private int pointsEarned;
        private int timeSpent; // in seconds
        private Instant answeredAt;
    }
}
