import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Progress Ring Component
 * SVG-based circular progress indicator used for quiz timers
 */
@Component({
  selector: 'ui-progress-ring',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-flex items-center justify-center" [class]="className">
      <svg
        [attr.width]="size"
        [attr.height]="size"
        class="transform -rotate-90">
        <!-- Background circle -->
        <circle
          [attr.cx]="size / 2"
          [attr.cy]="size / 2"
          [attr.r]="radius()"
          [attr.stroke-width]="strokeWidth"
          class="fill-none stroke-muted"
        />
        <!-- Progress circle -->
        <circle
          [attr.cx]="size / 2"
          [attr.cy]="size / 2"
          [attr.r]="radius()"
          [attr.stroke-width]="strokeWidth"
          stroke-linecap="round"
          class="fill-none transition-all duration-500 ease-out"
          [class]="strokeClass()"
          [style.strokeDasharray]="circumference()"
          [style.strokeDashoffset]="offset()"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <ng-content />
      </div>
    </div>
  `
})
export class ProgressRingComponent {
  @Input() progress: number = 0; // 0-100
  @Input() size: number = 120;
  @Input() strokeWidth: number = 8;
  @Input() variant: 'primary' | 'accent' | 'success' | 'warning' | 'destructive' = 'primary';
  @Input() className: string = '';

  radius = computed(() => (this.size - this.strokeWidth) / 2);
  circumference = computed(() => this.radius() * 2 * Math.PI);
  offset = computed(() => this.circumference() - (this.progress / 100) * this.circumference());

  strokeClass = computed(() => {
    const colors: Record<string, string> = {
      'primary': 'stroke-primary',
      'accent': 'stroke-accent',
      'success': 'stroke-success',
      'warning': 'stroke-warning',
      'destructive': 'stroke-error'
    };
    return colors[this.variant] || colors['primary'];
  });
}
