import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuizRepository } from '@features/quiz/services/quiz.repository';
import { QuizSummary, UserStats } from '@features/quiz/models';
import { CardComponent } from '@shared/components/ui/card.component';
import { BadgeComponent } from '@shared/components/ui/badge.component';
import { LoaderComponent } from '@shared/components/ui/loader.component';
import { ButtonComponent } from '@shared/components/ui/button.component';

/**
 * Smart Component: Dashboard
 * Shows user stats overview and popular quizzes
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardComponent,
    BadgeComponent,
    LoaderComponent,
    ButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly repository = inject(QuizRepository);

  // State
  readonly stats = signal<UserStats | null>(null);
  readonly popularQuizzes = signal<QuizSummary[]>([]);
  readonly loading = signal(true);

  // Computed
  readonly hasStats = computed(() => {
    const s = this.stats();
    return s && s.totalQuizzesCompleted > 0;
  });

  readonly categoryStatsList = computed(() => {
    const s = this.stats();
    return s ? Object.values(s.categoryStats) : [];
  });

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Load stats
    this.repository.getDashboardStats().subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => this.stats.set(null)
    });

    // Load popular quizzes
    this.repository.getPopularQuizzes().subscribe({
      next: (quizzes) => {
        this.popularQuizzes.set(quizzes);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
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
