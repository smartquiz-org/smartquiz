import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-8 animate-fade-in">
      <!-- Welcome Section -->
      <section class="text-center py-8">
        <h1 class="text-4xl font-bold mb-4">
          Bienvenue sur <span class="text-primary">SmartQuiz</span> 🧠
        </h1>
        <p class="text-text-secondary text-lg max-w-2xl mx-auto">
          Testez et améliorez vos compétences techniques à travers des quiz interactifs.
          Choisissez parmi une variété de catégories et suivez votre progression.
        </p>
      </section>

      <!-- Quick Stats -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card text-center">
          <div class="text-3xl font-bold text-primary mb-2">0</div>
          <div class="text-text-secondary">Quiz complétés</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-success mb-2">--%</div>
          <div class="text-text-secondary">Score moyen</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-warning mb-2">0h</div>
          <div class="text-text-secondary">Temps total</div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="card bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <div class="text-center py-6">
          <h2 class="text-2xl font-semibold mb-4">Prêt à commencer ?</h2>
          <p class="text-text-secondary mb-6">
            Explorez notre catalogue de quiz et testez vos connaissances.
          </p>
          <a routerLink="/quizzes" class="btn-primary inline-flex items-center space-x-2">
            <span>Explorer les quiz</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
        </div>
      </section>

      <!-- Recent Activity (placeholder) -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Activité récente</h2>
        <div class="card">
          <div class="text-center py-8 text-text-secondary">
            <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <p>Aucune activité récente</p>
            <p class="text-sm mt-2">Commencez un quiz pour voir votre historique ici.</p>
          </div>
        </div>
      </section>
    </div>
  `
})
export class DashboardComponent {}
