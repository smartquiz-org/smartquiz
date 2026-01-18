package com.smartquiz.controller;

import com.smartquiz.dto.QuizDetailDto;
import com.smartquiz.dto.QuizSummaryDto;
import com.smartquiz.model.Quiz;
import com.smartquiz.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
@Tag(name = "Quizzes", description = "API pour g\u00e9rer les quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    
    private final QuizService quizService;
    
    @GetMapping
    @Operation(summary = "Liste les quiz", description = "R\u00e9cup\u00e8re la liste des quiz avec pagination et filtres")
    public ResponseEntity<Page<QuizSummaryDto>> getQuizzes(
            @Parameter(description = "ID de la cat\u00e9gorie") @RequestParam(required = false) String categoryId,
            @Parameter(description = "Niveau de difficult\u00e9") @RequestParam(required = false) Quiz.DifficultyLevel difficulty,
            @Parameter(description = "Terme de recherche") @RequestParam(required = false) String search,
            @Parameter(description = "Num\u00e9ro de page (0-index\u00e9)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Taille de la page") @RequestParam(defaultValue = "12") int size,
            @Parameter(description = "Champ de tri") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Direction du tri") @RequestParam(defaultValue = "desc") String sortDir) {
        
        return ResponseEntity.ok(quizService.getQuizzes(categoryId, difficulty, search, page, size, sortBy, sortDir));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "D\u00e9tails d'un quiz", description = "R\u00e9cup\u00e8re les d\u00e9tails complets d'un quiz")
    public ResponseEntity<QuizDetailDto> getQuizById(
            @Parameter(description = "ID du quiz") @PathVariable String id) {
        
        return quizService.getQuizById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/popular")
    @Operation(summary = "Quiz populaires", description = "R\u00e9cup\u00e8re les 5 quiz les plus populaires")
    public ResponseEntity<List<QuizSummaryDto>> getPopularQuizzes() {
        return ResponseEntity.ok(quizService.getPopularQuizzes());
    }
}
