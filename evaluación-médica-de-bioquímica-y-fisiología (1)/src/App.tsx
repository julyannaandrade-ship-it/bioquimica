/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BlockSelection } from './components/BlockSelection';
import { QuizEngine } from './components/QuizEngine';
import { QuizResults } from './components/QuizResults';
import { DocentePanel } from './components/DocentePanel';
import { QUESTIONS, MOCK_STUDENT_ATTEMPTS } from './data/questions';
import { QuizSession, StudentAttempt, Question } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<'student' | 'teacher'>('student');
  const [studentName, setStudentName] = useState<string>('');
  const [attempts, setAttempts] = useState<StudentAttempt[]>(MOCK_STUDENT_ATTEMPTS);
  const [historyBlockScores, setHistoryBlockScores] = useState<Record<number, number>>({});
  
  // Current session state
  const [activeSession, setActiveSession] = useState<QuizSession | null>(null);

  // Start new quiz session
  const handleStartQuiz = (mode: 'block' | 'full', blockId?: number) => {
    let sessionQuestions: Question[] = [];

    if (mode === 'block' && blockId) {
      sessionQuestions = QUESTIONS.filter((q) => q.blockId === blockId);
    } else {
      sessionQuestions = [...QUESTIONS];
    }

    const newSession: QuizSession = {
      id: `session-${Date.now()}`,
      mode,
      blockId,
      questions: sessionQuestions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      isCompleted: false,
      studentName,
    };

    setActiveSession(newSession);
  };

  // Retry only failed questions from previous attempt
  const handleRetryFailed = (failedQuestionIds: number[]) => {
    const failedQuestions = QUESTIONS.filter((q) => failedQuestionIds.includes(q.id));
    
    const retrySession: QuizSession = {
      id: `session-retry-${Date.now()}`,
      mode: 'custom',
      questions: failedQuestions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      isCompleted: false,
      studentName,
    };

    setActiveSession(retrySession);
  };

  // Update ongoing session state
  const handleUpdateSession = (updatedSession: QuizSession) => {
    setActiveSession(updatedSession);
  };

  // Complete session and calculate student attempt
  const handleFinishQuiz = (completedSession: QuizSession) => {
    setActiveSession(completedSession);

    const totalQ = completedSession.questions.length;
    const correctCount = Object.values(completedSession.answers).filter((a) => a.isCorrect).length;
    const scorePercent = Math.round((correctCount / totalQ) * 100);
    const timeSpent = Math.max(15, Math.round((Date.now() - completedSession.startTime) / 1000));

    // Calculate block score map
    const blockScores: Record<number, { correct: number; total: number; percent: number }> = {};
    
    completedSession.questions.forEach((q) => {
      if (!blockScores[q.blockId]) {
        blockScores[q.blockId] = { correct: 0, total: 0, percent: 0 };
      }
      blockScores[q.blockId].total += 1;
      if (completedSession.answers[q.id]?.isCorrect) {
        blockScores[q.blockId].correct += 1;
      }
    });

    Object.keys(blockScores).forEach((bId) => {
      const numB = Number(bId);
      const b = blockScores[numB];
      b.percent = Math.round((b.correct / b.total) * 100);
      
      // Update history
      setHistoryBlockScores((prev) => ({
        ...prev,
        [numB]: b.percent,
      }));
    });

    // Save student attempt to teacher log
    const answersRecord: Record<number, { selected: 'A' | 'B' | 'C' | 'D'; correct: boolean }> = {};
    Object.entries(completedSession.answers).forEach(([qIdStr, ans]) => {
      if (ans.selectedOption) {
        answersRecord[Number(qIdStr)] = {
          selected: ans.selectedOption,
          correct: ans.isCorrect,
        };
      }
    });

    const newAttempt: StudentAttempt = {
      id: `att-${Date.now()}`,
      studentName: studentName || 'Estudiante Anónimo',
      studentEmail: `${(studentName || 'estudiante').toLowerCase().replace(/\s+/g, '.')}@estudiante.med.edu`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      scorePercent,
      correctCount,
      totalQuestions: totalQ,
      timeSpentSeconds: timeSpent,
      blockScores,
      answers: answersRecord,
    };

    setAttempts((prev) => [newAttempt, ...prev]);
  };

  // Teacher simulation trigger
  const handleSimulateAttempt = () => {
    const names = ['Dr. Ignacio Rossi', 'Dra. Valentina Castro', 'Lucas Maidana', 'Dra. Elena Peralta'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomScore = 65 + Math.floor(Math.random() * 32); // 65-97%
    const correctC = Math.round((randomScore / 30) * 30);

    const simAttempt: StudentAttempt = {
      id: `att-sim-${Date.now()}`,
      studentName: randomName,
      studentEmail: `${randomName.toLowerCase().replace(/[^a-z]/g, '')}@estudiante.med.edu`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      scorePercent: randomScore,
      correctCount: correctC,
      totalQuestions: 30,
      timeSpentSeconds: 900 + Math.floor(Math.random() * 800),
      blockScores: {
        1: { correct: 4, total: 5, percent: 80 },
        2: { correct: 5, total: 6, percent: 83 },
        3: { correct: 6, total: 7, percent: 86 },
        4: { correct: 5, total: 6, percent: 83 },
        5: { correct: 5, total: 6, percent: 83 },
      },
      answers: {},
    };

    setAttempts((prev) => [simAttempt, ...prev]);
  };

  const handleClearAttempts = () => {
    setAttempts([]);
  };

  const handleExitSession = () => {
    setActiveSession(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-teal-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        studentName={studentName}
        setStudentName={setStudentName}
        activeSessionExists={!!activeSession}
        onResetQuiz={handleExitSession}
      />

      {/* Main View Area */}
      <main className="pb-16">
        {viewMode === 'teacher' ? (
          <DocentePanel
            attempts={attempts}
            onSimulateAttempt={handleSimulateAttempt}
            onClearAttempts={handleClearAttempts}
          />
        ) : activeSession ? (
          activeSession.isCompleted ? (
            <QuizResults
              session={activeSession}
              studentName={studentName}
              onRestart={handleExitSession}
              onRetryFailed={handleRetryFailed}
            />
          ) : (
            <QuizEngine
              session={activeSession}
              onUpdateSession={handleUpdateSession}
              onFinishQuiz={handleFinishQuiz}
              onExit={handleExitSession}
            />
          )
        ) : (
          <BlockSelection
            onStartQuiz={handleStartQuiz}
            studentName={studentName}
            setStudentName={setStudentName}
            historyScores={historyBlockScores}
          />
        )}
      </main>

    </div>
  );
}
