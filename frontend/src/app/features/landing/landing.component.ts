import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingHeaderComponent } from './landing-header.component';
import { LandingFooterComponent } from './landing-footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, LandingHeaderComponent, LandingFooterComponent],
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

  categories = [
    { name: 'Développement Web', icon: 'code', count: 45, color: 'coral' },
    { name: 'Data Science', icon: 'chart', count: 32, color: 'teal' },
    { name: 'Design UX/UI', icon: 'palette', count: 28, color: 'purple' },
    { name: 'Marketing Digital', icon: 'megaphone', count: 25, color: 'orange' },
    { name: 'Langues', icon: 'globe', count: 40, color: 'blue' },
    { name: 'Business', icon: 'briefcase', count: 35, color: 'green' }
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
      number: '01',
      title: 'Apprentissage Adaptatif',
      description: 'Des quiz qui s\'adaptent à votre niveau et vous aident à progresser à votre rythme.',
      icon: 'brain'
    },
    {
      number: '02',
      title: 'Suivi Personnalisé',
      description: 'Visualisez vos progrès avec des statistiques détaillées et des recommandations.',
      icon: 'chart'
    },
    {
      number: '03',
      title: 'Contenu Riche',
      description: 'Des milliers de questions dans des domaines variés, régulièrement mis à jour.',
      icon: 'library'
    },
    {
      number: '04',
      title: 'Communauté Active',
      description: 'Partagez vos scores, défiez vos amis et apprenez ensemble.',
      icon: 'users'
    }
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
