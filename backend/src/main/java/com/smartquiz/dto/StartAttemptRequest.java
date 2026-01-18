package com.smartquiz.dto;

import com.smartquiz.model.QuizAttempt;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartAttemptRequest {
    @NotBlank(message = "Quiz ID is required")
    private String quizId;
    
    @NotNull(message = "Mode is required")
    private QuizAttempt.AttemptMode mode;
}
