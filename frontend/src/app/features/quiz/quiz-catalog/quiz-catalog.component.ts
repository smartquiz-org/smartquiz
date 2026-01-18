import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogStateService } from '../services/catalog-state.service';
import { BadgeComponent, LoaderComponent, CardComponent } from '../../../shared/components/ui';

/**
 * Smart Component: Quiz Catalog Container
 * Responsibilities:
 * - Orchestrates state loading via CatalogStateService
 * - Handles user interactions (search, filter)
 * - Delegates presentation to template
 */
@Component({
  selector: 'app-quiz-catalog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    BadgeComponent,
    LoaderComponent,
    CardComponent
  ],
  templateUrl: './quiz-catalog.component.html',
  styleUrl: './quiz-catalog.component.scss'
})
export class QuizCatalogComponent implements OnInit {
  readonly catalogState = inject(CatalogStateService);

  // Local UI state
  searchInput = '';

  ngOnInit(): void {
    this.catalogState.loadCategories();
    this.catalogState.loadQuizzes();
  }

  onSearch(): void {
    this.catalogState.setFilter('search', this.searchInput);
  }

  onCategorySelect(categoryId: string | null): void {
    this.catalogState.setFilter('categoryId', categoryId);
  }

  onDifficultySelect(difficulty: string | null): void {
    this.catalogState.setFilter('difficulty', difficulty as any);
  }

  onClearFilters(): void {
    this.searchInput = '';
    this.catalogState.clearFilters();
  }

  onLoadMore(): void {
    this.catalogState.loadQuizzes(this.catalogState.currentPage() + 1);
  }

  getDifficultyLabel(difficulty: string): string {
    const labels: Record<string, string> = {
      EASY: 'Facile',
      MEDIUM: 'Moyen',
      HARD: 'Difficile'
    };
    return labels[difficulty] || difficulty;
  }

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'error' {
    const variants: Record<string, 'success' | 'warning' | 'error'> = {
      EASY: 'success',
      MEDIUM: 'warning',
      HARD: 'error'
    };
    return variants[difficulty] || 'warning';
  }
}
