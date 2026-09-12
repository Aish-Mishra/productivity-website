import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, ListChecks, Sparkles } from 'lucide-react';
import { StudyTask } from '../types';

const INITIAL_TASKS: StudyTask[] = [
  { id: '1', text: 'Read chapter summary & key concepts', completed: false, createdAt: Date.now() - 2000 },
  { id: '2', text: 'Work through 5 practice problems', completed: false, createdAt: Date.now() - 1000 },
];

const PRESETS = [
  'Review lecture slides',
  'Practice flashcards',
  'Complete worksheet',
  'Draft essay outline',
];

export const TaskChecklist: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem('student_study_tasks');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TASKS;
  });

  const [inputVal, setInputVal] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('student_study_tasks', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const addTask = (text: string) => {
    if (!text.trim()) return;
    const newTask: StudyTask = {
      id: String(Date.now()),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setInputVal('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div id="study-tasks-container" className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif]">Today’s Study Goals</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {completedCount}/{tasks.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">Break your study material into small, bite-sized tasks.</p>
        </div>
      </div>

      {/* Task input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask(inputVal);
        }}
        className="flex gap-2 mb-4"
      >
        <input
          id="task-input-field"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Add a study task (e.g., Read Math Chapter 3)..."
          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />
        <button
          id="btn-add-task"
          type="submit"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </form>

      {/* Quick Suggestions Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        <span className="text-xs text-stone-400 font-medium mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Quick ideas:
        </span>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => addTask(preset)}
            className="text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-stone-600 px-2.5 py-1 rounded-lg border border-transparent transition-all cursor-pointer"
          >
            + {preset}
          </button>
        ))}
      </div>

      {/* Task list */}
      {tasks.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-xl border border-dashed border-stone-200 bg-stone-50/50">
          <ListChecks className="w-8 h-8 mx-auto text-stone-300 mb-2" />
          <p className="text-sm font-medium text-stone-600">No tasks on your list yet.</p>
          <p className="text-xs text-stone-400 mt-1">Add something small to begin your momentum!</p>
        </div>
      ) : (
        <ul className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-emerald-50/40 border-emerald-100 text-stone-400'
                  : 'bg-white border-stone-200/70 hover:border-stone-300 text-stone-800'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-3 text-left flex-1 cursor-pointer select-none"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-stone-300 bg-white hover:border-emerald-400'
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className={`text-sm font-medium ${task.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                  {task.text}
                </span>
              </button>

              <button
                type="button"
                onClick={() => deleteTask(task.id)}
                className="text-stone-300 hover:text-rose-500 p-1 rounded transition-colors ml-2 cursor-pointer"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Bottom status */}
      {tasks.length > 0 && completedCount === tasks.length && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium rounded-xl text-center">
          🌟 All tasks completed! You are doing amazing!
        </div>
      )}
    </div>
  );
};
