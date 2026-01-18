import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="alertClasses" role="alert" [attr.data-testid]="testId">
      <div class="flex items-start">
        <!-- Icon -->
        <div class="flex-shrink-0 mr-3">
          @switch (variant) {
            @case ('success') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            }
            @case ('error') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            }
            @case ('warning') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            }
            @case ('info') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            }
          }
        </div>
        
        <!-- Content -->
        <div class="flex-1">
          @if (title) {
            <h4 class="font-semibold mb-1">{{ title }}</h4>
          }
          <p [class.text-sm]="!title">
            <ng-content />
          </p>
        </div>
        
        <!-- Close Button -->
        @if (dismissible) {
          <button
            type="button"
            class="flex-shrink-0 ml-3 -mr-1 -mt-1 p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
            (click)="dismiss()"
            [attr.data-testid]="testId + '-close'"
            aria-label="Fermer">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        }
      </div>
    </div>
  `
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title = '';
  @Input() dismissible = false;
  @Input() testId = 'ui-alert';

  @Output() dismissed = new EventEmitter<void>();

  get alertClasses(): string {
    const baseClasses = 'p-4 rounded-lg border';
    
    const variantClasses: Record<AlertVariant, string> = {
      success: 'bg-success/10 border-success/30 text-success',
      error: 'bg-error/10 border-error/30 text-error',
      warning: 'bg-warning/10 border-warning/30 text-warning',
      info: 'bg-primary/10 border-primary/30 text-primary'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  dismiss(): void {
    this.dismissed.emit();
  }
}
