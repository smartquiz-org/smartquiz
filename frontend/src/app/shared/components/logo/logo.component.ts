import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 group">
      <div class="relative">
        <!-- Glow effect on hover -->
        <div class="absolute inset-0 gradient-primary rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity"></div>
        
        <!-- Logo container -->
        <div class="relative bg-card rounded-full border border-border" 
             [ngClass]="{
               'p-1.5 w-9 h-9': size === 'sm',
               'p-2 w-10 h-10': size === 'md',
               'p-2.5 w-12 h-12': size === 'lg'
             }">
          <!-- Brain Icon SVG -->
          <svg 
            class="text-primary w-full h-full" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.5"
            stroke-linecap="round" 
            stroke-linejoin="round">
            <!-- Brain outline with intricate paths -->
            <path d="M12 4.5c-1.5 0-2.5.5-3.5 1.5-.5.5-1 1-1.5 1.5-.5.5-1 1-1.5 1.5-.5.5-1 1.5-1 2.5s.5 2 1 2.5c.5.5 1 1 1.5 1.5.5.5 1 1 1.5 1.5 1 1 2 1.5 3.5 1.5s2.5-.5 3.5-1.5c.5-.5 1-1 1.5-1.5.5-.5 1-1 1.5-1.5.5-.5 1-1.5 1-2.5s-.5-2-1-2.5c-.5-.5-1-1-1.5-1.5-.5-.5-1-1-1.5-1.5-1-1-2-1.5-3.5-1.5z"/>
            
            <!-- Left hemisphere detail -->
            <path d="M9 8c-.5.5-1 1-1 1.5 0 .5.5 1 1 1.5"/>
            <path d="M7.5 11.5c-.3.3-.5.7-.5 1s.2.7.5 1"/>
            
            <!-- Right hemisphere detail -->
            <path d="M15 8c.5.5 1 1 1 1.5 0 .5-.5 1-1 1.5"/>
            <path d="M16.5 11.5c.3.3.5.7.5 1s-.2.7-.5 1"/>
            
            <!-- Center line -->
            <path d="M12 4.5v14" stroke-width="1" opacity="0.3"/>
            
            <!-- Neural connections (small dots/circles) -->
            <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
            <circle cx="15" cy="10" r="0.8" fill="currentColor"/>
            <circle cx="9" cy="14" r="0.8" fill="currentColor"/>
            <circle cx="15" cy="14" r="0.8" fill="currentColor"/>
            <circle cx="12" cy="12" r="0.8" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <!-- Text -->
      @if (showText) {
        <span 
          class="font-bold gradient-text"
          [ngClass]="{
            'text-lg': size === 'sm',
            'text-xl': size === 'md',
            'text-2xl': size === 'lg'
          }">
          SmartQuiz
        </span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showText = true;
}
