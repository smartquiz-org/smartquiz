import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

// Pre-defined badge types for quiz context
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type QuizStatus = 'draft' | 'published' | 'archived';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses" [attr.data-testid]="testId">
      @if (icon) {
        <span class="mr-1">{{ icon }}</span>
      }
      @if (difficulty) {
        {{ difficultyLabel }}
      } @else if (status) {
        {{ statusLabel }}
      } @else {
        <ng-content />
      }
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input() icon = '';
  @Input() testId = 'ui-badge';
  
  // Quiz-specific inputs
  @Input() difficulty?: DifficultyLevel;
  @Input() status?: QuizStatus;
  @Input() category = '';

  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';
    
    // Determine variant based on difficulty or status if provided
    let effectiveVariant = this.variant;
    if (this.difficulty) {
      effectiveVariant = this.getDifficultyVariant();
    } else if (this.status) {
      effectiveVariant = this.getStatusVariant();
    }

    const variantClasses: Record<BadgeVariant, string> = {
      default: 'bg-surface-variant text-text-secondary',
      primary: 'bg-primary/20 text-primary',
      success: 'bg-success/20 text-success',
      warning: 'bg-warning/20 text-warning',
      error: 'bg-error/20 text-error',
      info: 'bg-blue-500/20 text-blue-400'
    };

    const sizeClasses: Record<BadgeSize, string> = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    };

    return `${baseClasses} ${variantClasses[effectiveVariant]} ${sizeClasses[this.size]}`;
  }

  get difficultyLabel(): string {
    const labels: Record<DifficultyLevel, string> = {
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    };
    return this.difficulty ? labels[this.difficulty] : '';
  }

  get statusLabel(): string {
    const labels: Record<QuizStatus, string> = {
      draft: 'Brouillon',
      published: 'Publié',
      archived: 'Archivé'
    };
    return this.status ? labels[this.status] : '';
  }

  private getDifficultyVariant(): BadgeVariant {
    const variants: Record<DifficultyLevel, BadgeVariant> = {
      easy: 'success',
      medium: 'warning',
      hard: 'error'
    };
    return this.difficulty ? variants[this.difficulty] : 'default';
  }

  private getStatusVariant(): BadgeVariant {
    const variants: Record<QuizStatus, BadgeVariant> = {
      draft: 'default',
      published: 'success',
      archived: 'warning'
    };
    return this.status ? variants[this.status] : 'default';
  }
}
