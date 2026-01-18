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
import java.util.Map;
import java.util.HashMap;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user_stats")
public class UserStats {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String userId;
    
    private int totalQuizzesCompleted;
    private int totalQuizzesStarted;
    private int totalCorrectAnswers;
    private int totalQuestions;
    private int totalTimeSpent; // in seconds
    private double averageScore;
    
    @Builder.Default
    private Map<String, CategoryStats> categoryStats = new HashMap<>();
    
    private int currentStreak;
    private int longestStreak;
    private Instant lastActivityAt;
    
    @CreatedDate
    private Instant createdAt;
    
    @LastModifiedDate
    private Instant updatedAt;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryStats {
        private String categoryId;
        private String categoryName;
        private int quizzesCompleted;
        private int correctAnswers;
        private int totalQuestions;
        private double averageScore;
    }
}
