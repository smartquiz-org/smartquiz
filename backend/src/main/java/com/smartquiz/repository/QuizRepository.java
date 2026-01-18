package com.smartquiz.repository;

import com.smartquiz.model.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends MongoRepository<Quiz, String> {
    
    Page<Quiz> findByStatus(Quiz.QuizStatus status, Pageable pageable);
    
    Page<Quiz> findByCategoryIdAndStatus(String categoryId, Quiz.QuizStatus status, Pageable pageable);
    
    Page<Quiz> findByDifficultyAndStatus(Quiz.DifficultyLevel difficulty, Quiz.QuizStatus status, Pageable pageable);
    
    Page<Quiz> findByCategoryIdAndDifficultyAndStatus(
        String categoryId, 
        Quiz.DifficultyLevel difficulty, 
        Quiz.QuizStatus status, 
        Pageable pageable
    );
    
    @Query("{ 'status': ?0, '$or': [ { 'title': { $regex: ?1, $options: 'i' } }, { 'description': { $regex: ?1, $options: 'i' } }, { 'tags': { $regex: ?1, $options: 'i' } } ] }")
    Page<Quiz> searchByKeyword(Quiz.QuizStatus status, String keyword, Pageable pageable);
    
    long countByCategoryId(String categoryId);
    
    List<Quiz> findTop5ByStatusOrderByAttemptCountDesc(Quiz.QuizStatus status);
}
