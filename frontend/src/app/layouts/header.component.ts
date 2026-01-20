import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../core/services/theme.service';
import { LogoComponent } from '@shared/components/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <header class="glass sticky top-0 z-50 border-b border-border/50">
      <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" data-testid="header-logo">
            <app-logo size="sm" [showText]="true"></app-logo>
          </a>

          <!-- Navigation Desktop -->
          <div class="hidden md:flex items-center gap-6">
            <a routerLink="/dashboard" 
               routerLinkActive="text-primary"
               [routerLinkActiveOptions]="{exact: true}"
               class="text-muted-foreground hover:text-text-primary transition-colors font-medium"
               data-testid="nav-dashboard">
              Dashboard
            </a>
            <a routerLink="/quizzes" 
               routerLinkActive="text-primary"
               class="text-muted-foreground hover:text-text-primary transition-colors font-medium"
               data-testid="nav-catalog">
              Catalogue
            </a>
            <a routerLink="/history" 
               routerLinkActive="text-primary"
               class="text-muted-foreground hover:text-text-primary transition-colors font-medium"
               data-testid="nav-history">
              Historique
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Theme Toggle -->
            <button 
              (click)="themeService.toggle()"
              class="p-2.5 rounded-xl glass hover:bg-primary/10 transition-colors"
              [attr.aria-label]="themeService.theme() === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'"
              data-testid="theme-toggle">
              @if (themeService.theme() === 'dark') {
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              }
            </button>

            <!-- User Avatar -->
            <div class="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                 data-testid="user-avatar">
              <span class="text-sm font-bold text-white">U</span>
            </div>

            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
                    (click)="mobileMenuOpen.set(!mobileMenuOpen())"
                    data-testid="mobile-menu-btn">
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
        </div>

        <!-- Mobile Menu -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden py-4 border-t border-border animate-slide-down">
            <a routerLink="/dashboard" 
               (click)="mobileMenuOpen.set(false)"
               routerLinkActive="text-primary"
               class="block py-3 text-muted-foreground hover:text-text-primary transition-colors font-medium">
              Dashboard
            </a>
            <a routerLink="/quizzes" 
               (click)="mobileMenuOpen.set(false)"
               routerLinkActive="text-primary"
               class="block py-3 text-muted-foreground hover:text-text-primary transition-colors font-medium">
              Catalogue
            </a>
            <a routerLink="/history" 
               (click)="mobileMenuOpen.set(false)"
               routerLinkActive="text-primary"
               class="block py-3 text-muted-foreground hover:text-text-primary transition-colors font-medium">
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
  mobileMenuOpen = signal(false);
}
