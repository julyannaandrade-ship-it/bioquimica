import React from 'react';
import { motion } from 'motion/react';
import { QUIZ_BLOCKS } from '../data/questions';
import { QuizBlock } from '../types';

interface BlockSelectionProps {
  onStartQuiz: (mode: 'block' | 'full', blockId?: number) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  historyScores?: Record<number, number>;
}

export const BlockSelection: React.FC<BlockSelectionProps> = ({
  onStartQuiz,
  studentName,
  setStudentName,
  historyScores = {},
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl text-white"
      >
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span>Evaluación Médica de Múltiple Opción</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Módulos de Bioquímica y Metabolismo Humano
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Selecciona un bloque temático para resolver sus preguntas con **retroalimentación inmediata** y **explicación bioquímica detallada** después de responder. Al finalizar, obtendrás un reporte detallado.
          </p>

          {/* Student Name Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
            <div className="flex-1 flex items-center space-x-3 px-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ingresa tu nombre y apellido para el certificado..."
                className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none w-full font-medium"
              />
            </div>

            <button
              onClick={() => onStartQuiz('full')}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <span>Examen Completo (30 Preguntas)</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>
      </motion.div>

      {/* Block Cards Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Bloques Temáticos Disponibles
          </h2>
          <p className="text-xs text-slate-500">
            Selecciona el bloque temático que deseas evaluar individualmente
          </p>
        </div>
        
        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          5 Bloques • 30 Preguntas Totales
        </span>
      </div>

      {/* Grid of 5 Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUIZ_BLOCKS.map((block: QuizBlock, index: number) => {
          const score = historyScores[block.id];
          return (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold text-sm flex items-center justify-center border border-teal-200 dark:border-teal-800">
                    0{block.id}
                  </span>
                  
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {block.questionCount} preguntas
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-2">
                  {block.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {block.description}
                </p>
              </div>

              <div>
                {/* Score badge if previously attempted */}
                {score !== undefined && (
                  <div className="mb-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between font-medium">
                    <span>Último resultado:</span>
                    <span className="font-bold">{score}%</span>
                  </div>
                )}

                <button
                  onClick={() => onStartQuiz('block', block.id)}
                  className="w-full bg-slate-900 hover:bg-teal-600 text-white dark:bg-slate-800 dark:hover:bg-teal-500 font-medium py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Iniciar Bloque {block.id}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
