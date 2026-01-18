import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  questionCount: number;
  estimatedDuration: number;
  coverImage?: string;
}

@Component({
  selector: 'app-quiz-catalog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6 animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold">Catalogue des Quiz</h1>
          <p class="text-text-secondary mt-1">Explorez nos quiz et testez vos connaissances</p>
        </div>
        
        <!-- Search -->
        <div class="relative max-w-md w-full">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" 
                 placeholder="Rechercher un quiz..."
                 class="floating-input pl-10"
                 (input)="onSearch($event)">
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2">
        @for (cat of categories; track cat) {
          <button 
            class="px-3 py-1.5 rounded-full text-sm transition-colors"
            [class]="selectedCategory() === cat 
              ? 'bg-primary text-white' 
              : 'bg-surface-variant text-text-secondary hover:text-text-primary'"
            (click)="selectCategory(cat)">
            {{ cat }}
          </button>
        }
      </div>

      <!-- Quiz Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (quiz of filteredQuizzes(); track quiz.id) {
          <a [routerLink]="['/quizzes', quiz.id]" class="card-hover group">
            <!-- Cover Image -->
            <div class="h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 
                        flex items-center justify-center">
              <span class="text-4xl">🧠</span>
            </div>
            
            <!-- Content -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="badge" [class]="getDifficultyClass(quiz.difficulty)">
                  {{ getDifficultyLabel(quiz.difficulty) }}
                </span>
                <span class="text-xs text-text-secondary">{{ quiz.category }}</span>
              </div>
              
              <h3 class="font-semibold text-lg group-hover:text-primary transition-colors">
                {{ quiz.title }}
              </h3>
              
              <p class="text-text-secondary text-sm line-clamp-2">
                {{ quiz.description }}
              </p>
              
              <div class="flex items-center gap-4 text-sm text-text-secondary pt-2">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ quiz.questionCount }} questions
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  ~{{ quiz.estimatedDuration }} min
                </span>
              </div>
            </div>
          </a>
        } @empty {
          <div class="col-span-full text-center py-12">
            <svg class="w-16 h-16 mx-auto text-text-secondary opacity-50 mb-4" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-text-secondary">Aucun quiz trouvé</p>
          </div>
        }
      </div>
    </div>
  `
})
export class QuizCatalogComponent {
  categories = ['Tous', 'Frontend', 'Backend', 'DevOps', 'Database'];
  selectedCategory = signal('Tous');
  searchQuery = signal('');

  // Mock data - will be replaced by API call
  quizzes = signal<Quiz[]>([
    {
      id: '1',
      title: 'Angular Signals Expert',
      description: 'Testez vos connaissances sur les Signals Angular, la nouvelle façon réactive de gérer l\'état.',
      category: 'Frontend',
      difficulty: 'expert',
      questionCount: 20,
      estimatedDuration: 20
    },
    {
      id: '2',
      title: 'Spring Boot Fundamentals',
      description: 'Les bases de Spring Boot pour créer des applications Java modernes.',
      category: 'Backend',
      difficulty: 'intermediate',
      questionCount: 15,
      estimatedDuration: 15
    },
    {
      id: '3',
      title: 'MongoDB Aggregation',
      description: 'Maîtrisez les pipelines d\'agrégation MongoDB pour des requêtes complexes.',
      category: 'Database',
      difficulty: 'advanced',
      questionCount: 12,
      estimatedDuration: 18
    },
    {
      id: '4',
      title: 'Docker Basics',
      description: 'Introduction à la containerisation avec Docker.',
      category: 'DevOps',
      difficulty: 'beginner',
      questionCount: 10,
      estimatedDuration: 10
    }
  ]);

  filteredQuizzes = signal<Quiz[]>(this.quizzes());

  selectCategory(category: string) {
    this.selectedCategory.set(category);
    this.filterQuizzes();
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.filterQuizzes();
  }

  private filterQuizzes() {
    let filtered = this.quizzes();
    
    if (this.selectedCategory() !== 'Tous') {
      filtered = filtered.filter(q => q.category === this.selectedCategory());
    }
    
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(query) ||
        q.description.toLowerCase().includes(query)
      );
    }
    
    this.filteredQuizzes.set(filtered);
  }

  getDifficultyClass(difficulty: string): string {
    const classes: Record<string, string> = {
      beginner: 'badge-success',
      intermediate: 'badge-primary',
      advanced: 'badge-warning',
      expert: 'badge-error'
    };
    return classes[difficulty] || 'badge-primary';
  }

  getDifficultyLabel(difficulty: string): string {
    const labels: Record<string, string> = {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
      expert: 'Expert'
    };
    return labels[difficulty] || difficulty;
  }
}
