export interface Quote {
  id: string;
  text: string;
  author: string;
  context?: string;
}

export interface StudyTask {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
