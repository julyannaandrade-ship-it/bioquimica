import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { MathText } from './MathText';

interface QuestionCardProps {
  question: Question;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  onSelectOption: (option: 'A' | 'B' | 'C' | 'D') => void;
  isAnswered: boolean;
  flagged: boolean;
  onToggleFlag: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
  isAnswered,
  flagged,
  onToggleFlag,
}) => {
  const [showExplanation, setShowExplanation] = useState<boolean>(isAnswered);

  // When question changes or answered status changes, auto show explanation if answered
  React.useEffect(() => {
    if (isAnswered) {
      setShowExplanation(true);
    } else {
      setShowExplanation(false);
    }
  }, [isAnswered, question.id]);

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg transition-all">
      
      {/* Question Header & Meta */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            Pregunta {question.questionNumber}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Dificultad: {question.difficulty}
          </span>
        </div>

        <button
          onClick={onToggleFlag}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
            flagged
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          title="Marcar pregunta para revisar luego"
        >
          <svg className={`w-4 h-4 ${flagged ? 'fill-current' : 'none'}`} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="hidden sm:inline">{flagged ? 'Marcada' : 'Marcar'}</span>
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
          <MathText text={question.questionText} />
        </h3>
      </div>

      {/* Options List A, B, C, D */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt.letter;
          const isThisCorrectOption = opt.letter === question.correctAnswer;

          let optionStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70 text-slate-800 dark:text-slate-200 hover:border-teal-500/60 hover:bg-teal-50/30 dark:hover:bg-slate-800';
          let badgeStyle = 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

          if (isAnswered) {
            if (isThisCorrectOption) {
              optionStyle = 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/30';
              badgeStyle = 'bg-emerald-500 text-slate-950 font-bold';
            } else if (isSelected && !isThisCorrectOption) {
              optionStyle = 'bg-rose-500/10 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 font-semibold';
              badgeStyle = 'bg-rose-500 text-white font-bold';
            } else {
              optionStyle = 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
              badgeStyle = 'bg-slate-200 dark:bg-slate-800 text-slate-400';
            }
          } else if (isSelected) {
            optionStyle = 'bg-teal-500/10 dark:bg-teal-950/50 border-teal-500 text-teal-900 dark:text-teal-200 font-semibold shadow-md';
            badgeStyle = 'bg-teal-500 text-slate-950 font-bold';
          }

          return (
            <button
              key={opt.letter}
              disabled={isAnswered}
              onClick={() => onSelectOption(opt.letter)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3.5 ${optionStyle}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 transition-colors ${badgeStyle}`}>
                {opt.letter}
              </span>
              <span className="text-sm sm:text-base pt-0.5 leading-relaxed">
                <MathText text={opt.text} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback Banner & Explanation View */}
      {isAnswered && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {/* Feedback Badge */}
            <div
              className={`p-4 rounded-2xl border mb-4 flex items-center justify-between ${
                isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white ${
                    isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                >
                  {isCorrect ? '✓' : '✕'}
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                  </h4>
                  <p className="text-xs opacity-90">
                    {isCorrect
                      ? 'Excelente razonamiento bioquímico.'
                      : `La opción correcta es la ${question.correctAnswer}.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-colors"
              >
                {showExplanation ? 'Ocultar explicación' : 'Ver explicación'}
              </button>
            </div>

            {/* Explanation Content */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-teal-500/5 dark:bg-teal-950/20 border border-teal-500/20 text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Explicación Bioquímica Detallada</span>
                </div>

                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <MathText text={question.explanation} />
                </p>

                {question.tags.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-teal-500/10 flex flex-wrap gap-1.5">
                    {question.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
};
