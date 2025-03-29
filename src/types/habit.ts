export type HabitFrequency = 'daily' | 'weekly' | 'monthly';

export type HabitCategory = 
  | 'health' 
  | 'fitness' 
  | 'mindfulness' 
  | 'productivity' 
  | 'learning' 
  | 'creativity' 
  | 'social' 
  | 'personal'
  | 'custom';

export interface HabitLog {
  date: string; // ISO string format
  completed: boolean;
  note?: string;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  target: number; // number of times to complete in the frequency period
  reminder?: {
    time: string; // format: 'HH:mm'
    days: number[]; // 0-6, where 0 is Sunday
  };
  createdAt: string;
  archivedAt?: string;
  logs: HabitLog[];
}
