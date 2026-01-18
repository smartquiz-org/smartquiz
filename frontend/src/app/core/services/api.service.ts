import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

// DTOs matching backend
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  quizCount: number;
}

export interface QuizSummary {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  questionCount: number;
  timeLimit: number;
  imageUrl?: string;
  tags: string[];
  attemptCount: number;
  averageScore: number;
}

export interface QuizDetail extends QuizSummary {
  totalPoints: number;
  passingScore: number;
  questions: QuestionPreview[];
}

export interface QuestionPreview {
  id: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'IMAGE';
  points: number;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface StartAttemptRequest {
  quizId: string;
  mode: 'TRAINING' | 'EXAM';
}

export interface SubmitAnswerRequest {
  questionId: string;
  selectedAnswerIds: string[];
  timeSpent: number;
}

export interface QuestionDto {
  id: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'IMAGE';
  text: string;
  imageUrl?: string;
  answers: AnswerOptionDto[];
  points: number;
  timeLimit: number;
}

export interface AnswerOptionDto {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface AnswerResultDto {
  questionId: string;
  questionText: string;
  selectedAnswerIds: string[];
  correctAnswerIds: string[];
  correct: boolean;
  pointsEarned: number;
  explanation: string;
}

export interface AttemptDto {
  id: string;
  quizId: string;
  quizTitle: string;
  mode: 'TRAINING' | 'EXAM';
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  timeLimit: number;
  startedAt: string;
  completedAt?: string;
  questions?: QuestionDto[];
  results?: AnswerResultDto[];
}

export interface UserStats {
  id: string;
  userId: string;
  totalQuizzesCompleted: number;
  totalQuizzesStarted: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  totalTimeSpent: number;
  averageScore: number;
  categoryStats: Record<string, CategoryStats>;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt?: string;
}

export interface CategoryStats {
  categoryId: string;
  categoryName: string;
  quizzesCompleted: number;
  correctAnswers: number;
  totalQuestions: number;
  averageScore: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/api/v1/categories`).pipe(
      catchError(err => {
        console.error('Error fetching categories:', err);
        return of([]);
      })
    );
  }

  // Quizzes
  getQuizzes(
    categoryId?: string,
    difficulty?: string,
    search?: string,
    page = 0,
    size = 12,
    sortBy = 'createdAt',
    sortDir = 'desc'
  ): Observable<Page<QuizSummary>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (categoryId) params = params.set('categoryId', categoryId);
    if (difficulty) params = params.set('difficulty', difficulty);
    if (search) params = params.set('search', search);

    return this.http.get<Page<QuizSummary>>(`${this.baseUrl}/api/v1/quizzes`, { params }).pipe(
      catchError(err => {
        console.error('Error fetching quizzes:', err);
        return of({ content: [], totalElements: 0, totalPages: 0, size, number: page, first: true, last: true });
      })
    );
  }

  getQuizById(id: string): Observable<QuizDetail | null> {
    return this.http.get<QuizDetail>(`${this.baseUrl}/api/v1/quizzes/${id}`).pipe(
      catchError(err => {
        console.error('Error fetching quiz:', err);
        return of(null);
      })
    );
  }

  getPopularQuizzes(): Observable<QuizSummary[]> {
    return this.http.get<QuizSummary[]>(`${this.baseUrl}/api/v1/quizzes/popular`).pipe(
      catchError(err => {
        console.error('Error fetching popular quizzes:', err);
        return of([]);
      })
    );
  }

  // Attempts
  startAttempt(request: StartAttemptRequest): Observable<AttemptDto> {
    return this.http.post<AttemptDto>(`${this.baseUrl}/api/v1/attempts`, request);
  }

  getAttempt(attemptId: string): Observable<AttemptDto> {
    return this.http.get<AttemptDto>(`${this.baseUrl}/api/v1/attempts/${attemptId}`);
  }

  submitAnswer(attemptId: string, request: SubmitAnswerRequest): Observable<AttemptDto> {
    return this.http.post<AttemptDto>(`${this.baseUrl}/api/v1/attempts/${attemptId}/answers`, request);
  }

  submitQuiz(attemptId: string): Observable<AttemptDto> {
    return this.http.post<AttemptDto>(`${this.baseUrl}/api/v1/attempts/${attemptId}/submit`, {});
  }

  saveProgress(attemptId: string, timeSpent: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/api/v1/attempts/${attemptId}/progress`, { timeSpent });
  }

  getHistory(page = 0, size = 10): Observable<Page<AttemptDto>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<AttemptDto>>(`${this.baseUrl}/api/v1/attempts/history`, { params }).pipe(
      catchError(err => {
        console.error('Error fetching history:', err);
        return of({ content: [], totalElements: 0, totalPages: 0, size, number: page, first: true, last: true });
      })
    );
  }

  // Stats
  getDashboardStats(): Observable<UserStats | null> {
    return this.http.get<UserStats>(`${this.baseUrl}/api/v1/stats/dashboard`).pipe(
      catchError(err => {
        console.error('Error fetching dashboard stats:', err);
        return of(null);
      })
    );
  }

  getCategoryStats(): Observable<Record<string, CategoryStats>> {
    return this.http.get<Record<string, CategoryStats>>(`${this.baseUrl}/api/v1/stats/categories`).pipe(
      catchError(err => {
        console.error('Error fetching category stats:', err);
        return of({});
      })
    );
  }
}
