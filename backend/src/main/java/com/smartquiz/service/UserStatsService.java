package com.smartquiz.service;

import com.smartquiz.model.Quiz;
import com.smartquiz.model.QuizAttempt;
import com.smartquiz.model.UserStats;
import com.smartquiz.repository.UserStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserStatsService {
    
    private final UserStatsRepository userStatsRepository;
    
    public Optional<UserStats> getUserStats(String userId) {
        return userStatsRepository.findByUserId(userId);
    }
    
    public UserStats getOrCreateUserStats(String userId) {
        return userStatsRepository.findByUserId(userId)
            .orElseGet(() -> {
                UserStats stats = UserStats.builder()
                    .userId(userId)
                    .totalQuizzesCompleted(0)
                    .totalQuizzesStarted(0)
                    .totalCorrectAnswers(0)
                    .totalQuestions(0)
                    .totalTimeSpent(0)
                    .averageScore(0)
                    .categoryStats(new HashMap<>())
                    .currentStreak(0)
                    .longestStreak(0)
                    .build();
                return userStatsRepository.save(stats);
            });
    }
    
    public void updateStats(String userId, Quiz quiz, QuizAttempt attempt, int correctAnswers) {
        UserStats stats = getOrCreateUserStats(userId);
        
        stats.setTotalQuizzesCompleted(stats.getTotalQuizzesCompleted() + 1);
        stats.setTotalCorrectAnswers(stats.getTotalCorrectAnswers() + correctAnswers);
        stats.setTotalQuestions(stats.getTotalQuestions() + quiz.getQuestionCount());
        stats.setTotalTimeSpent(stats.getTotalTimeSpent() + attempt.getTimeSpent());
        
        // Update average score
        double totalScore = stats.getAverageScore() * (stats.getTotalQuizzesCompleted() - 1);
        totalScore += attempt.getPercentage();
        stats.setAverageScore(totalScore / stats.getTotalQuizzesCompleted());
        
        // Update category stats
        String categoryId = quiz.getCategoryId();
        UserStats.CategoryStats catStats = stats.getCategoryStats().getOrDefault(
            categoryId,
            UserStats.CategoryStats.builder()
                .categoryId(categoryId)
                .categoryName(quiz.getCategoryName())
                .quizzesCompleted(0)
                .correctAnswers(0)
                .totalQuestions(0)
                .averageScore(0)
                .build()
        );
        
        catStats.setQuizzesCompleted(catStats.getQuizzesCompleted() + 1);
        catStats.setCorrectAnswers(catStats.getCorrectAnswers() + correctAnswers);
        catStats.setTotalQuestions(catStats.getTotalQuestions() + quiz.getQuestionCount());
        
        double catTotalScore = catStats.getAverageScore() * (catStats.getQuizzesCompleted() - 1);
        catTotalScore += attempt.getPercentage();
        catStats.setAverageScore(catTotalScore / catStats.getQuizzesCompleted());
        
        stats.getCategoryStats().put(categoryId, catStats);
        stats.setLastActivityAt(Instant.now());
        
        userStatsRepository.save(stats);
    }
}
