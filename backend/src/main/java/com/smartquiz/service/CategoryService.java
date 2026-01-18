package com.smartquiz.service;

import com.smartquiz.dto.CategoryDto;
import com.smartquiz.model.Category;
import com.smartquiz.repository.CategoryRepository;
import com.smartquiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final QuizRepository quizRepository;
    
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAllByOrderByNameAsc().stream()
            .map(CategoryDto::fromCategory)
            .collect(Collectors.toList());
    }
    
    public void updateQuizCount(String categoryId) {
        categoryRepository.findById(categoryId).ifPresent(category -> {
            category.setQuizCount((int) quizRepository.countByCategoryId(categoryId));
            categoryRepository.save(category);
        });
    }
    
    @PostConstruct
    public void initializeDefaultCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> defaultCategories = List.of(
                Category.builder()
                    .id("cat-programming")
                    .name("Programmation")
                    .description("Quiz sur les langages de programmation et le d\u00e9veloppement")
                    .icon("\ud83d\udcbb")
                    .color("#3b82f6")
                    .quizCount(0)
                    .build(),
                Category.builder()
                    .id("cat-web")
                    .name("D\u00e9veloppement Web")
                    .description("HTML, CSS, JavaScript et frameworks web")
                    .icon("\ud83c\udf10")
                    .color("#10b981")
                    .quizCount(0)
                    .build(),
                Category.builder()
                    .id("cat-database")
                    .name("Bases de donn\u00e9es")
                    .description("SQL, NoSQL et conception de bases de donn\u00e9es")
                    .icon("\ud83d\uddc4\ufe0f")
                    .color("#f59e0b")
                    .quizCount(0)
                    .build(),
                Category.builder()
                    .id("cat-devops")
                    .name("DevOps")
                    .description("CI/CD, conteneurisation et cloud")
                    .icon("\u2699\ufe0f")
                    .color("#8b5cf6")
                    .quizCount(0)
                    .build(),
                Category.builder()
                    .id("cat-security")
                    .name("S\u00e9curit\u00e9")
                    .description("Cybersecurit\u00e9 et bonnes pratiques")
                    .icon("\ud83d\udd12")
                    .color("#ef4444")
                    .quizCount(0)
                    .build(),
                Category.builder()
                    .id("cat-general")
                    .name("Culture G\u00e9n\u00e9rale")
                    .description("Questions diverses sur l'informatique")
                    .icon("\ud83d\udca1")
                    .color("#06b6d4")
                    .quizCount(0)
                    .build()
            );
            categoryRepository.saveAll(defaultCategories);
        }
    }
}
