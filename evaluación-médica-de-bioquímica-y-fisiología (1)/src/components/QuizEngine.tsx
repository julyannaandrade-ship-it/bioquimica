import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, QuizSession, UserAnswer } from '../types';
import { QuestionCard } from './QuestionCard';

interface QuizEngineProps {
  session: QuizSession;
  onUpdateSession: (session: QuizSession) => void;
  onFinishQuiz: (completedSession: QuizSession) => void;
  onExit: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  session,
  onUpdateSession,
  onFinishQuiz,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(session.currentQuestionIndex || 0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showConfirmFinish, setShowConfirmFinish] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion: Question = session.questions[currentIndex];
  const currentAnswer: UserAnswer | undefined = session.answers[currentQuestion.id];

  const totalQuestions = session.questions.length;
  const answeredCount = (Object.values(session.answers) as UserAnswer[]).filter((a) => a.selectedOption !== null).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Format timer MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle option select
  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    const isCorrect = option === currentQuestion.correctAnswer;
    const updatedAnswers = {
      ...session.answers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        selectedOption: option,
        isCorrect,
        timeTakenSeconds: (currentAnswer?.timeTakenSeconds || 0) + 10,
        flagged: currentAnswer?.flagged || false,
      },
    };

    const updatedSession: QuizSession = {
      ...session,
      answers: updatedAnswers,
      currentQuestionIndex: currentIndex,
    };

    onUpdateSession(updatedSession);
  };

  // Handle flag toggle
  const handleToggleFlag = () => {
    const existing = session.answers[currentQuestion.id] || {
      questionId: currentQuestion.id,
      selectedOption: null,
      isCorrect: false,
      timeTakenSeconds: 0,
      flagged: false,
    };

    const updatedAnswers = {
      ...session.answers,
      [currentQuestion.id]: {
        ...existing,
        flagged: !existing.flagged,
      },
    };

    onUpdateSession({
      ...session,
      answers: updatedAnswers,
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowConfirmFinish(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleConfirmFinish = () => {
    const finalSession: QuizSession = {
      ...session,
      endTime: Date.now(),
      isCompleted: true,
    };
    onFinishQuiz(finalSession);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
      
      {/* Top Session Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20">
            {session.mode === 'full' ? 'Examen Completo' : currentQuestion.blockTitle}
          </span>
          <h2 className="text-sm sm:text-base font-bold mt-1 text-slate-100">
            Pregunta {currentIndex + 1} de {totalQuestions}
          </h2>
        </div>

        {/* Progress & Timer */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Tiempo</span>
            <span className="text-sm font-mono font-bold text-teal-400">{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="text-right min-w-[80px]">
            <span className="text-xs text-slate-400 block">Progreso</span>
            <span className="text-sm font-bold text-emerald-400">{answeredCount}/{totalQuestions} ({progressPercent}%)</span>
          </div>

          <button
            onClick={onExit}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Salir al menú de bloques"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Strip Navigation */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {session.questions.map((q, idx) => {
          const ans = session.answers[q.id];
          const isCurrent = idx === currentIndex;
          const isAnswered = ans && ans.selectedOption !== null;
          const isFlagged = ans && ans.flagged;

          let btnBg = 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
          if (isCurrent) {
            btnBg = 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-lg shadow-teal-500/20';
          } else if (isAnswered) {
            btnBg = ans.isCorrect
              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40';
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center ${btnBg}`}
            >
              {idx + 1}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Question Animated Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <QuestionCard
            question={currentQuestion}
            selectedOption={currentAnswer?.selectedOption || null}
            onSelectOption={handleSelectOption}
            isAnswered={!!currentAnswer?.selectedOption}
            flagged={!!currentAnswer?.flagged}
            onToggleFlag={handleToggleFlag}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
              : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Anterior</span>
        </button>

        <div className="flex items-center space-x-3">
          {answeredCount === totalQuestions && (
            <button
              onClick={() => setShowConfirmFinish(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
            >
              <span>Ver Resultados Finales</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center space-x-2"
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Finalizar' : 'Siguiente'}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirmation Modal before submitting */}
      {showConfirmFinish && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-slate-900 dark:text-slate-100"
          >
            <h3 className="text-xl font-bold mb-2">¿Finalizar la evaluación?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Has respondido <strong className="text-teal-500">{answeredCount}</strong> de <strong>{totalQuestions}</strong> preguntas. Recibirás tu informe detallado de resultados y rendimiento por bloque temático.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmFinish(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Seguir respondiendo
              </button>
              <button
                onClick={handleConfirmFinish}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Ver Informe Final
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
