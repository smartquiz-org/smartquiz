import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses" [attr.data-testid]="testId">
      @if (header) {
        <div class="px-4 py-3 border-b border-border">
          <h3 class="font-semibold text-text-primary">{{ header }}</h3>
          @if (subheader) {
            <p class="text-sm text-text-secondary mt-0.5">{{ subheader }}</p>
          }
        </div>
      }
      <div [class]="contentClasses">
        <ng-content />
      </div>
      @if (hasFooter) {
        <div class="px-4 py-3 border-t border-border rounded-b-xl" style="background-color: rgba(42, 42, 42, 0.5)">
          <ng-content select="[card-footer]" />
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .card-interactive:hover {
      border-color: var(--primary);
      box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.05);
    }
  `]
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() header = '';
  @Input() subheader = '';
  @Input() padding = true;
  @Input() hasFooter = false;
  @Input() testId = 'ui-card';

  get cardClasses(): string {
    const baseClasses = 'bg-surface rounded-xl transition-all duration-200';
    
    const variantClasses: Record<CardVariant, string> = {
      default: 'border border-border',
      elevated: 'shadow-lg',
      outlined: 'border-2 border-border',
      interactive: 'border border-border card-interactive cursor-pointer'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  get contentClasses(): string {
    return this.padding ? 'p-4' : '';
  }
}
