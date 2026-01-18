import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <!-- Score Card -->
      <div class="card text-center py-8">
        <div class="text-6xl mb-4">🎉</div>
        <h1 class="text-2xl font-semibold mb-2">Félicitations !</h1>
        
        <!-- Score Circle -->
        <div class="w-32 h-32 mx-auto my-6 rounded-full border-8 border-success flex items-center justify-center">
          <span class="text-4xl font-bold text-success">85%</span>
        </div>
        
        <p class="text-text-secondary">170 / 200 points</p>
        <p class="text-xl font-semibold text-success mt-2">Excellent !</p>
        
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mt-8">
          <div>
            <div class="text-2xl font-bold text-success">17</div>
            <div class="text-sm text-text-secondary">Correctes</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-error">3</div>
            <div class="text-sm text-text-secondary">Incorrectes</div>
          </div>
          <div>
            <div class="text-2xl font-bold">12:30</div>
            <div class="text-sm text-text-secondary">Temps</div>
          </div>
        </div>
        
        <!-- Comparison -->
        <div class="mt-8 p-4 bg-surface-variant rounded-lg">
          <div class="flex justify-between text-sm">
            <span>Votre score</span>
            <span class="font-semibold text-success">85%</span>
          </div>
          <div class="progress-bar my-2">
            <div class="progress-fill bg-success" style="width: 85%"></div>
          </div>
          <div class="flex justify-between text-sm text-text-secondary">
            <span>Score moyen</span>
            <span>75.5%</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="btn-secondary">
          📝 Revoir les réponses
        </button>
        <a routerLink="/quizzes/1" class="btn-secondary text-center">
          🔄 Recommencer
        </a>
        <a routerLink="/quizzes" class="btn-primary text-center">
          📚 Catalogue
        </a>
      </div>
    </div>
  `
})
export class QuizResultsComponent {
  @Input() attemptId!: string;
}
