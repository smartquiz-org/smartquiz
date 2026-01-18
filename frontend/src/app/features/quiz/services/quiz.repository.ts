import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Category,
  QuizSummary,
  QuizDetail,
  QuizAttempt,
  UserStats,
  CategoryStats,
  Page,
  StartAttemptRequest,
  SubmitAnswerRequest,
  DifficultyLevel
} from '../models';

/**
 * Repository for Quiz-related API calls
 * Follows the Repository Pattern - abstracts data access logic
 * Single Responsibility: Only handles HTTP communication
 */
@Injectable({ providedIn: 'root' })
export class QuizRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/api/v1/categories`);
  }

  // Quizzes
  getQuizzes(
    params: {
      categoryId?: string;
      difficulty?: DifficultyLevel;
      search?: string;
      page?: number;
      size?: number;
      sortBy?: string;
      sortDir?: string;
    } = {}
  ): Observable<Page<QuizSummary>> {
    let httpParams = new HttpParams()
      .set('page', (params.page ?? 0).toString())
      .set('size', (params.size ?? 12).toString())
      .set('sortBy', params.sortBy ?? 'createdAt')
      .set('sortDir', params.sortDir ?? 'desc');

    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params.difficulty) httpParams = httpParams.set('difficulty', params.difficulty);
    if (params.search) httpParams = httpParams.set('search', params.search);

    return this.http.get<Page<QuizSummary>>(`${this.baseUrl}/api/v1/quizzes`, { params: httpParams });
  }

  getQuizById(id: string): Observable<QuizDetail> {
    return this.http.get<QuizDetail>(`${this.baseUrl}/api/v1/quizzes/${id}`);
  }

  getPopularQuizzes(): Observable<QuizSummary[]> {
    return this.http.get<QuizSummary[]>(`${this.baseUrl}/api/v1/quizzes/popular`);
  }

  // Attempts
  startAttempt(request: StartAttemptRequest): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(`${this.baseUrl}/api/v1/attempts`, request);
  }

  getAttempt(attemptId: string): Observable<QuizAttempt> {
    return this.http.get<QuizAttempt>(`${this.baseUrl}/api/v1/attempts/${attemptId}`);
  }

  submitAnswer(attemptId: string, request: SubmitAnswerRequest): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(`${this.baseUrl}/api/v1/attempts/${attemptId}/answers`, request);
  }

  submitQuiz(attemptId: string): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(`${this.baseUrl}/api/v1/attempts/${attemptId}/submit`, {});
  }

  saveProgress(attemptId: string, timeSpent: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/api/v1/attempts/${attemptId}/progress`, { timeSpent });
  }

  getHistory(page = 0, size = 10): Observable<Page<QuizAttempt>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<QuizAttempt>>(`${this.baseUrl}/api/v1/attempts/history`, { params });
  }

  // Stats
  getDashboardStats(): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.baseUrl}/api/v1/stats/dashboard`);
  }

  getCategoryStats(): Observable<Record<string, CategoryStats>> {
    return this.http.get<Record<string, CategoryStats>>(`${this.baseUrl}/api/v1/stats/categories`);
  }
}
