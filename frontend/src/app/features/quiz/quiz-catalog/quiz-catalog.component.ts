import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogStateService } from '../services/catalog-state.service';
import { LoaderComponent } from '@shared/components/ui/loader.component';
import { BadgeComponent } from '@shared/components/ui/badge.component';

/**
 * Quiz Catalog Component - Updated design matching smartquiz-template
 */
@Component({
  selector: 'app-quiz-catalog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LoaderComponent,
    BadgeComponent
  ],
  templateUrl: './quiz-catalog.component.html',
  styleUrl: './quiz-catalog.component.scss'
})
export class QuizCatalogComponent implements OnInit {
  readonly catalogState = inject(CatalogStateService);
  private readonly route = inject(ActivatedRoute);

  searchInput = '';
  viewMode: 'grid' | 'list' = 'grid';

  // Static categories for display when API returns empty
  staticCategories = [
    { id: '1', name: 'Science', icon: '🔬' },
    { id: '2', name: 'History', icon: '📜' },
    { id: '3', name: 'Mathematics', icon: '📐' },
    { id: '4', name: 'Geography', icon: '🌍' },
    { id: '5', name: 'Technology', icon: '💻' },
    { id: '6', name: 'Literature', icon: '📚' },
    { id: '7', name: 'Art', icon: '🎨' },
    { id: '8', name: 'Music', icon: '🎵' },
    { id: '9', name: 'Sports', icon: '⚽' }
  ];

  ngOnInit(): void {
    // Check for category from query params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        const category = this.staticCategories.find(
          c => c.name.toLowerCase() === params['category'].toLowerCase()
        );
        if (category) {
          this.onCategorySelect(category.id);
        }
      }
    });

    this.catalogState.loadCategories();
    this.catalogState.loadQuizzes();
  }

  onSearch(): void {
    this.catalogState.setFilter('search', this.searchInput);
  }

  onCategorySelect(categoryId: string | null): void {
    this.catalogState.setFilter('categoryId', categoryId);
  }

  onDifficultySelect(difficulty: 'EASY' | 'MEDIUM' | 'HARD' | null): void {
    this.catalogState.setFilter('difficulty', difficulty);
  }

  onClearFilters(): void {
    this.searchInput = '';
    this.catalogState.clearFilters();
  }

  onLoadMore(): void {
    const nextPage = this.catalogState.currentPage() + 1;
    this.catalogState.loadQuizzes(nextPage);
  }

  getDifficultyVariant(difficulty: string): 'success' | 'warning' | 'error' {
    switch (difficulty) {
      case 'EASY': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HARD': return 'error';
      default: return 'success';
    }
  }

  getDifficultyLabel(difficulty: string): string {
    switch (difficulty) {
      case 'EASY': return 'Easy';
      case 'MEDIUM': return 'Medium';
      case 'HARD': return 'Hard';
      default: return difficulty;
    }
  }
}
