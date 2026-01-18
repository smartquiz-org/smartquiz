package com.smartquiz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAnswerRequest {
    @NotBlank(message = "Question ID is required")
    private String questionId;
    
    @NotNull(message = "Selected answer IDs are required")
    private List<String> selectedAnswerIds;
    
    private int timeSpent; // in seconds
}
