package com.smartquiz.service;

import com.smartquiz.dto.AttemptDto;
import com.smartquiz.dto.StartAttemptRequest;
import com.smartquiz.dto.SubmitAnswerRequest;
import com.smartquiz.model.Question;
import com.smartquiz.model.Quiz;
import com.smartquiz.model.QuizAttempt;
import com.smartquiz.repository.QuizAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizAttemptService {
    
    private final QuizAttemptRepository attemptRepository;
    private final QuizService quizService;
    private final UserStatsService userStatsService;
    
    public AttemptDto startAttempt(StartAttemptRequest request, String userId) {
        Quiz quiz = quizService.getFullQuizById(request.getQuizId())
            .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        
        // Check if there's already an in-progress attempt
        Optional<QuizAttempt> existingAttempt = attemptRepository
            .findByUserIdAndStatusAndQuizId(userId, QuizAttempt.AttemptStatus.IN_PROGRESS, request.getQuizId());
        
        if (existingAttempt.isPresent()) {
            return toAttemptDto(existingAttempt.get(), quiz);
        }
        
        QuizAttempt attempt = QuizAttempt.builder()
            .quizId(quiz.getId())
            .quizTitle(quiz.getTitle())
            .userId(userId)
            .mode(request.getMode())
            .status(QuizAttempt.AttemptStatus.IN_PROGRESS)
            .answers(new ArrayList<>())
            .currentQuestionIndex(0)
            .score(0)
            .totalPoints(quiz.getTotalPoints())
            .percentage(0)
            .passed(false)
            .timeSpent(0)
            .timeLimit(quiz.getTimeLimit() * 60) // Convert minutes to seconds
            .startedAt(Instant.now())
            .build();
        
        attempt = attemptRepository.save(attempt);
        quizService.incrementAttemptCount(quiz.getId());
        
        return toAttemptDto(attempt, quiz);
    }
    
    public AttemptDto getAttempt(String attemptId, String userId) {
        QuizAttempt attempt = attemptRepository.findByIdAndUserId(attemptId, userId)
            .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        
        Quiz quiz = quizService.getFullQuizById(attempt.getQuizId())
            .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        
        // Return with results if completed, otherwise without
        if (attempt.getStatus() == QuizAttempt.AttemptStatus.COMPLETED) {
            return toAttemptDtoWithResults(attempt, quiz);
        }
        return toAttemptDto(attempt, quiz);
    }
    
    public AttemptDto submitAnswer(String attemptId, SubmitAnswerRequest request, String userId) {
        QuizAttempt attempt = attemptRepository.findByIdAndUserId(attemptId, userId)
            .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        
        if (attempt.getStatus() != QuizAttempt.AttemptStatus.IN_PROGRESS) {
            throw new IllegalStateException("Cannot submit answer for completed attempt");
        }
        
        Quiz quiz = quizService.getFullQuizById(attempt.getQuizId())
            .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        
        Question question = quiz.getQuestions().stream()
            .filter(q -> q.getId().equals(request.getQuestionId()))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Question not found"));
        
        // Check if already answered
        boolean alreadyAnswered = attempt.getAnswers().stream()
            .anyMatch(a -> a.getQuestionId().equals(request.getQuestionId()));
        
        if (alreadyAnswered) {
            throw new IllegalStateException("Question already answered");
        }
        
        // Calculate if correct
        List<String> correctIds = question.getAnswers().stream()
            .filter(Question.Answer::isCorrect)
            .map(Question.Answer::getId)
            .toList();
        
        boolean isCorrect = request.getSelectedAnswerIds().size() == correctIds.size() &&
            request.getSelectedAnswerIds().containsAll(correctIds);
        
        int pointsEarned = isCorrect ? question.getPoints() : 0;
        
        QuizAttempt.QuestionAnswer answer = QuizAttempt.QuestionAnswer.builder()
            .questionId(request.getQuestionId())
            .selectedAnswerIds(request.getSelectedAnswerIds())
            .correct(isCorrect)
            .pointsEarned(pointsEarned)
            .timeSpent(request.getTimeSpent())
            .answeredAt(Instant.now())
            .build();
        
        attempt.getAnswers().add(answer);
        attempt.setScore(attempt.getScore() + pointsEarned);
        attempt.setTimeSpent(attempt.getTimeSpent() + request.getTimeSpent());
        attempt.setCurrentQuestionIndex(attempt.getAnswers().size());
        
        attemptRepository.save(attempt);
        
        AttemptDto dto = toAttemptDto(attempt, quiz);
        
        // For training mode, include feedback for the answered question
        if (attempt.getMode() == QuizAttempt.AttemptMode.TRAINING) {
            AttemptDto.AnswerResultDto feedback = AttemptDto.AnswerResultDto.builder()
                .questionId(question.getId())
                .questionText(question.getText())
                .selectedAnswerIds(request.getSelectedAnswerIds())
                .correctAnswerIds(correctIds)
                .correct(isCorrect)
                .pointsEarned(pointsEarned)
                .explanation(question.getExplanation())
                .build();
            dto.setResults(List.of(feedback));
        }
        
        return dto;
    }
    
    public AttemptDto submitQuiz(String attemptId, String userId) {
        QuizAttempt attempt = attemptRepository.findByIdAndUserId(attemptId, userId)
            .orElseThrow(() -> new IllegalArgumentException("Attempt not found"));
        
        if (attempt.getStatus() != QuizAttempt.AttemptStatus.IN_PROGRESS) {
            throw new IllegalStateException("Attempt already completed");
        }
        
        Quiz quiz = quizService.getFullQuizById(attempt.getQuizId())
            .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        
        // Calculate final score
        double percentage = attempt.getTotalPoints() > 0 
            ? (attempt.getScore() * 100.0) / attempt.getTotalPoints() 
            : 0;
        
        attempt.setPercentage(Math.round(percentage * 100.0) / 100.0);
        attempt.setPassed(percentage >= quiz.getPassingScore());
        attempt.setStatus(QuizAttempt.AttemptStatus.COMPLETED);
        attempt.setCompletedAt(Instant.now());
        
        attemptRepository.save(attempt);
        
        // Update quiz stats
        quizService.updateAverageScore(quiz.getId(), percentage);
        
        // Update user stats
        int correctAnswers = (int) attempt.getAnswers().stream().filter(QuizAttempt.QuestionAnswer::isCorrect).count();
        userStatsService.updateStats(userId, quiz, attempt, correctAnswers);
        
        return toAttemptDtoWithResults(attempt, quiz);
    }
    
    public Page<AttemptDto> getUserHistory(String userId, int page, int size) {
        Page<QuizAttempt> attempts = attemptRepository.findByUserIdOrderByStartedAtDesc(
            userId, PageRequest.of(page, size));
        
        return attempts.map(attempt -> {
            Quiz quiz = quizService.getFullQuizById(attempt.getQuizId()).orElse(null);
            return toAttemptDtoSummary(attempt);
        });
    }
    
    public void saveProgress(String attemptId, int timeSpent, String userId) {
        attemptRepository.findByIdAndUserId(attemptId, userId).ifPresent(attempt -> {
            if (attempt.getStatus() == QuizAttempt.AttemptStatus.IN_PROGRESS) {
                attempt.setTimeSpent(timeSpent);
                attemptRepository.save(attempt);
            }
        });
    }
    
    private AttemptDto toAttemptDto(QuizAttempt attempt, Quiz quiz) {
        List<AttemptDto.QuestionDto> questions = quiz.getQuestions().stream()
            .map(q -> AttemptDto.QuestionDto.builder()
                .id(q.getId())
                .type(q.getType())
                .text(q.getText())
                .imageUrl(q.getImageUrl())
                .answers(q.getAnswers().stream()
                    .map(a -> AttemptDto.AnswerOptionDto.builder()
                        .id(a.getId())
                        .text(a.getText())
                        .imageUrl(a.getImageUrl())
                        .build())
                    .collect(Collectors.toList()))
                .points(q.getPoints())
                .timeLimit(q.getTimeLimit())
                .build())
            .collect(Collectors.toList());
        
        return AttemptDto.builder()
            .id(attempt.getId())
            .quizId(attempt.getQuizId())
            .quizTitle(attempt.getQuizTitle())
            .mode(attempt.getMode())
            .status(attempt.getStatus())
            .currentQuestionIndex(attempt.getCurrentQuestionIndex())
            .totalQuestions(quiz.getQuestionCount())
            .score(attempt.getScore())
            .totalPoints(attempt.getTotalPoints())
            .percentage(attempt.getPercentage())
            .passed(attempt.isPassed())
            .timeSpent(attempt.getTimeSpent())
            .timeLimit(attempt.getTimeLimit())
            .startedAt(attempt.getStartedAt())
            .completedAt(attempt.getCompletedAt())
            .questions(questions)
            .build();
    }
    
    private AttemptDto toAttemptDtoWithResults(QuizAttempt attempt, Quiz quiz) {
        List<AttemptDto.AnswerResultDto> results = quiz.getQuestions().stream()
            .map(q -> {
                QuizAttempt.QuestionAnswer userAnswer = attempt.getAnswers().stream()
                    .filter(a -> a.getQuestionId().equals(q.getId()))
                    .findFirst()
                    .orElse(null);
                
                List<String> correctIds = q.getAnswers().stream()
                    .filter(Question.Answer::isCorrect)
                    .map(Question.Answer::getId)
                    .toList();
                
                return AttemptDto.AnswerResultDto.builder()
                    .questionId(q.getId())
                    .questionText(q.getText())
                    .selectedAnswerIds(userAnswer != null ? userAnswer.getSelectedAnswerIds() : List.of())
                    .correctAnswerIds(correctIds)
                    .correct(userAnswer != null && userAnswer.isCorrect())
                    .pointsEarned(userAnswer != null ? userAnswer.getPointsEarned() : 0)
                    .explanation(q.getExplanation())
                    .build();
            })
            .collect(Collectors.toList());
        
        return AttemptDto.builder()
            .id(attempt.getId())
            .quizId(attempt.getQuizId())
            .quizTitle(attempt.getQuizTitle())
            .mode(attempt.getMode())
            .status(attempt.getStatus())
            .currentQuestionIndex(attempt.getCurrentQuestionIndex())
            .totalQuestions(quiz.getQuestionCount())
            .score(attempt.getScore())
            .totalPoints(attempt.getTotalPoints())
            .percentage(attempt.getPercentage())
            .passed(attempt.isPassed())
            .timeSpent(attempt.getTimeSpent())
            .timeLimit(attempt.getTimeLimit())
            .startedAt(attempt.getStartedAt())
            .completedAt(attempt.getCompletedAt())
            .results(results)
            .build();
    }
    
    private AttemptDto toAttemptDtoSummary(QuizAttempt attempt) {
        return AttemptDto.builder()
            .id(attempt.getId())
            .quizId(attempt.getQuizId())
            .quizTitle(attempt.getQuizTitle())
            .mode(attempt.getMode())
            .status(attempt.getStatus())
            .score(attempt.getScore())
            .totalPoints(attempt.getTotalPoints())
            .percentage(attempt.getPercentage())
            .passed(attempt.isPassed())
            .timeSpent(attempt.getTimeSpent())
            .startedAt(attempt.getStartedAt())
            .completedAt(attempt.getCompletedAt())
            .build();
    }
}
