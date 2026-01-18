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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quizzes")
public class Quiz {
    @Id
    private String id;
    
    private String title;
    private String description;
    
    @Indexed
    private String categoryId;
    private String categoryName;
    
    private DifficultyLevel difficulty;
    private QuizStatus status;
    
    private List<Question> questions;
    
    private int timeLimit; // total time in minutes, 0 for no limit
    private int passingScore; // percentage needed to pass
    
    private String imageUrl;
    private List<String> tags;
    
    private int attemptCount;
    private double averageScore;
    
    @CreatedDate
    private Instant createdAt;
    
    @LastModifiedDate
    private Instant updatedAt;
    
    public enum DifficultyLevel {
        EASY, MEDIUM, HARD
    }
    
    public enum QuizStatus {
        DRAFT, PUBLISHED, ARCHIVED
    }
    
    public int getQuestionCount() {
        return questions != null ? questions.size() : 0;
    }
    
    public int getTotalPoints() {
        return questions != null ? 
            questions.stream().mapToInt(Question::getPoints).sum() : 0;
    }
}
