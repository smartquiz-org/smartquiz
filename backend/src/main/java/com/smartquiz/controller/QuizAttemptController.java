package com.smartquiz.controller;

import com.smartquiz.dto.AttemptDto;
import com.smartquiz.dto.StartAttemptRequest;
import com.smartquiz.dto.SubmitAnswerRequest;
import com.smartquiz.service.QuizAttemptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/attempts")
@RequiredArgsConstructor
@Tag(name = "Quiz Attempts", description = "API pour g\u00e9rer les tentatives de quiz")
@CrossOrigin(origins = "*")
public class QuizAttemptController {
    
    private final QuizAttemptService attemptService;
    
    // Note: In production, userId would come from security context
    private static final String DEFAULT_USER_ID = "anonymous-user";
    
    @PostMapping
    @Operation(summary = "D\u00e9marrer une session", description = "D\u00e9marre une nouvelle tentative de quiz")
    public ResponseEntity<AttemptDto> startAttempt(
            @Valid @RequestBody StartAttemptRequest request,
            @Parameter(description = "ID utilisateur (optionnel)") @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return ResponseEntity.ok(attemptService.startAttempt(request, userId));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "R\u00e9cup\u00e9rer une tentative", description = "R\u00e9cup\u00e8re les d\u00e9tails d'une tentative (pour reprendre)")
    public ResponseEntity<AttemptDto> getAttempt(
            @Parameter(description = "ID de la tentative") @PathVariable String id,
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return ResponseEntity.ok(attemptService.getAttempt(id, userId));
    }
    
    @PostMapping("/{id}/answers")
    @Operation(summary = "R\u00e9pondre \u00e0 une question", description = "Soumet une r\u00e9ponse pour une question")
    public ResponseEntity<AttemptDto> submitAnswer(
            @Parameter(description = "ID de la tentative") @PathVariable String id,
            @Valid @RequestBody SubmitAnswerRequest request,
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return ResponseEntity.ok(attemptService.submitAnswer(id, request, userId));
    }
    
    @PostMapping("/{id}/submit")
    @Operation(summary = "Terminer le quiz", description = "Termine la tentative et calcule le score final")
    public ResponseEntity<AttemptDto> submitQuiz(
            @Parameter(description = "ID de la tentative") @PathVariable String id,
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return ResponseEntity.ok(attemptService.submitQuiz(id, userId));
    }
    
    @PatchMapping("/{id}/progress")
    @Operation(summary = "Sauvegarder la progression", description = "Sauvegarde le temps \u00e9coul\u00e9 pour une tentative")
    public ResponseEntity<Void> saveProgress(
            @Parameter(description = "ID de la tentative") @PathVariable String id,
            @RequestBody Map<String, Integer> body,
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        attemptService.saveProgress(id, body.getOrDefault("timeSpent", 0), userId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/history")
    @Operation(summary = "Historique des tentatives", description = "R\u00e9cup\u00e8re l'historique des tentatives de l'utilisateur")
    public ResponseEntity<Page<AttemptDto>> getUserHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return ResponseEntity.ok(attemptService.getUserHistory(userId, page, size));
    }
}
