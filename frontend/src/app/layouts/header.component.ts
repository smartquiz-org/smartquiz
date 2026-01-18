import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-surface border-b border-border sticky top-0 z-50">
      <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center space-x-2">
            <span class="text-2xl">🧠</span>
            <span class="text-xl font-bold text-primary">SmartQuiz</span>
          </a>

          <!-- Navigation Desktop -->
          <div class="hidden md:flex items-center space-x-6">
            <a routerLink="/quizzes" 
               routerLinkActive="text-primary" 
               class="text-text-secondary hover:text-text-primary transition-colors">
              Catalogue
            </a>
            <a routerLink="/history" 
               routerLinkActive="text-primary"
               class="text-text-secondary hover:text-text-primary transition-colors">
              Historique
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle -->
            <button 
              (click)="themeService.toggle()"
              class="p-2 rounded-lg hover:bg-surface-variant transition-colors"
              [attr.aria-label]="themeService.theme() === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'">
              @if (themeService.theme() === 'dark') {
                <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              }
            </button>

            <!-- User Avatar (placeholder) -->
            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span class="text-sm font-medium text-primary">U</span>
            </div>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 rounded-lg hover:bg-surface-variant"
                    (click)="mobileMenuOpen = !mobileMenuOpen">
              <svg class="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        @if (mobileMenuOpen) {
          <div class="md:hidden py-4 border-t border-border animate-fade-in">
            <a routerLink="/quizzes" 
               (click)="mobileMenuOpen = false"
               class="block py-2 text-text-secondary hover:text-text-primary">
              Catalogue
            </a>
            <a routerLink="/history" 
               (click)="mobileMenuOpen = false"
               class="block py-2 text-text-secondary hover:text-text-primary">
              Historique
            </a>
          </div>
        }
      </nav>
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  mobileMenuOpen = false;
}
