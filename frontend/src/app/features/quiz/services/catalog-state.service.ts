import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { QuizRepository } from './quiz.repository';
import {
  Category,
  QuizSummary,
  QuizDetail,
  QuizAttempt,
  Page,
  DifficultyLevel
} from '../models';

/**
 * State interface for Catalog feature
 */
interface CatalogState {
  categories: Category[];
  quizzes: QuizSummary[];
  selectedQuiz: QuizDetail | null;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  loading: boolean;
  error: string | null;
  filters: {
    categoryId: string | null;
    difficulty: DifficultyLevel | null;
    search: string;
  };
}

const initialState: CatalogState = {
  categories: [],
  quizzes: [],
  selectedQuiz: null,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  loading: false,
  error: null,
  filters: {
    categoryId: null,
    difficulty: null,
    search: ''
  }
};

/**
 * State Service for Quiz Catalog
 * Follows the State Management Pattern with Signals
 * Single Responsibility: Manages catalog state only
 */
@Injectable({ providedIn: 'root' })
export class CatalogStateService {
  private readonly repository = inject(QuizRepository);
  private readonly destroyRef = inject(DestroyRef);

  // Private writable state
  private readonly state = signal<CatalogState>(initialState);

  // Public readonly selectors (computed signals)
  readonly categories = computed(() => this.state().categories);
  readonly quizzes = computed(() => this.state().quizzes);
  readonly selectedQuiz = computed(() => this.state().selectedQuiz);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly filters = computed(() => this.state().filters);
  readonly currentPage = computed(() => this.state().currentPage);
  readonly totalPages = computed(() => this.state().totalPages);
  readonly totalElements = computed(() => this.state().totalElements);

  // Derived computed signals
  readonly hasQuizzes = computed(() => this.quizzes().length > 0);
  readonly hasMorePages = computed(() => this.currentPage() < this.totalPages() - 1);
  readonly selectedCategory = computed(() => {
    const categoryId = this.filters().categoryId;
    return categoryId ? this.categories().find(c => c.id === categoryId) : null;
  });

  // Actions
  loadCategories(): void {
    this.repository.getCategories()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ error: 'Erreur lors du chargement des catégories' });
          return of([]);
        })
      )
      .subscribe(categories => {
        this.updateState({ categories });
      });
  }

  loadQuizzes(page = 0): void {
    this.updateState({ loading: true, error: null });
    const filters = this.state().filters;

    this.repository.getQuizzes({
      categoryId: filters.categoryId ?? undefined,
      difficulty: filters.difficulty ?? undefined,
      search: filters.search || undefined,
      page
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ loading: false, error: 'Erreur lors du chargement des quiz' });
          return of({ content: [], totalPages: 0, totalElements: 0, number: 0, size: 12, first: true, last: true } as Page<QuizSummary>);
        })
      )
      .subscribe(response => {
        this.updateState({
          quizzes: response.content,
          currentPage: response.number,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          loading: false
        });
      });
  }

  loadQuizDetail(id: string): void {
    this.updateState({ loading: true, error: null, selectedQuiz: null });

    this.repository.getQuizById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ loading: false, error: 'Quiz non trouvé' });
          return of(null);
        })
      )
      .subscribe(quiz => {
        this.updateState({ selectedQuiz: quiz, loading: false });
      });
  }

  setFilter(key: keyof CatalogState['filters'], value: string | DifficultyLevel | null): void {
    const currentFilters = this.state().filters;
    this.updateState({
      filters: { ...currentFilters, [key]: value }
    });
    this.loadQuizzes(0); // Reset to first page when filters change
  }

  clearFilters(): void {
    this.updateState({
      filters: { categoryId: null, difficulty: null, search: '' }
    });
    this.loadQuizzes(0);
  }

  clearSelectedQuiz(): void {
    this.updateState({ selectedQuiz: null });
  }

  private updateState(partial: Partial<CatalogState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }
}
