
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CONCEPT_COACH = 'CONCEPT_COACH',
  EXAM_ARENA = 'EXAM_ARENA',
  CREATOR_STUDIO = 'CREATOR_STUDIO',
  ECO_TRACKER = 'ECO_TRACKER',
  LEARNING_PATH = 'LEARNING_PATH',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  ADMIN_FAQ = 'ADMIN_FAQ',
  ADMIN_RESOURCES = 'ADMIN_RESOURCES',
}

export enum CoachMode {
  LEARNING = 'LEARNING',
  ANSWER = 'ANSWER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'student' | 'admin';
  avatar?: string;
  examStreak?: number;
  ecoImpactStreak?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  audioData?: string; // base64
  imageData?: string; // base64 for generated images
  isAudio?: boolean;
  timestamp: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number; // For internal checking, though AI will validate
  explanation?: string;
}

export interface StudyBot {
  id: string;
  name: string;
  subject: string;
  personality: string;
  icon: string;
}

export enum Language {
  ENGLISH = 'English',
  HINDI = 'Hindi',
  HINGLISH = 'Hinglish',
  TAMIL = 'Tamil',
  TELUGU = 'Telugu',
  URDU = 'Urdu',
}

export interface LearningNode {
  id: string;
  title: string;
  description: string;
  status: 'LOCKED' | 'UNLOCKED' | 'IN_PROGRESS' | 'MASTERED';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rationale: string; // Why this node was assigned (Explainable AI)
}

export interface TeacherInsight {
  topic: string;
  avgScore: number;
  difficultyLevel: string;
  recommendation: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: string;
  status: 'At Risk' | 'Stable' | 'Excelling';
}

export interface AIInsight {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
}

// --- Dashboard Analytics Types ---

export interface WeeklyMetric {
  day: string;
  hours: number;
}

export interface SyllabusMetric {
  name: string;
  value: number;
  color: string;
}

export interface DashboardStats {
  topicsMastered: number;
  studyHours: number;
  avgScore: number;
  weakAreas: number;
  weeklyActivity: WeeklyMetric[];
  syllabusProgress: SyllabusMetric[];
  aiInsights?: AIInsight[];
}