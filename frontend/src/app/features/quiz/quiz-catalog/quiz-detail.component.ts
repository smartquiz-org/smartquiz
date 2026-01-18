import { Component, Input, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogStateService } from '../services/catalog-state.service';
import { QuizSessionService } from '../services/quiz-session.service';
import { BadgeComponent, ButtonComponent, CardComponent, LoaderComponent } from '../../../shared/components/ui';
import { AttemptMode } from '../models';

/**
 * Smart Component: Quiz Detail Page
 * Shows quiz information and mode selection before starting
 */
@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    LoaderComponent
  ],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.scss'
})
export class QuizDetailComponent implements OnInit, OnDestroy {
  @Input() id!: string;

  private readonly catalogState = inject(CatalogStateService);
  private readonly quizSession = inject(QuizSessionService);
  private readonly router = inject(Router);

  // Expose state signals to template
  readonly quiz = this.catalogState.selectedQuiz;
  readonly loading = this.catalogState.loading;
  readonly error = this.catalogState.error;
  readonly sessionLoading = this.quizSession.loading;

  // Local UI state
  selectedMode: AttemptMode = 'TRAINING';

  ngOnInit(): void {
    if (this.id) {
      this.catalogState.loadQuizDetail(this.id);
    }
  }

  ngOnDestroy(): void {
    this.catalogState.clearSelectedQuiz();
  }

  goBack(): void {
    this.router.navigate(['/quizzes']);
  }

  selectMode(mode: AttemptMode): void {
    this.selectedMode = mode;
  }

  startQuiz(): void {
    if (this.quiz()) {
      this.quizSession.startQuiz(this.quiz()!.id, this.selectedMode);
    }
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
