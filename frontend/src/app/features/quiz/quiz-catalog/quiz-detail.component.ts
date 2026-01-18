import { Component, Input, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <!-- Back Button -->
      <button (click)="goBack()" 
              class="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Retour au catalogue
      </button>

      <!-- Quiz Header -->
      <div class="card">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Cover -->
          <div class="w-full md:w-64 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg 
                      flex items-center justify-center flex-shrink-0">
            <span class="text-6xl">🧠</span>
          </div>
          
          <!-- Info -->
          <div class="flex-1 space-y-4">
            <div class="flex items-center gap-2">
              <span class="badge badge-warning">Expert</span>
              <span class="text-text-secondary">Frontend • Angular</span>
            </div>
            
            <h1 class="text-3xl font-bold">Angular Signals Expert</h1>
            
            <p class="text-text-secondary">
              Testez vos connaissances sur les Signals Angular, la nouvelle façon réactive 
              de gérer l'état dans vos applications. Ce quiz couvre les concepts fondamentaux 
              et avancés des Signals.
            </p>
            
            <div class="flex flex-wrap gap-4 text-sm">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>20 questions</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>~20 minutes</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span>1,250 tentatives</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span class="text-success">75.5% score moyen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mode Selection -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Choisissez votre mode</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Training Mode -->
          <button 
            class="card text-left transition-all"
            [class]="selectedMode() === 'training' 
              ? 'border-primary bg-primary/5' 
              : 'hover:border-primary/50'"
            (click)="selectMode('training')">
            <div class="flex items-start gap-4">
              <div class="text-3xl">🎯</div>
              <div class="flex-1">
                <h3 class="font-semibold text-lg">Mode Entraînement</h3>
                <p class="text-text-secondary text-sm mt-1">
                  Feedback immédiat après chaque réponse. Idéal pour apprendre.
                </p>
                <ul class="mt-3 space-y-1 text-sm text-text-secondary">
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Voir la correction immédiatement
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Explications détaillées
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Pas de limite de temps
                  </li>
                </ul>
              </div>
              @if (selectedMode() === 'training') {
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              }
            </div>
          </button>

          <!-- Exam Mode -->
          <button 
            class="card text-left transition-all"
            [class]="selectedMode() === 'exam' 
              ? 'border-primary bg-primary/5' 
              : 'hover:border-primary/50'"
            (click)="selectMode('exam')">
            <div class="flex items-start gap-4">
              <div class="text-3xl">📝</div>
              <div class="flex-1">
                <h3 class="font-semibold text-lg">Mode Examen</h3>
                <p class="text-text-secondary text-sm mt-1">
                  Conditions réelles d'examen. Résultats à la fin uniquement.
                </p>
                <ul class="mt-3 space-y-1 text-sm text-text-secondary">
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Timer: 30 minutes
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Pas de feedback pendant
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Marquer pour révision
                  </li>
                </ul>
              </div>
              @if (selectedMode() === 'exam') {
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              }
            </div>
          </button>
        </div>
      </div>

      <!-- Start Button -->
      <div class="flex justify-center">
        <button 
          class="btn-primary text-lg px-8 py-3"
          [disabled]="!selectedMode()"
          (click)="startQuiz()">
          Démarrer le quiz
        </button>
      </div>
    </div>
  `
})
export class QuizDetailComponent {
  @Input() id!: string;
  
  selectedMode = signal<'training' | 'exam' | null>('training');

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/quizzes']);
  }

  selectMode(mode: 'training' | 'exam') {
    this.selectedMode.set(mode);
  }

  startQuiz() {
    // TODO: Call API to start quiz session
    // For now, navigate with mock attemptId
    this.router.navigate(['/quiz', 'attempt-123']);
  }
}
