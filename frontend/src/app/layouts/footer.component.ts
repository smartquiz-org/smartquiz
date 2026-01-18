import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-surface border-t border-border py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Logo & Copyright -->
          <div class="flex items-center space-x-2">
            <span class="text-xl">🧠</span>
            <span class="text-text-secondary text-sm">
              © 2026 SmartQuiz. Tous droits réservés.
            </span>
          </div>

          <!-- Links -->
          <div class="flex items-center space-x-6 text-sm">
            <a routerLink="/quizzes" class="text-text-secondary hover:text-text-primary transition-colors">
              Catalogue
            </a>
            <a href="#" class="text-text-secondary hover:text-text-primary transition-colors">
              À propos
            </a>
            <a href="#" class="text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
