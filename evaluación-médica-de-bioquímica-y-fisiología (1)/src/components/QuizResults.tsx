import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { QuizSession, Question, UserAnswer } from '../types';
import { QUIZ_BLOCKS } from '../data/questions';
import { MathText } from './MathText';

interface QuizResultsProps {
  session: QuizSession;
  studentName: string;
  onRestart: () => void;
  onRetryFailed?: (failedQuestionIds: number[]) => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  session,
  studentName,
  onRestart,
  onRetryFailed,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');

  const totalQuestions = session.questions.length;
  const answersList = Object.values(session.answers) as UserAnswer[];
  const correctAnswersCount = answersList.filter((a) => a.isCorrect).length;
  const scorePercent = Math.round((correctAnswersCount / totalQuestions) * 100);

  // Trigger celebration confetti if score >= 70%
  useEffect(() => {
    if (scorePercent >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [scorePercent]);

  // Calculate score breakdown by block
  const blockPerformance = QUIZ_BLOCKS.map((block) => {
    const blockQuestions = session.questions.filter((q) => q.blockId === block.id);
    if (blockQuestions.length === 0) return null;

    const blockCorrect = blockQuestions.filter((q) => session.answers[q.id]?.isCorrect).length;
    const blockPercent = Math.round((blockCorrect / blockQuestions.length) * 100);

    return {
      blockId: block.id,
      title: block.title,
      total: blockQuestions.length,
      correct: blockCorrect,
      percent: blockPercent,
    };
  }).filter(Boolean);

  // Determine feedback evaluation message
  let evaluationGrade = {
    title: 'Sobresaliente',
    badgeColor: 'bg-emerald-500 text-slate-950',
    description: 'Demuestras un dominio profundo de la fisiología digestiva, ciclo de la urea, homeostasis del hierro y ruta biosintética del hemo.',
  };

  if (scorePercent < 60) {
    evaluationGrade = {
      title: 'Necesita Repaso',
      badgeColor: 'bg-rose-500 text-white',
      description: 'Te recomendamos revisar las explicaciones detalladas por bloque, especialmente los mecanismos de regulación de ALAS, la hepcidina y la toxicidad por amoníaco.',
    };
  } else if (scorePercent < 80) {
    evaluationGrade = {
      title: 'Aprobado Satisfactorio',
      badgeColor: 'bg-teal-500 text-slate-950',
      description: 'Buen desempeño general. Revisa los conceptos claves señalados en rojo para consolidar tu conocimiento clínico.',
    };
  }

  // Filter questions for detailed list
  const failedQuestionIds = session.questions
    .filter((q) => session.answers[q.id] && !session.answers[q.id].isCorrect)
    .map((q) => q.id);

  const filteredQuestions = session.questions.filter((q) => {
    const ans = session.answers[q.id];
    if (filterMode === 'correct') return ans?.isCorrect;
    if (filterMode === 'incorrect') return ans && !ans.isCorrect;
    if (filterMode === 'flagged') return ans?.flagged;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
      
      {/* Score Summary Header Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold mb-3">
              <span>Informe Oficial de Evaluación</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              Resultados de {studentName || 'Alumno'}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mb-4">
              Bioquímica y Fisiología Médica • Cátedra 2026
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${evaluationGrade.badgeColor}`}>
                {evaluationGrade.title}
              </span>

              <span className="text-xs text-slate-300 font-medium bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                {correctAnswersCount} de {totalQuestions} correctas
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl">
              {evaluationGrade.description}
            </p>
          </div>

          {/* Big Score Gauge Badge */}
          <div className="flex flex-col items-center justify-center bg-slate-800/90 border border-slate-700 p-6 rounded-3xl min-w-[180px] shadow-lg">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-teal-400 to-emerald-300">
              {scorePercent}%
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Puntaje Final</span>
          </div>
        </div>
      </motion.div>

      {/* Breakdown by Block */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Rendimiento por Bloque Temático</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blockPerformance.map((block) => (
            <div key={block!.blockId} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  Bloque {block!.blockId}
                </span>
                <span className={`text-xs font-bold ${block!.percent >= 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {block!.percent}%
                </span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${block!.percent >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ width: `${block!.percent}%` }}
                ></div>
              </div>

              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {block!.correct} de {block!.total} acertadas
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Question Review Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Revisión Detallada de Preguntas
            </h2>
            <p className="text-xs text-slate-500">
              Examina la respuesta seleccionada, la respuesta correcta y la explicación bioquímica
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Todas ({totalQuestions})
            </button>

            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterMode === 'incorrect'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-rose-500'
              }`}
            >
              Erradas ({totalQuestions - correctAnswersCount})
            </button>

            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterMode === 'correct'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-emerald-500'
              }`}
            >
              Correctas ({correctAnswersCount})
            </button>
          </div>
        </div>

        {/* Retry Failed Questions Button if applicable */}
        {failedQuestionIds.length > 0 && onRetryFailed && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                !
              </span>
              <div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  ¿Quieres corregir tus fallos?
                </h4>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80">
                  Tienes {failedQuestionIds.length} preguntas erradas para volver a responder.
                </p>
              </div>
            </div>

            <button
              onClick={() => onRetryFailed(failedQuestionIds)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md whitespace-nowrap"
            >
              Reintentar Errores
            </button>
          </div>
        )}

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q: Question) => {
            const ans = session.answers[q.id];
            const isCorrect = ans?.isCorrect;
            const selectedOpt = ans?.selectedOption;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10'
                    : 'border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    P{q.questionNumber} • {q.blockTitle.split(':')[0]}
                  </span>

                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {isCorrect ? 'Correcta' : 'Incorrecta'}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 leading-snug">
                  <MathText text={q.questionText} />
                </h3>

                {/* Option summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                  <div className={`p-2.5 rounded-xl border ${selectedOpt === q.correctAnswer ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold' : 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200 font-semibold'}`}>
                    <span className="text-[10px] block text-slate-500 dark:text-slate-400 font-normal">Tu respuesta:</span>
                    {selectedOpt ? `Opción ${selectedOpt}` : 'No respondida'}
                  </div>

                  <div className="p-2.5 rounded-xl border border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold">
                    <span className="text-[10px] block text-slate-500 dark:text-slate-400 font-normal">Respuesta correcta:</span>
                    Opción {q.correctAnswer}
                  </div>
                </div>

                {/* Explanation text */}
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
                  <strong className="text-teal-600 dark:text-teal-400 block mb-1">Fundamento bioquímico:</strong>
                  <MathText text={q.explanation} />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-slate-900 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Volver al Menú Principal</span>
        </button>

        <p className="text-xs text-slate-400 text-center sm:text-right">
          Resultados guardados automáticamente para la supervisión docente.
        </p>
      </div>

    </div>
  );
};
