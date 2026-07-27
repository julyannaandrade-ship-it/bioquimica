import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { QUESTIONS, QUIZ_BLOCKS, MOCK_STUDENT_ATTEMPTS } from '../data/questions';
import { StudentAttempt, Question } from '../types';
import { MathText } from './MathText';

interface DocentePanelProps {
  attempts: StudentAttempt[];
  onSimulateAttempt: () => void;
  onClearAttempts: () => void;
}

export const DocentePanel: React.FC<DocentePanelProps> = ({
  attempts = MOCK_STUDENT_ATTEMPTS,
  onSimulateAttempt,
  onClearAttempts,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'questionBank'>('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<StudentAttempt | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlockFilter, setSelectedBlockFilter] = useState<number | 'all'>('all');

  const totalAttemptsCount = attempts.length;
  const avgScore = totalAttemptsCount > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.scorePercent, 0) / totalAttemptsCount)
    : 0;

  const avgTimeMinutes = totalAttemptsCount > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.timeSpentSeconds / 60), 0) / totalAttemptsCount)
    : 0;

  // Block Performance chart data
  const blockDataChart = QUIZ_BLOCKS.map((block) => {
    let totalScoreInBlock = 0;
    let countInBlock = 0;

    attempts.forEach((att) => {
      if (att.blockScores && att.blockScores[block.id]) {
        totalScoreInBlock += att.blockScores[block.id].percent;
        countInBlock += 1;
      }
    });

    const averagePercent = countInBlock > 0 ? Math.round(totalScoreInBlock / countInBlock) : 0;

    return {
      name: `Bloque ${block.id}`,
      fullTitle: block.title,
      promedio: averagePercent,
    };
  });

  // Calculate most failed questions across all attempts
  const questionFailureStats = QUESTIONS.map((q) => {
    let fails = 0;
    let totalEvaluated = 0;

    attempts.forEach((att) => {
      if (att.answers[q.id]) {
        totalEvaluated += 1;
        if (!att.answers[q.id].correct) {
          fails += 1;
        }
      }
    });

    const failureRate = totalEvaluated > 0 ? Math.round((fails / totalEvaluated) * 100) : 0;

    return {
      question: q,
      fails,
      totalEvaluated,
      failureRate,
    };
  }).sort((a, b) => b.failureRate - a.failureRate);

  // Filtered Question Bank
  const filteredQuestions = QUESTIONS.filter((q) => {
    const matchesBlock = selectedBlockFilter === 'all' || q.blockId === selectedBlockFilter;
    const matchesQuery = searchQuery === '' ||
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesBlock && matchesQuery;
  });

  // Export CSV Report
  const handleExportCSV = () => {
    const headers = 'ID,Alumno,Email,Fecha,Puntaje (%),Preguntas Correctas,Tiempo (s)\n';
    const rows = attempts.map(
      (a) => `"${a.id}","${a.studentName}","${a.studentEmail}","${a.date}",${a.scorePercent},${a.correctCount},${a.timeSpentSeconds}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_catedra_bioquimica_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header Docente Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Panel de Supervisión Docente</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Control de Progreso de la Cátedra
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Supervisa el rendimiento en tiempo real de los alumnos en los 5 bloques de evaluación bioquímicos, analiza los puntos críticos de error e inspecciona intentos individuales.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onSimulateAttempt}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Simular Intento de Alumno</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 space-x-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'dashboard'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Dashboard Métrico</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'students'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Registro de Alumnos ({totalAttemptsCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('questionBank')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'questionBank'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Banco de Preguntas (30)</span>
        </button>
      </div>

      {/* TAB 1: METRIC DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Key KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Promedio de la Cátedra
              </span>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100 flex items-baseline space-x-2">
                <span>{avgScore}%</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${avgScore >= 70 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {avgScore >= 70 ? 'Aprobado' : 'Bajo'}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Evaluaciones Registradas
              </span>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {totalAttemptsCount}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Tiempo Promedio
              </span>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {avgTimeMinutes} <span className="text-sm font-normal text-slate-500">min</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                Bloques Evaluados
              </span>
              <div className="text-3xl font-black text-amber-500">
                5 <span className="text-xs text-slate-400 font-normal">/ 5 bloques</span>
              </div>
            </div>
          </div>

          {/* Chart & Failure Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart: Accuracy by Block */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                Promedio de Aciertos por Bloque Temático
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Representación porcentual del rendimiento de la cohorte en cada tema
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={blockDataChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="promedio" radius={[8, 8, 0, 0]}>
                      {blockDataChart.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.promedio >= 80 ? '#10b981' : entry.promedio >= 65 ? '#f59e0b' : '#f43f5e'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Critical Concepts / Top Failed Questions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Puntos Críticos de Error</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Preguntas con mayor tasa de falla acumulada
              </p>

              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                {questionFailureStats.slice(0, 5).map((stat) => (
                  <div key={stat.question.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Pregunta {stat.question.id}
                      </span>
                      <span className="text-rose-500 font-bold">
                        {stat.failureRate}% falla
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 leading-tight">
                      <MathText text={stat.question.questionText} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: STUDENT ROSTER */}
      {activeTab === 'students' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Historial de Alumnos Evaluados
              </h2>
              <p className="text-xs text-slate-500">
                Haz clic en cualquier alumno para inspeccionar el desglose de sus respuestas
              </p>
            </div>

            <button
              onClick={onClearAttempts}
              className="text-xs text-rose-500 hover:text-rose-600 font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 transition-colors"
            >
              Reiniciar Registro
            </button>
          </div>

          {/* Student Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="py-3 px-4">Alumno</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Puntaje</th>
                  <th className="py-3 px-4">Correctas</th>
                  <th className="py-3 px-4">Tiempo</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      <div>{att.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{att.studentEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{att.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold ${
                        att.scorePercent >= 80
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : att.scorePercent >= 60
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {att.scorePercent}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {att.correctCount} / {att.totalQuestions}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">
                      {Math.floor(att.timeSpentSeconds / 60)}m {att.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(att)}
                        className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-300 font-semibold transition-colors"
                      >
                        Inspeccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUESTION BANK */}
      {activeTab === 'questionBank' && (
        <div className="space-y-6">
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            <div className="flex-1 flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por palabra clave (ej. hepcidina, PLP, saturnismo)..."
                className="bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none w-full font-medium"
              />
            </div>

            <select
              value={selectedBlockFilter}
              onChange={(e) => setSelectedBlockFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none font-semibold"
            >
              <option value="all">Todos los Bloques (1-5)</option>
              <option value={1}>Bloque 1: Digestión de Proteínas</option>
              <option value={2}>Bloque 2: Transporte de Amoníaco & Urea</option>
              <option value={3}>Bloque 3: Catabolismo de Aminoácidos</option>
              <option value={4}>Bloque 4: Homeostasis del Hierro</option>
              <option value={5}>Bloque 5: ALAS 1 y ALAS 2</option>
            </select>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {filteredQuestions.map((q: Question) => (
              <div key={q.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    Pregunta {q.id} • Bloque {q.blockId}
                  </span>

                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Respuesta Correcta: {q.correctAnswer}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-4 leading-snug">
                  <MathText text={q.questionText} />
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                  {q.options.map((opt) => (
                    <div
                      key={opt.letter}
                      className={`p-3 rounded-xl border ${
                        opt.letter === q.correctAnswer
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <strong className="mr-1">{opt.letter})</strong>
                      <MathText text={opt.text} />
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-teal-500/5 dark:bg-teal-950/20 border border-teal-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-teal-600 dark:text-teal-400 block mb-1">Explicación Oficial:</strong>
                  <MathText text={q.explanation} />
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Student Detail Inspector Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl text-slate-900 dark:text-slate-100"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-extrabold">{selectedStudent.studentName}</h3>
                <p className="text-xs text-slate-400">{selectedStudent.studentEmail} • {selectedStudent.date}</p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 block">Puntaje Global</span>
                <span className="text-2xl font-bold text-teal-500">{selectedStudent.scorePercent}%</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400 block">Aciertos Totales</span>
                <span className="text-2xl font-bold text-emerald-500">{selectedStudent.correctCount} / {selectedStudent.totalQuestions}</span>
              </div>
            </div>

            <h4 className="font-bold text-sm mb-3">Respuestas por Pregunta:</h4>
            <div className="space-y-2">
              {QUESTIONS.map((q) => {
                const studentAns = selectedStudent.answers[q.id];
                return (
                  <div key={q.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-medium">
                      P{q.id}. <MathText text={q.questionText.slice(0, 60)} />...
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold ${studentAns?.correct ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                      {studentAns ? `Eligió ${studentAns.selected}` : 'Sin responder'} ({q.correctAnswer})
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
