import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuizRepository } from '@features/quiz/services/quiz.repository';
import { QuizAttempt, Page } from '@features/quiz/models';
import { CardComponent } from '@shared/components/ui/card.component';
import { BadgeComponent } from '@shared/components/ui/badge.component';
import { LoaderComponent } from '@shared/components/ui/loader.component';
import { ButtonComponent } from '@shared/components/ui/button.component';

/**
 * Smart Component: History Page
 * Shows user's quiz attempt history with pagination
 */
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardComponent,
    BadgeComponent,
    LoaderComponent,
    ButtonComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  private readonly repository = inject(QuizRepository);

  // State
  readonly attempts = signal<QuizAttempt[]>([]);
  readonly loading = signal(true);
  readonly currentPage = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  // Computed
  readonly hasAttempts = computed(() => this.attempts().length > 0);
  readonly hasMorePages = computed(() => this.currentPage() < this.totalPages() - 1);

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(page = 0): void {
    this.loading.set(true);
    this.repository.getHistory(page, 10).subscribe({
      next: (response) => {
        if (page === 0) {
          this.attempts.set(response.content);
        } else {
          this.attempts.update(current => [...current, ...response.content]);
        }
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  loadMore(): void {
    this.loadHistory(this.currentPage() + 1);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      COMPLETED: 'Terminé',
      IN_PROGRESS: 'En cours',
      ABANDONED: 'Abandonné'
    };
    return labels[status] || status;
  }

  getStatusVariant(status: string): 'success' | 'warning' | 'error' | 'default' {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
      COMPLETED: 'success',
      IN_PROGRESS: 'warning',
      ABANDONED: 'error'
    };
    return variants[status] || 'default';
  }

  getModeLabel(mode: string): string {
    return mode === 'TRAINING' ? '🎯 Entraînement' : '📝 Examen';
  }
}
