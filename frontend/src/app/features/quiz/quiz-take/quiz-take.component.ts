import { Component, Input, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizSessionService } from '../services/quiz-session.service';
import { ButtonComponent } from '@shared/components/ui/button.component';
import { CardComponent } from '@shared/components/ui/card.component';
import { LoaderComponent } from '@shared/components/ui/loader.component';
import { AlertComponent } from '@shared/components/ui/alert.component';
import { BadgeComponent } from '@shared/components/ui/badge.component';
import { ProgressRingComponent } from '@shared/components/ui/progress-ring.component';

/**
 * Smart Component: Quiz Taking Interface
 * Handles the active quiz session with questions, timer, and navigation
 * Design based on SmartQuiz template with dark theme
 */
@Component({
  selector: 'app-quiz-take',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    LoaderComponent,
    AlertComponent,
    BadgeComponent,
    ProgressRingComponent
  ],
  templateUrl: './quiz-take.component.html',
  styleUrl: './quiz-take.component.scss'
})
export class QuizTakeComponent implements OnInit, OnDestroy {
  @Input() attemptId!: string;

  private readonly session = inject(QuizSessionService);
  private readonly router = inject(Router);

  // Expose session signals to template
  readonly attempt = this.session.attempt;
  readonly currentQuestion = this.session.currentQuestion;
  readonly currentQuestionIndex = this.session.currentQuestionIndex;
  readonly totalQuestions = this.session.totalQuestions;
  readonly selectedAnswers = this.session.selectedAnswers;
  readonly timeRemaining = this.session.timeRemaining;
  readonly formattedTime = this.session.formattedTime;
  readonly isTimeCritical = this.session.isTimeCritical;
  readonly progress = this.session.progress;
  readonly loading = this.session.loading;
  readonly submitting = this.session.submitting;
  readonly error = this.session.error;
  readonly showFeedback = this.session.showFeedback;
  readonly lastFeedback = this.session.lastFeedback;
  readonly isTrainingMode = this.session.isTrainingMode;
  readonly isExamMode = this.session.isExamMode;
  readonly isLastQuestion = this.session.isLastQuestion;
  readonly canSubmitAnswer = this.session.canSubmitAnswer;

  // UI State
  showQuestionNav = false;

  // Timer progress for the ring (0-100)
  timerProgress = computed(() => {
    const attempt = this.attempt();
    const timeRemaining = this.timeRemaining();
    
    if (!attempt?.timeLimit || attempt.timeLimit <= 0) return 100;
    
    // Calculate progress based on time remaining vs total time (in seconds)
    const totalSeconds = attempt.timeLimit * 60; // timeLimit is in minutes
    const progress = (timeRemaining / totalSeconds) * 100;
    return Math.max(0, Math.min(100, progress));
  });

  ngOnInit(): void {
    if (this.attemptId) {
      this.session.loadAttempt(this.attemptId);
    }
  }

  ngOnDestroy(): void {
    // Session persists for potential resume
  }

  isAnswerSelected(answerId: string): boolean {
    return this.selectedAnswers().includes(answerId);
  }

  onSelectAnswer(answerId: string): void {
    if (!this.showFeedback()) {
      this.session.selectAnswer(answerId);
    }
  }

  onSubmitAnswer(): void {
    this.session.submitAnswer();
  }

  onNextQuestion(): void {
    this.session.nextQuestion();
  }

  onPreviousQuestion(): void {
    this.session.previousQuestion();
  }

  onGoToQuestion(index: number): void {
    this.session.goToQuestion(index);
    this.showQuestionNav = false;
  }

  onFinishQuiz(): void {
    if (confirm('Êtes-vous sûr de vouloir terminer le quiz ?')) {
      this.session.finishQuiz();
    }
  }

  onQuitQuiz(): void {
    if (confirm('Êtes-vous sûr de vouloir quitter ? Votre progression sera sauvegardée.')) {
      this.router.navigate(['/quizzes']);
    }
  }

  toggleQuestionNav(): void {
    this.showQuestionNav = !this.showQuestionNav;
  }

  getQuestionTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      SINGLE_CHOICE: 'Choix unique',
      MULTIPLE_CHOICE: 'Choix multiples',
      TRUE_FALSE: 'Vrai / Faux',
      IMAGE: 'Question image'
    };
    return labels[type] || type;
  }

  getAnswerLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }

  getAnswerClass(answerId: string): string {
    const feedback = this.lastFeedback();
    const isSelected = this.isAnswerSelected(answerId);
    
    if (this.showFeedback() && feedback) {
      const isCorrect = feedback.correctAnswerIds.includes(answerId);
      const wasSelected = feedback.selectedAnswerIds.includes(answerId);
      
      if (isCorrect) {
        return 'answer-correct';
      } else if (wasSelected && !isCorrect) {
        return 'answer-incorrect';
      }
    }
    
    return isSelected ? 'answer-selected' : '';
  }
}
