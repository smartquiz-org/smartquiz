import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-take',
  standalone: true,
  template: `
    <div class="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <!-- Header -->
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="font-semibold">Angular Signals Expert</h1>
            <p class="text-sm text-text-secondary">Question 1 / 20</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-mono font-bold text-primary">25:00</div>
            <p class="text-xs text-text-secondary">Temps restant</p>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-bar mt-4">
          <div class="progress-fill" style="width: 5%"></div>
        </div>
      </div>

      <!-- Question -->
      <div class="card space-y-6">
        <div class="space-y-4">
          <span class="badge badge-primary">Question 1</span>
          <h2 class="text-xl font-semibold">
            Quelle est la différence principale entre un Signal et un Observable dans Angular ?
          </h2>
        </div>

        <!-- Options -->
        <div class="space-y-3">
          <button class="answer-option w-full text-left">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-sm font-medium">
                A
              </span>
              <span>Les Signals sont toujours asynchrones, les Observables sont synchrones</span>
            </div>
          </button>
          
          <button class="answer-option w-full text-left selected">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                B
              </span>
              <span>Les Signals sont synchrones par nature, les Observables peuvent être asynchrones</span>
            </div>
          </button>
          
          <button class="answer-option w-full text-left">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-sm font-medium">
                C
              </span>
              <span>Il n'y a aucune différence, ce sont des synonymes</span>
            </div>
          </button>
          
          <button class="answer-option w-full text-left">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center text-sm font-medium">
                D
              </span>
              <span>Les Signals ne peuvent contenir que des primitives</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between">
        <button class="btn-secondary" disabled>
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Précédent
        </button>
        
        <div class="flex items-center gap-2">
          <button class="btn-secondary text-sm">
            🚩 Marquer
          </button>
        </div>
        
        <button class="btn-primary">
          Suivant
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Question Map -->
      <div class="card">
        <h3 class="text-sm font-medium mb-3">Navigation rapide</h3>
        <div class="flex flex-wrap gap-2">
          @for (i of questionNumbers; track i) {
            <button 
              class="w-8 h-8 rounded text-sm font-medium transition-colors"
              [class]="i === 1 
                ? 'bg-primary text-white' 
                : i <= 3 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-surface-variant text-text-secondary hover:bg-surface'">
              {{ i }}
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class QuizTakeComponent {
  @Input() attemptId!: string;
  
  questionNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
}
