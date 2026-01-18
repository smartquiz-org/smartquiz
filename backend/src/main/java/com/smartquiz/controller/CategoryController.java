package com.smartquiz.controller;

import com.smartquiz.dto.CategoryDto;
import com.smartquiz.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "API pour g\u00e9rer les cat\u00e9gories de quiz")
@CrossOrigin(origins = "*")
public class CategoryController {
    
    private final CategoryService categoryService;
    
    @GetMapping
    @Operation(summary = "Liste toutes les cat\u00e9gories", description = "R\u00e9cup\u00e8re la liste de toutes les cat\u00e9gories de quiz disponibles")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}
