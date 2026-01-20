import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingHeaderComponent } from './landing-header.component';
import { LandingFooterComponent } from './landing-footer.component';
import { LogoComponent } from '@shared/components/logo/logo.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, LandingHeaderComponent, LandingFooterComponent, LogoComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  // Animated counters
  quizCount = signal(0);
  userCount = signal(0);
  questionCount = signal(0);
  successRate = signal(0);

  // Target values
  readonly targets = {
    quizzes: 150,
    users: 2500,
    questions: 5000,
    successRate: 94
  };

  // Quiz preview options for hero
  quizOptions = [
    { label: 'A', text: 'Ag', correct: false },
    { label: 'B', text: 'Au', correct: true },
    { label: 'C', text: 'Go', correct: false },
    { label: 'D', text: 'Gd', correct: false },
  ];

  categories = [
    { name: 'Développement Web', icon: 'code', count: 45, color: 'primary' },
    { name: 'Data Science', icon: 'chart', count: 32, color: 'accent' },
    { name: 'Design UX/UI', icon: 'palette', count: 28, color: 'secondary' },
    { name: 'Marketing Digital', icon: 'megaphone', count: 25, color: 'warning' },
    { name: 'Langues', icon: 'globe', count: 40, color: 'success' },
    { name: 'Business', icon: 'briefcase', count: 35, color: 'error' }
  ];

  testimonials = [
    {
      name: 'Marie Dupont',
      role: 'Développeuse Frontend',
      avatar: 'M',
      content: 'SmartQuiz m\'a permis de consolider mes connaissances en React et TypeScript. Les quiz sont bien conçus et progressifs.',
      rating: 5
    },
    {
      name: 'Thomas Martin',
      role: 'Étudiant en informatique',
      avatar: 'T',
      content: 'Une plateforme géniale pour réviser avant les examens ! Les statistiques détaillées m\'aident à identifier mes lacunes.',
      rating: 5
    },
    {
      name: 'Sophie Bernard',
      role: 'Chef de projet',
      avatar: 'S',
      content: 'J\'utilise SmartQuiz pour former mon équipe. L\'interface est intuitive et les résultats sont faciles à suivre.',
      rating: 5
    }
  ];

  features = [
    {
      title: 'Apprentissage Intelligent',
      description: 'Quiz adaptatifs alimentés par l\'IA qui s\'ajustent à votre niveau en temps réel pour un apprentissage optimal.',
      icon: 'brain',
      color: 'primary'
    },
    {
      title: 'Succès & Badges',
      description: 'Gagnez des récompenses, débloquez des succès et montrez votre expertise avec des badges collectibles.',
      icon: 'trophy',
      color: 'accent'
    },
    {
      title: 'Suivi de Progression',
      description: 'Analyses et insights détaillés pour suivre votre parcours d\'apprentissage et identifier les axes d\'amélioration.',
      icon: 'chart',
      color: 'secondary'
    },
    {
      title: 'Compétition & Collaboration',
      description: 'Défiez vos amis, rejoignez des groupes d\'étude et grimpez dans le classement mondial.',
      icon: 'users',
      color: 'primary'
    },
    {
      title: 'Quiz Rapides',
      description: 'Sessions de quiz courtes et ciblées parfaites pour les emplois du temps chargés. Apprenez en seulement 5 minutes par jour.',
      icon: 'zap',
      color: 'accent'
    },
    {
      title: 'Contenu Vérifié',
      description: 'Questions élaborées par des experts et revues par des éducateurs pour leur exactitude et pertinence.',
      icon: 'shield',
      color: 'secondary'
    }
  ];

  stats = [
    { value: '50K+', label: 'Apprenants actifs', icon: 'users' },
    { value: '1M+', label: 'Quiz complétés', icon: 'target' },
    { value: '500+', label: 'Catégories de quiz', icon: 'brain' },
    { value: '98%', label: 'Taux de satisfaction', icon: 'trophy' },
  ];

  steps = [
    {
      number: 1,
      title: 'Choisissez un sujet',
      description: 'Parcourez notre catalogue et sélectionnez le quiz qui vous intéresse.'
    },
    {
      number: 2,
      title: 'Testez vos connaissances',
      description: 'Répondez aux questions à votre rythme, sans pression.'
    },
    {
      number: 3,
      title: 'Progressez',
      description: 'Analysez vos résultats et améliorez-vous quiz après quiz.'
    }
  ];

  ngOnInit() {
    this.animateCounters();
  }

  animateCounters() {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.quizCount.set(Math.round(this.targets.quizzes * easeOut));
      this.userCount.set(Math.round(this.targets.users * easeOut));
      this.questionCount.set(Math.round(this.targets.questions * easeOut));
      this.successRate.set(Math.round(this.targets.successRate * easeOut));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
  }
}
