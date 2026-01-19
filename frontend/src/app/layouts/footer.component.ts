import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="glass border-t border-border/50 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Logo & Copyright -->
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="p-1.5 gradient-primary rounded-lg">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.441 20.441 0 0 1-2.876 2.416l-.426.29a3 3 0 0 1-4.512 0l-.426-.29a20.441 20.441 0 0 1-2.876-2.416C4.676 16.59 3 14.074 3 11a9 9 0 0 1 9-9z"/>
                <circle cx="12" cy="11" r="3"/>
              </svg>
            </div>
            <span class="text-sm text-muted-foreground">
              © 2025 <span class="gradient-text font-semibold">SmartQuiz</span>. Tous droits réservés.
            </span>
          </a>

          <!-- Links -->
          <div class="flex items-center gap-6 text-sm">
            <a routerLink="/quizzes" 
               class="text-muted-foreground hover:text-primary transition-colors"
               data-testid="footer-catalog">
              Catalogue
            </a>
            <a routerLink="/history" 
               class="text-muted-foreground hover:text-primary transition-colors"
               data-testid="footer-history">
              Historique
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
              À propos
            </a>
            <a href="#" class="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
