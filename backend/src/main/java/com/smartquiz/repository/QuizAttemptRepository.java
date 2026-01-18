package com.smartquiz.repository;

import com.smartquiz.model.QuizAttempt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    
    Page<QuizAttempt> findByUserIdOrderByStartedAtDesc(String userId, Pageable pageable);
    
    List<QuizAttempt> findByUserIdAndQuizIdOrderByStartedAtDesc(String userId, String quizId);
    
    Optional<QuizAttempt> findByIdAndUserId(String id, String userId);
    
    Optional<QuizAttempt> findByUserIdAndStatusAndQuizId(String userId, QuizAttempt.AttemptStatus status, String quizId);
    
    List<QuizAttempt> findByUserIdAndStatus(String userId, QuizAttempt.AttemptStatus status);
    
    long countByQuizId(String quizId);
    
    long countByUserIdAndStatus(String userId, QuizAttempt.AttemptStatus status);
}
