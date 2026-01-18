import { Routes } from '@angular/router';

export const routes: Routes = [
  // Landing Page (Home)
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component')
      .then(m => m.LandingComponent),
    title: 'SmartQuiz - Apprenez en vous amusant'
  },
  
  // Dashboard
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    title: 'SmartQuiz - Dashboard'
  },
  
  // UI Components Showcase (dev)
  {
    path: 'ui-showcase',
    loadComponent: () => import('./features/ui-showcase/ui-showcase.component')
      .then(m => m.UiShowcaseComponent),
    title: 'Composants UI - SmartQuiz'
  },
  
  // Quiz Catalog
  {
    path: 'quizzes',
    loadComponent: () => import('./features/quiz/quiz-catalog/quiz-catalog.component')
      .then(m => m.QuizCatalogComponent),
    title: 'Catalogue des Quiz - SmartQuiz'
  },
  
  // Quiz Details
  {
    path: 'quizzes/:id',
    loadComponent: () => import('./features/quiz/quiz-catalog/quiz-detail.component')
      .then(m => m.QuizDetailComponent),
    title: 'Détails du Quiz - SmartQuiz'
  },
  
  // Quiz Taking
  {
    path: 'quiz/:attemptId',
    loadComponent: () => import('./features/quiz/quiz-take/quiz-take.component')
      .then(m => m.QuizTakeComponent),
    title: 'Quiz en cours - SmartQuiz'
  },
  
  // Quiz Results
  {
    path: 'results/:attemptId',
    loadComponent: () => import('./features/quiz/quiz-results/quiz-results.component')
      .then(m => m.QuizResultsComponent),
    title: 'Résultats - SmartQuiz'
  },
  
  // History
  {
    path: 'history',
    loadComponent: () => import('./features/history/history.component')
      .then(m => m.HistoryComponent),
    title: 'Historique - SmartQuiz'
  },
  
  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
