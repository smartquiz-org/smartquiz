import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6 animate-fade-in">
      <h1 class="text-3xl font-bold">Historique</h1>
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-4">
        <select class="floating-input max-w-xs">
          <option value="">Tous les statuts</option>
          <option value="completed">Complétés</option>
          <option value="in_progress">En cours</option>
        </select>
        
        <select class="floating-input max-w-xs">
          <option value="">Toutes les catégories</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      <!-- History List -->
      <div class="space-y-4">
        @for (item of historyItems; track item.id) {
          <div class="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <span class="text-xl">🧠</span>
              </div>
              <div>
                <h3 class="font-semibold">{{ item.title }}</h3>
                <div class="flex items-center gap-2 text-sm text-text-secondary">
                  <span>{{ item.category }}</span>
                  <span>•</span>
                  <span>{{ item.date }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="text-right">
                <div class="font-semibold" [class]="item.score >= 70 ? 'text-success' : 'text-warning'">
                  {{ item.score }}%
                </div>
                <div class="text-xs text-text-secondary">{{ item.time }}</div>
              </div>
              
              <span class="badge" [class]="item.mode === 'training' ? 'badge-primary' : 'badge-warning'">
                {{ item.mode === 'training' ? '🎯 Entraînement' : '📝 Examen' }}
              </span>
              
              <a [routerLink]="['/results', item.id]" 
                 class="btn-secondary text-sm">
                Voir
              </a>
            </div>
          </div>
        } @empty {
          <div class="card text-center py-12">
            <svg class="w-16 h-16 mx-auto text-text-secondary opacity-50 mb-4" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <p class="text-text-secondary">Aucun historique</p>
            <a routerLink="/quizzes" class="btn-primary mt-4 inline-block">
              Commencer un quiz
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class HistoryComponent {
  historyItems = [
    {
      id: '1',
      title: 'Angular Signals Expert',
      category: 'Frontend',
      date: 'Il y a 2 heures',
      score: 85,
      time: '12:30',
      mode: 'training'
    },
    {
      id: '2',
      title: 'Spring Boot Fundamentals',
      category: 'Backend',
      date: 'Hier',
      score: 92,
      time: '14:45',
      mode: 'exam'
    },
    {
      id: '3',
      title: 'MongoDB Aggregation',
      category: 'Database',
      date: 'Il y a 3 jours',
      score: 68,
      time: '18:20',
      mode: 'training'
    }
  ];
}
