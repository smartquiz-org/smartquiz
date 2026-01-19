import { Injectable, signal, computed, inject, DestroyRef, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, of, interval, takeWhile } from 'rxjs';
import { QuizRepository } from './quiz.repository';
import {
  QuizAttempt,
  Question,
  AnswerResult,
  AttemptMode,
  AttemptStatus
} from '../models';

/**
 * State interface for active Quiz session
 */
interface QuizSessionState {
  attempt: QuizAttempt | null;
  currentQuestionIndex: number;
  selectedAnswers: string[];
  timeRemaining: number; // in seconds
  showFeedback: boolean;
  lastFeedback: AnswerResult | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

const initialState: QuizSessionState = {
  attempt: null,
  currentQuestionIndex: 0,
  selectedAnswers: [],
  timeRemaining: 0,
  showFeedback: false,
  lastFeedback: null,
  loading: false,
  submitting: false,
  error: null
};

/**
 * State Service for Quiz Session (taking a quiz)
 * Manages the active quiz state, timer, and progression
 */
@Injectable({ providedIn: 'root' })
export class QuizSessionService {
  private readonly repository = inject(QuizRepository);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  // Private writable state
  private readonly state = signal<QuizSessionState>(initialState);
  private timerActive = false;

  // Public readonly selectors
  readonly attempt = computed(() => this.state().attempt);
  readonly currentQuestionIndex = computed(() => this.state().currentQuestionIndex);
  readonly selectedAnswers = computed(() => this.state().selectedAnswers);
  readonly timeRemaining = computed(() => this.state().timeRemaining);
  readonly showFeedback = computed(() => this.state().showFeedback);
  readonly lastFeedback = computed(() => this.state().lastFeedback);
  readonly loading = computed(() => this.state().loading);
  readonly submitting = computed(() => this.state().submitting);
  readonly error = computed(() => this.state().error);

  // Derived computed signals
  readonly currentQuestion = computed(() => {
    const attempt = this.attempt();
    const index = this.currentQuestionIndex();
    return attempt?.questions?.[index] ?? null;
  });

  readonly totalQuestions = computed(() => this.attempt()?.totalQuestions ?? 0);

  readonly progress = computed(() => {
    const total = this.totalQuestions();
    const current = this.currentQuestionIndex();
    return total > 0 ? ((current + 1) / total) * 100 : 0;
  });

  readonly isLastQuestion = computed(() => {
    return this.currentQuestionIndex() >= this.totalQuestions() - 1;
  });

  readonly canSubmitAnswer = computed(() => {
    return this.selectedAnswers().length > 0 && !this.submitting();
  });

  readonly isTrainingMode = computed(() => this.attempt()?.mode === 'TRAINING');
  readonly isExamMode = computed(() => this.attempt()?.mode === 'EXAM');

  readonly formattedTime = computed(() => {
    const seconds = this.timeRemaining();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  });

  readonly isTimeCritical = computed(() => {
    const remaining = this.timeRemaining();
    const total = this.attempt()?.timeLimit ?? 0;
    return total > 0 && remaining <= 60; // Last minute
  });

  // Actions
  startQuiz(quizId: string, mode: AttemptMode): void {
    // Reset state before starting new quiz
    this.state.set({
      ...initialState,
      loading: true,
      error: null
    });

    this.repository.startAttempt({ quizId, mode })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ loading: false, error: 'Erreur lors du démarrage du quiz' });
          return of(null);
        })
      )
      .subscribe(attempt => {
        if (attempt) {
          this.updateState({
            attempt,
            currentQuestionIndex: attempt.currentQuestionIndex,
            selectedAnswers: [],
            timeRemaining: attempt.timeLimit - attempt.timeSpent,
            loading: false
          });
          this.startTimer();
          this.router.navigate(['/quiz', attempt.id]);
        }
      });
  }

  loadAttempt(attemptId: string): void {
    this.updateState({ loading: true, error: null, selectedAnswers: [] });

    this.repository.getAttempt(attemptId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ loading: false, error: 'Session non trouvée' });
          return of(null);
        })
      )
      .subscribe(attempt => {
        if (attempt) {
          if (attempt.status === 'COMPLETED') {
            this.router.navigate(['/results', attempt.id]);
            return;
          }
          this.updateState({
            attempt,
            currentQuestionIndex: attempt.currentQuestionIndex,
            selectedAnswers: [],
            timeRemaining: attempt.timeLimit - attempt.timeSpent,
            loading: false,
            showFeedback: false,
            lastFeedback: null
          });
          this.startTimer();
        }
      });
  }

  selectAnswer(answerId: string): void {
    const question = this.currentQuestion();
    if (!question) return;

    let selected = [...this.selectedAnswers()];

    if (question.type === 'MULTIPLE_CHOICE') {
      // Toggle selection for multiple choice
      if (selected.includes(answerId)) {
        selected = selected.filter(id => id !== answerId);
      } else {
        selected.push(answerId);
      }
    } else {
      // Single selection for other types
      selected = [answerId];
    }

    this.updateState({ selectedAnswers: selected });
  }

  submitAnswer(): void {
    const attempt = this.attempt();
    const question = this.currentQuestion();
    if (!attempt || !question || this.selectedAnswers().length === 0) return;

    this.updateState({ submitting: true });

    const timeSpent = this.calculateQuestionTimeSpent();

    this.repository.submitAnswer(attempt.id, {
      questionId: question.id,
      selectedAnswerIds: this.selectedAnswers(),
      timeSpent
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ submitting: false, error: 'Erreur lors de la soumission' });
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          const isTraining = attempt.mode === 'TRAINING';
          const feedback = response.results?.[0] ?? null;

          this.updateState({
            attempt: { ...attempt, score: response.score },
            submitting: false,
            showFeedback: isTraining,
            lastFeedback: feedback
          });

          if (!isTraining) {
            this.nextQuestion();
          }
        }
      });
  }

  nextQuestion(): void {
    const nextIndex = this.currentQuestionIndex() + 1;
    const total = this.totalQuestions();

    if (nextIndex >= total) {
      this.finishQuiz();
    } else {
      this.updateState({
        currentQuestionIndex: nextIndex,
        selectedAnswers: [],
        showFeedback: false,
        lastFeedback: null
      });
    }
  }

  previousQuestion(): void {
    const prevIndex = this.currentQuestionIndex() - 1;
    if (prevIndex >= 0) {
      this.updateState({
        currentQuestionIndex: prevIndex,
        selectedAnswers: [],
        showFeedback: false
      });
    }
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.totalQuestions()) {
      this.updateState({
        currentQuestionIndex: index,
        selectedAnswers: [],
        showFeedback: false
      });
    }
  }

  finishQuiz(): void {
    const attempt = this.attempt();
    if (!attempt) return;

    this.stopTimer();
    this.updateState({ submitting: true });

    this.repository.submitQuiz(attempt.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          this.updateState({ submitting: false, error: 'Erreur lors de la finalisation' });
          return of(null);
        })
      )
      .subscribe(result => {
        if (result) {
          this.updateState({ attempt: result, submitting: false });
          this.router.navigate(['/results', result.id]);
        }
      });
  }

  resetSession(): void {
    this.stopTimer();
    this.state.set(initialState);
  }

  private startTimer(): void {
    if (this.timerActive) return;
    this.timerActive = true;

    interval(1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeWhile(() => this.timerActive && this.timeRemaining() > 0)
      )
      .subscribe(() => {
        const remaining = this.timeRemaining() - 1;
        this.updateState({ timeRemaining: remaining });

        // Auto-submit when time runs out in exam mode
        if (remaining <= 0 && this.isExamMode()) {
          this.finishQuiz();
        }

        // Save progress every 30 seconds
        if (remaining % 30 === 0) {
          this.saveProgress();
        }
      });
  }

  private stopTimer(): void {
    this.timerActive = false;
  }

  private saveProgress(): void {
    const attempt = this.attempt();
    if (!attempt) return;

    const timeSpent = attempt.timeLimit - this.timeRemaining();
    this.repository.saveProgress(attempt.id, timeSpent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private calculateQuestionTimeSpent(): number {
    // Simplified - in a real app, track per-question time
    return 30;
  }

  private updateState(partial: Partial<QuizSessionState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }
}
