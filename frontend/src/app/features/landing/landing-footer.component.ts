import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-border bg-card/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          <!-- Brand column -->
          <div class="col-span-2">
            <a routerLink="/" class="flex items-center gap-2 mb-4">
              <div class="p-2 gradient-primary rounded-lg">
                <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.441 20.441 0 0 1-2.876 2.416l-.426.29a3 3 0 0 1-4.512 0l-.426-.29a20.441 20.441 0 0 1-2.876-2.416C4.676 16.59 3 14.074 3 11a9 9 0 0 1 9-9z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
              <span class="text-xl font-bold gradient-text">SmartQuiz</span>
            </a>
            <p class="text-muted-foreground mb-6 max-w-xs">
              Transformez votre parcours d'apprentissage avec des quiz interactifs conçus pour rendre l'éducation engageante et efficace.
            </p>
            <div class="flex gap-4">
              <a href="#" class="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group" aria-label="Twitter">
                <svg class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" class="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group" aria-label="GitHub">
                <svg class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" class="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group" aria-label="LinkedIn">
                <svg class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" class="p-2 rounded-lg bg-muted hover:bg-primary/20 transition-colors group" aria-label="Email">
                <svg class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links columns -->
          <div>
            <h4 class="font-semibold text-text-primary mb-4">Produit</h4>
            <ul class="space-y-3">
              <li><a href="#features" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Fonctionnalités</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Tarifs</a></li>
              <li><a routerLink="/quizzes" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Catalogue</a></li>
              <li><a routerLink="/dashboard" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-text-primary mb-4">Ressources</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Documentation</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Centre d'aide</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Blog</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">API</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-text-primary mb-4">Entreprise</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">À propos</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Carrières</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Contact</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Partenaires</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-text-primary mb-4">Légal</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Confidentialité</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Conditions</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-text-primary transition-colors text-sm">Cookies</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-muted-foreground">
            © 2025 SmartQuiz. Tous droits réservés.
          </p>
          <p class="text-sm text-muted-foreground">
            Fait avec passion pour les apprenants du monde entier.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class LandingFooterComponent {}
