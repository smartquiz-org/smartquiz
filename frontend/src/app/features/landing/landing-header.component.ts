import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
            [class.glass]="isScrolled()" 
            [class.bg-transparent]="!isScrolled()">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 group" data-testid="logo">
            <div class="relative">
              <div class="absolute inset-0 gradient-primary rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div class="relative bg-card p-2 rounded-lg border border-border">
                <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.441 20.441 0 0 1-2.876 2.416l-.426.29a3 3 0 0 1-4.512 0l-.426-.29a20.441 20.441 0 0 1-2.876-2.416C4.676 16.59 3 14.074 3 11a9 9 0 0 1 9-9z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
            </div>
            <span class="text-xl font-bold gradient-text">SmartQuiz</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-muted-foreground hover:text-text-primary transition-colors font-medium">
              Fonctionnalités
            </a>
            <a routerLink="/quizzes" class="text-muted-foreground hover:text-text-primary transition-colors font-medium">
              Catalogue
            </a>
            <a routerLink="/dashboard" class="text-muted-foreground hover:text-text-primary transition-colors font-medium">
              Dashboard
            </a>
            <a href="#testimonials" class="text-muted-foreground hover:text-text-primary transition-colors font-medium">
              Témoignages
            </a>
          </div>

          <!-- Desktop CTA -->
          <div class="hidden md:flex items-center gap-3">
            <a routerLink="/quizzes" class="btn-ghost px-4 py-2 rounded-lg">
              Se connecter
            </a>
            <a routerLink="/quizzes" class="btn-primary flex items-center gap-2" data-testid="get-started-btn">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3l2.5 2.5M12 3v10m0-10l-2.5 2.5M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
                <path d="M5 12l7 7 7-7"/>
              </svg>
              Commencer
            </a>
          </div>

          <!-- Mobile menu button -->
          <button type="button" 
                  class="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                  (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                  [attr.aria-label]="mobileMenuOpen() ? 'Fermer le menu' : 'Ouvrir le menu'">
            @if (mobileMenuOpen()) {
              <svg class="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            } @else {
              <svg class="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            }
          </button>
        </div>

        <!-- Mobile Navigation -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden py-4 border-t border-border animate-slide-down">
            <div class="flex flex-col gap-4">
              <a href="#features" 
                 class="text-muted-foreground hover:text-text-primary transition-colors font-medium py-2"
                 (click)="mobileMenuOpen.set(false)">
                Fonctionnalités
              </a>
              <a routerLink="/quizzes" 
                 class="text-muted-foreground hover:text-text-primary transition-colors font-medium py-2"
                 (click)="mobileMenuOpen.set(false)">
                Catalogue
              </a>
              <a routerLink="/dashboard" 
                 class="text-muted-foreground hover:text-text-primary transition-colors font-medium py-2"
                 (click)="mobileMenuOpen.set(false)">
                Dashboard
              </a>
              <a href="#testimonials" 
                 class="text-muted-foreground hover:text-text-primary transition-colors font-medium py-2"
                 (click)="mobileMenuOpen.set(false)">
                Témoignages
              </a>
              <div class="flex flex-col gap-2 pt-4 border-t border-border">
                <a routerLink="/quizzes" class="btn-ghost text-center" (click)="mobileMenuOpen.set(false)">
                  Se connecter
                </a>
                <a routerLink="/quizzes" class="btn-primary text-center" (click)="mobileMenuOpen.set(false)">
                  Commencer
                </a>
              </div>
            </div>
          </div>
        }
      </nav>
    </header>
  `
})
export class LandingHeaderComponent {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }
}
