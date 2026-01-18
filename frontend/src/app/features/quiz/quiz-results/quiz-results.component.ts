import { Component, Input, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { QuizRepository } from '../services/quiz.repository';
import { QuizAttempt, AnswerResult } from '../models';
import { ButtonComponent, CardComponent, LoaderComponent, BadgeComponent, AlertComponent } from '../../../shared/components/ui';

/**
 * Smart Component: Quiz Results Page
 * Displays final score and review of all answers
 */
@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonComponent,
    CardComponent,
    LoaderComponent,
    BadgeComponent,
    AlertComponent
  ],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.scss'
})
export class QuizResultsComponent implements OnInit {
  @Input() attemptId!: string;

  private readonly repository = inject(QuizRepository);
  private readonly router = inject(Router);

  // State signals
  readonly attempt = signal<QuizAttempt | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly showReview = signal(false);

  // Computed signals
  readonly scorePercentage = computed(() => this.attempt()?.percentage ?? 0);
  readonly passed = computed(() => this.attempt()?.passed ?? false);
  readonly correctCount = computed(() => {
    return this.attempt()?.results?.filter(r => r.correct).length ?? 0;
  });
  readonly totalQuestions = computed(() => this.attempt()?.totalQuestions ?? 0);

  readonly scoreClass = computed(() => {
    const pct = this.scorePercentage();
    if (pct >= 80) return 'score-excellent';
    if (pct >= 60) return 'score-good';
    if (pct >= 40) return 'score-average';
    return 'score-poor';
  });

  readonly timeFormatted = computed(() => {
    const seconds = this.attempt()?.timeSpent ?? 0;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  });

  ngOnInit(): void {
    if (this.attemptId) {
      this.loadResults();
    }
  }

  private loadResults(): void {
    this.loading.set(true);
    this.repository.getAttempt(this.attemptId).subscribe({
      next: (result) => {
        this.attempt.set(result);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger les r\u00e9sultats');
        this.loading.set(false);
      }
    });
  }

  toggleReview(): void {
    this.showReview.update(v => !v);
  }

  retryQuiz(): void {
    const quizId = this.attempt()?.quizId;
    if (quizId) {
      this.router.navigate(['/quizzes', quizId]);
    }
  }

  goToCatalog(): void {
    this.router.navigate(['/quizzes']);
  }

  goToDashboard(): void {
    this.router.navigate(['/']);
  }
}
