import React from 'react';
import { GraduationCap, Calendar, CheckCircle } from 'lucide-react';

interface HeaderProps {
  completedSessions: number;
}

export const Header: React.FC<HeaderProps> = ({ completedSessions }) => {
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="w-full border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-stone-900 tracking-tight text-base font-['Outfit',sans-serif]">
              StudyBloom
            </span>
            <span className="hidden sm:inline text-xs text-stone-400 ml-2 border-l border-stone-200 pl-2">
              Student Productivity
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>{todayFormatted}</span>
          </div>

          <div 
            id="session-badge"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs"
            title="Completed focus sessions today"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{completedSessions} {completedSessions === 1 ? 'Session' : 'Sessions'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
