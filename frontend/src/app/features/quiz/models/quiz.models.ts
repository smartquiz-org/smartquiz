// Quiz Domain Models

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  quizCount: number;
}

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'IMAGE';
export type AttemptMode = 'TRAINING' | 'EXAM';
export type AttemptStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

export interface QuizSummary {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  difficulty: DifficultyLevel;
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
  type: QuestionType;
  points: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  imageUrl?: string;
  answers: AnswerOption[];
  points: number;
  timeLimit: number;
}

export interface AnswerOption {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface AnswerResult {
  questionId: string;
  questionText: string;
  selectedAnswerIds: string[];
  correctAnswerIds: string[];
  correct: boolean;
  pointsEarned: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  mode: AttemptMode;
  status: AttemptStatus;
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
  questions?: Question[];
  results?: AnswerResult[];
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

// API Request/Response types
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
  mode: AttemptMode;
}

export interface SubmitAnswerRequest {
  questionId: string;
  selectedAnswerIds: string[];
  timeSpent: number;
}
