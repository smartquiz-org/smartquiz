package com.smartquiz.service;

import com.smartquiz.dto.QuizDetailDto;
import com.smartquiz.dto.QuizSummaryDto;
import com.smartquiz.model.Quiz;
import com.smartquiz.model.Question;
import com.smartquiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizService {
    
    private final QuizRepository quizRepository;
    private final CategoryService categoryService;
    
    public Page<QuizSummaryDto> getQuizzes(
            String categoryId,
            Quiz.DifficultyLevel difficulty,
            String search,
            int page,
            int size,
            String sortBy,
            String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Quiz> quizPage;
        
        if (search != null && !search.isBlank()) {
            quizPage = quizRepository.searchByKeyword(Quiz.QuizStatus.PUBLISHED, search, pageable);
        } else if (categoryId != null && difficulty != null) {
            quizPage = quizRepository.findByCategoryIdAndDifficultyAndStatus(categoryId, difficulty, Quiz.QuizStatus.PUBLISHED, pageable);
        } else if (categoryId != null) {
            quizPage = quizRepository.findByCategoryIdAndStatus(categoryId, Quiz.QuizStatus.PUBLISHED, pageable);
        } else if (difficulty != null) {
            quizPage = quizRepository.findByDifficultyAndStatus(difficulty, Quiz.QuizStatus.PUBLISHED, pageable);
        } else {
            quizPage = quizRepository.findByStatus(Quiz.QuizStatus.PUBLISHED, pageable);
        }
        
        return quizPage.map(QuizSummaryDto::fromQuiz);
    }
    
    public Optional<QuizDetailDto> getQuizById(String id) {
        return quizRepository.findById(id)
            .filter(q -> q.getStatus() == Quiz.QuizStatus.PUBLISHED)
            .map(QuizDetailDto::fromQuiz);
    }
    
    public Optional<Quiz> getFullQuizById(String id) {
        return quizRepository.findById(id);
    }
    
    public List<QuizSummaryDto> getPopularQuizzes() {
        return quizRepository.findTop5ByStatusOrderByAttemptCountDesc(Quiz.QuizStatus.PUBLISHED)
            .stream()
            .map(QuizSummaryDto::fromQuiz)
            .toList();
    }
    
    public void incrementAttemptCount(String quizId) {
        quizRepository.findById(quizId).ifPresent(quiz -> {
            quiz.setAttemptCount(quiz.getAttemptCount() + 1);
            quizRepository.save(quiz);
        });
    }
    
    public void updateAverageScore(String quizId, double newScore) {
        quizRepository.findById(quizId).ifPresent(quiz -> {
            double currentAvg = quiz.getAverageScore();
            int count = quiz.getAttemptCount();
            double newAvg = ((currentAvg * (count - 1)) + newScore) / count;
            quiz.setAverageScore(Math.round(newAvg * 100.0) / 100.0);
            quizRepository.save(quiz);
        });
    }
    
    @PostConstruct
    public void initializeSampleQuizzes() {
        if (quizRepository.count() == 0) {
            Quiz jsQuiz = Quiz.builder()
                .id("quiz-js-basics")
                .title("JavaScript Fondamentaux")
                .description("Testez vos connaissances sur les bases de JavaScript : variables, fonctions, objets et plus encore.")
                .categoryId("cat-programming")
                .categoryName("Programmation")
                .difficulty(Quiz.DifficultyLevel.EASY)
                .status(Quiz.QuizStatus.PUBLISHED)
                .timeLimit(15)
                .passingScore(70)
                .imageUrl("https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400")
                .tags(List.of("javascript", "web", "d\u00e9butant"))
                .attemptCount(0)
                .averageScore(0)
                .questions(List.of(
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Quelle est la bonne fa\u00e7on de d\u00e9clarer une variable en JavaScript moderne ?")
                        .points(10)
                        .timeLimit(30)
                        .answers(List.of(
                            Question.Answer.builder().id("a1").text("var x = 5;").correct(false).build(),
                            Question.Answer.builder().id("a2").text("let x = 5;").correct(true).build(),
                            Question.Answer.builder().id("a3").text("variable x = 5;").correct(false).build(),
                            Question.Answer.builder().id("a4").text("int x = 5;").correct(false).build()
                        ))
                        .explanation("'let' est la fa\u00e7on moderne de d\u00e9clarer une variable en JavaScript (ES6+).")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Quel op\u00e9rateur v\u00e9rifie l'\u00e9galit\u00e9 stricte en JavaScript ?")
                        .points(10)
                        .timeLimit(30)
                        .answers(List.of(
                            Question.Answer.builder().id("b1").text("==").correct(false).build(),
                            Question.Answer.builder().id("b2").text("===").correct(true).build(),
                            Question.Answer.builder().id("b3").text("=").correct(false).build(),
                            Question.Answer.builder().id("b4").text("!=").correct(false).build()
                        ))
                        .explanation("'===' compare la valeur ET le type, contrairement \u00e0 '==' qui ne compare que la valeur.")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.TRUE_FALSE)
                        .text("JavaScript est un langage typ\u00e9 statiquement.")
                        .points(10)
                        .timeLimit(20)
                        .answers(List.of(
                            Question.Answer.builder().id("c1").text("Vrai").correct(false).build(),
                            Question.Answer.builder().id("c2").text("Faux").correct(true).build()
                        ))
                        .explanation("JavaScript est un langage typ\u00e9 dynamiquement, les types sont d\u00e9termin\u00e9s \u00e0 l'ex\u00e9cution.")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Comment acc\u00e9der au premier \u00e9l\u00e9ment d'un tableau ?")
                        .points(10)
                        .timeLimit(30)
                        .answers(List.of(
                            Question.Answer.builder().id("d1").text("array[0]").correct(true).build(),
                            Question.Answer.builder().id("d2").text("array[1]").correct(false).build(),
                            Question.Answer.builder().id("d3").text("array.first()").correct(false).build(),
                            Question.Answer.builder().id("d4").text("array.get(0)").correct(false).build()
                        ))
                        .explanation("Les tableaux en JavaScript sont index\u00e9s \u00e0 partir de 0.")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Quelle m\u00e9thode permet d'ajouter un \u00e9l\u00e9ment \u00e0 la fin d'un tableau ?")
                        .points(10)
                        .timeLimit(30)
                        .answers(List.of(
                            Question.Answer.builder().id("e1").text("push()").correct(true).build(),
                            Question.Answer.builder().id("e2").text("pop()").correct(false).build(),
                            Question.Answer.builder().id("e3").text("shift()").correct(false).build(),
                            Question.Answer.builder().id("e4").text("unshift()").correct(false).build()
                        ))
                        .explanation("push() ajoute \u00e0 la fin, unshift() au d\u00e9but. pop() retire de la fin, shift() du d\u00e9but.")
                        .build()
                ))
                .build();
            
            Quiz htmlQuiz = Quiz.builder()
                .id("quiz-html-css")
                .title("HTML & CSS Essentiels")
                .description("Ma\u00eetrisez les fondamentaux du d\u00e9veloppement web avec HTML et CSS.")
                .categoryId("cat-web")
                .categoryName("D\u00e9veloppement Web")
                .difficulty(Quiz.DifficultyLevel.EASY)
                .status(Quiz.QuizStatus.PUBLISHED)
                .timeLimit(10)
                .passingScore(60)
                .imageUrl("https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400")
                .tags(List.of("html", "css", "web", "frontend"))
                .attemptCount(0)
                .averageScore(0)
                .questions(List.of(
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Quelle balise HTML est utilis\u00e9e pour le plus grand titre ?")
                        .points(10)
                        .timeLimit(30)
                        .answers(List.of(
                            Question.Answer.builder().id("f1").text("<h6>").correct(false).build(),
                            Question.Answer.builder().id("f2").text("<h1>").correct(true).build(),
                            Question.Answer.builder().id("f3").text("<header>").correct(false).build(),
                            Question.Answer.builder().id("f4").text("<title>").correct(false).build()
                        ))
                        .explanation("<h1> est le titre de niveau 1, le plus important. <h6> est le plus petit.")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Quelle propri\u00e9t\u00e9 CSS change la couleur du texte ?")
                        .points(10)
                        .timeLimit(30)
                        .answers(List.of(
                            Question.Answer.builder().id("g1").text("text-color").correct(false).build(),
                            Question.Answer.builder().id("g2").text("font-color").correct(false).build(),
                            Question.Answer.builder().id("g3").text("color").correct(true).build(),
                            Question.Answer.builder().id("g4").text("background-color").correct(false).build()
                        ))
                        .explanation("La propri\u00e9t\u00e9 'color' d\u00e9finit la couleur du texte en CSS.")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.TRUE_FALSE)
                        .text("Flexbox est utilis\u00e9 pour cr\u00e9er des mises en page unidimensionnelles.")
                        .points(10)
                        .timeLimit(20)
                        .answers(List.of(
                            Question.Answer.builder().id("h1").text("Vrai").correct(true).build(),
                            Question.Answer.builder().id("h2").text("Faux").correct(false).build()
                        ))
                        .explanation("Flexbox g\u00e8re une dimension (ligne ou colonne), Grid g\u00e8re deux dimensions.")
                        .build()
                ))
                .build();
            
            Quiz sqlQuiz = Quiz.builder()
                .id("quiz-sql-advanced")
                .title("SQL Avanc\u00e9")
                .description("Testez vos comp\u00e9tences avanc\u00e9es en SQL : jointures, sous-requ\u00eates, optimisation.")
                .categoryId("cat-database")
                .categoryName("Bases de donn\u00e9es")
                .difficulty(Quiz.DifficultyLevel.HARD)
                .status(Quiz.QuizStatus.PUBLISHED)
                .timeLimit(20)
                .passingScore(80)
                .imageUrl("https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400")
                .tags(List.of("sql", "database", "avanc\u00e9"))
                .attemptCount(0)
                .averageScore(0)
                .questions(List.of(
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.SINGLE_CHOICE)
                        .text("Quelle jointure retourne toutes les lignes des deux tables ?")
                        .points(15)
                        .timeLimit(45)
                        .answers(List.of(
                            Question.Answer.builder().id("i1").text("INNER JOIN").correct(false).build(),
                            Question.Answer.builder().id("i2").text("LEFT JOIN").correct(false).build(),
                            Question.Answer.builder().id("i3").text("FULL OUTER JOIN").correct(true).build(),
                            Question.Answer.builder().id("i4").text("CROSS JOIN").correct(false).build()
                        ))
                        .explanation("FULL OUTER JOIN retourne toutes les lignes quand il y a une correspondance dans l'une ou l'autre table.")
                        .build(),
                    Question.builder()
                        .id(UUID.randomUUID().toString())
                        .type(Question.QuestionType.MULTIPLE_CHOICE)
                        .text("Quelles clauses peuvent \u00eatre utilis\u00e9es avec GROUP BY ?")
                        .points(20)
                        .timeLimit(60)
                        .answers(List.of(
                            Question.Answer.builder().id("j1").text("HAVING").correct(true).build(),
                            Question.Answer.builder().id("j2").text("WHERE").correct(true).build(),
                            Question.Answer.builder().id("j3").text("ORDER BY").correct(true).build(),
                            Question.Answer.builder().id("j4").text("LIMIT").correct(true).build()
                        ))
                        .explanation("Toutes ces clauses peuvent \u00eatre utilis\u00e9es avec GROUP BY. WHERE filtre avant le regroupement, HAVING apr\u00e8s.")
                        .build()
                ))
                .build();
            
            quizRepository.saveAll(List.of(jsQuiz, htmlQuiz, sqlQuiz));
            
            // Update category counts
            categoryService.updateQuizCount("cat-programming");
            categoryService.updateQuizCount("cat-web");
            categoryService.updateQuizCount("cat-database");
        }
    }
}
