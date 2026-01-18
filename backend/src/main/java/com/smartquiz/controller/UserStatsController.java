package com.smartquiz.controller;

import com.smartquiz.model.UserStats;
import com.smartquiz.service.UserStatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
@Tag(name = "User Stats", description = "API pour les statistiques utilisateur")
@CrossOrigin(origins = "*")
public class UserStatsController {
    
    private final UserStatsService userStatsService;
    
    private static final String DEFAULT_USER_ID = "anonymous-user";
    
    @GetMapping("/dashboard")
    @Operation(summary = "Dashboard overview", description = "R\u00e9cup\u00e8re les statistiques g\u00e9n\u00e9rales de l'utilisateur")
    public ResponseEntity<UserStats> getDashboard(
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return ResponseEntity.ok(userStatsService.getOrCreateUserStats(userId));
    }
    
    @GetMapping("/categories")
    @Operation(summary = "Stats par cat\u00e9gorie", description = "R\u00e9cup\u00e8re les statistiques par cat\u00e9gorie")
    public ResponseEntity<?> getCategoryStats(
            @RequestHeader(value = "X-User-Id", defaultValue = DEFAULT_USER_ID) String userId) {
        
        return userStatsService.getUserStats(userId)
            .map(stats -> ResponseEntity.ok(stats.getCategoryStats()))
            .orElse(ResponseEntity.ok(java.util.Collections.emptyMap()));
    }
}
