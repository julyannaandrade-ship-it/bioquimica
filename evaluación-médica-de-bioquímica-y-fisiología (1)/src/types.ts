export interface Question {
  id: number;
  blockId: number;
  blockTitle: string;
  questionNumber: number;
  questionText: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  tags: string[];
  difficulty: 'Fácil' | 'Medio' | 'Avanzado';
}

export interface QuizBlock {
  id: number;
  title: string;
  description: string;
  iconName: string;
  questionCount: number;
}

export interface UserAnswer {
  questionId: number;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  timeTakenSeconds: number;
  flagged: boolean;
}

export interface QuizSession {
  id: string;
  mode: 'block' | 'full' | 'custom';
  blockId?: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, UserAnswer>;
  startTime: number;
  endTime?: number;
  isCompleted: boolean;
  studentName?: string;
}

export interface StudentAttempt {
  id: string;
  studentName: string;
  studentEmail: string;
  date: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  blockScores: Record<number, { correct: number; total: number; percent: number }>;
  answers: Record<number, { selected: 'A' | 'B' | 'C' | 'D'; correct: boolean }>;
}

export interface ClassMetrics {
  totalAttempts: number;
  averageScorePercent: number;
  averageTimeMinutes: number;
  passingRatePercent: number;
  blockPerformance: {
    blockId: number;
    title: string;
    averagePercent: number;
    totalAttempts: number;
  }[];
  mostFailedQuestions: {
    questionId: number;
    questionText: string;
    blockTitle: string;
    failureRatePercent: number;
    commonWrongOption: string;
  }[];
}
