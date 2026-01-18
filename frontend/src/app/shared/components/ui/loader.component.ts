import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoaderVariant = 'spinner' | 'dots' | 'pulse';

@Component({
  selector: 'ui-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (variant) {
      @case ('spinner') {
        <div [class]="containerClasses" role="status" [attr.data-testid]="testId">
          <svg [class]="spinnerClasses" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          @if (text) {
            <span [class]="textClasses">{{ text }}</span>
          }
          <span class="sr-only">Chargement...</span>
        </div>
      }
      @case ('dots') {
        <div [class]="containerClasses" role="status" [attr.data-testid]="testId">
          <div class="flex space-x-1">
            <div [class]="dotClasses" style="animation-delay: 0ms"></div>
            <div [class]="dotClasses" style="animation-delay: 150ms"></div>
            <div [class]="dotClasses" style="animation-delay: 300ms"></div>
          </div>
          @if (text) {
            <span [class]="textClasses">{{ text }}</span>
          }
          <span class="sr-only">Chargement...</span>
        </div>
      }
      @case ('pulse') {
        <div [class]="containerClasses" role="status" [attr.data-testid]="testId">
          <div [class]="pulseClasses"></div>
          @if (text) {
            <span [class]="textClasses">{{ text }}</span>
          }
          <span class="sr-only">Chargement...</span>
        </div>
      }
    }
  `,
  styles: [`
    @keyframes bounce-dot {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-6px); }
    }
    .animate-bounce-dot {
      animation: bounce-dot 1s ease-in-out infinite;
    }
  `]
})
export class LoaderComponent {
  @Input() size: LoaderSize = 'md';
  @Input() variant: LoaderVariant = 'spinner';
  @Input() text = '';
  @Input() centered = false;
  @Input() overlay = false;
  @Input() testId = 'ui-loader';

  get containerClasses(): string {
    let classes = 'inline-flex items-center gap-2';
    if (this.centered) {
      classes += ' justify-center w-full';
    }
    if (this.overlay) {
      classes = 'fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50';
    }
    return classes;
  }

  get spinnerClasses(): string {
    const sizeClasses: Record<LoaderSize, string> = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    };
    return `animate-spin text-primary ${sizeClasses[this.size]}`;
  }

  get dotClasses(): string {
    const sizeClasses: Record<LoaderSize, string> = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4'
    };
    return `rounded-full bg-primary animate-bounce-dot ${sizeClasses[this.size]}`;
  }

  get pulseClasses(): string {
    const sizeClasses: Record<LoaderSize, string> = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    };
    return `rounded-full bg-primary animate-pulse ${sizeClasses[this.size]}`;
  }

  get textClasses(): string {
    const sizeClasses: Record<LoaderSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg'
    };
    return `text-text-secondary ${sizeClasses[this.size]}`;
  }
}
