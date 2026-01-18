package com.smartquiz.dto;

import com.smartquiz.model.Category;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private String id;
    private String name;
    private String description;
    private String icon;
    private String color;
    private int quizCount;
    
    public static CategoryDto fromCategory(Category category) {
        return CategoryDto.builder()
            .id(category.getId())
            .name(category.getName())
            .description(category.getDescription())
            .icon(category.getIcon())
            .color(category.getColor())
            .quizCount(category.getQuizCount())
            .build();
    }
}
