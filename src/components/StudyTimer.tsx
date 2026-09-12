import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Plus, CheckCircle2 } from 'lucide-react';
import { TimerMode } from '../types';
import { playChime } from '../utils/sound';

interface StudyTimerProps {
  onSessionComplete: () => void;
}

const TIMER_DURATIONS: Record<TimerMode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const StudyTimer: React.FC<StudyTimerProps> = ({ onSessionComplete }) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATIONS.pomodoro);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showFinishedAlert, setShowFinishedAlert] = useState<boolean>(false);

  const initialDuration = TIMER_DURATIONS[mode];
  const timerRef = useRef<number | null>(null);

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setShowFinishedAlert(false);
  };

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    if (soundEnabled) {
      playChime();
    }
    setShowFinishedAlert(true);
    if (mode === 'pomodoro') {
      onSessionComplete();
    }
  }, [mode, soundEnabled, onSessionComplete]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, handleTimerComplete]);

  const toggleStartPause = () => {
    if (timeLeft === 0) {
      setTimeLeft(TIMER_DURATIONS[mode]);
    }
    setShowFinishedAlert(false);
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
    setShowFinishedAlert(false);
  };

  const addFiveMinutes = () => {
    setTimeLeft((prev) => prev + 300);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Calculate progress percentage
  const progress = Math.min(100, Math.max(0, ((initialDuration - timeLeft) / initialDuration) * 100));

  return (
    <div id="study-timer-container" className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif]">Study Timer</h2>
          <p className="text-xs sm:text-sm text-stone-500">Stay focused for 25 minutes, then rest.</p>
        </div>

        <button
          id="toggle-sound-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
            soundEnabled 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
              : 'bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-100'
          }`}
          title={soundEnabled ? 'Chime sound enabled' : 'Chime sound muted'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline">{soundEnabled ? 'Chime On' : 'Muted'}</span>
        </button>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-stone-100/90 rounded-xl mb-8 max-w-md mx-auto">
        <button
          id="mode-pomodoro"
          onClick={() => switchMode('pomodoro')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            mode === 'pomodoro'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Focus (25m)
        </button>
        <button
          id="mode-short-break"
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            mode === 'shortBreak'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          id="mode-long-break"
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            mode === 'longBreak'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative flex flex-col items-center justify-center my-6">
        {/* Subtle Progress Ring Background */}
        <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-8 border-stone-100 flex flex-col items-center justify-center relative shadow-inner bg-stone-50/50">
          <span className="text-5xl sm:text-6xl font-extrabold text-stone-900 font-mono tracking-tight">
            {formattedTime}
          </span>
          <span className="text-xs sm:text-sm font-medium text-stone-500 mt-2 capitalize">
            {mode === 'pomodoro' ? (isRunning ? '📚 In The Zone' : 'Ready to study') : '☕ Taking a break'}
          </span>

          {/* Radial visual indicator bar */}
          <div 
            className="absolute inset-0 rounded-full border-8 border-emerald-500 transition-all duration-1000 pointer-events-none"
            style={{
              clipPath: `inset(0 0 ${100 - progress}% 0)`,
              opacity: isRunning ? 0.85 : 0.4
            }}
          />
        </div>
      </div>

      {/* Completion Banner */}
      {showFinishedAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl mb-6 text-center text-sm flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {mode === 'pomodoro'
              ? '🎉 Excellent job! You completed a study session. Time for a short break!'
              : 'Break time finished! Ready to dive back in?'}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          id="btn-timer-toggle"
          onClick={toggleStartPause}
          className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-base font-semibold shadow-sm transition-all cursor-pointer ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          id="btn-timer-reset"
          onClick={resetTimer}
          className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
          title="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          id="btn-timer-add-time"
          onClick={addFiveMinutes}
          className="inline-flex items-center gap-1 px-3.5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          title="Add 5 more minutes"
        >
          <Plus className="w-4 h-4" />
          <span>+5m</span>
        </button>
      </div>
    </div>
  );
};
