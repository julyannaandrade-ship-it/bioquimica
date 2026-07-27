import React from 'react';

interface HeaderProps {
  viewMode: 'student' | 'teacher';
  setViewMode: (mode: 'student' | 'teacher') => void;
  studentName: string;
  setStudentName: (name: string) => void;
  activeSessionExists: boolean;
  onResetQuiz?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  studentName,
  setStudentName,
  activeSessionExists,
  onResetQuiz,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight text-slate-100 flex items-center gap-2">
              Bioquímica Médica
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-300 font-semibold border border-teal-500/20">
                Curso COVALENTES MEDUAI
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Digestión, Metabolismo del N₂, Hierro y Vía de ALAS/Hemo
            </p>
          </div>
        </div>

        {/* Mode Switcher & Student Info */}
        <div className="flex items-center space-x-3">
          
          {/* View Mode Toggle Switch */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700/80">
            <button
              onClick={() => setViewMode('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                viewMode === 'student'
                  ? 'bg-teal-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>Alumno</span>
            </button>

            <button
              onClick={() => setViewMode('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                viewMode === 'teacher'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Docente</span>
            </button>
          </div>

          {/* Student Profile Quick Input */}
          {viewMode === 'student' && (
            <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-400">Alumno:</span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Tu nombre..."
                className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-32 font-medium"
              />
            </div>
          )}

          {/* Reset / Return Button if in session */}
          {activeSessionExists && viewMode === 'student' && onResetQuiz && (
            <button
              onClick={onResetQuiz}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="Volver a la selección de bloques"
            >
              Bloques
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
