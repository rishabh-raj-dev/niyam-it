import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Habit, HabitLog } from '../../types/habit';

interface HabitState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  loading: false,
  error: null,
};

export const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
    },
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    updateHabit: (state, action: PayloadAction<Habit>) => {
      const index = state.habits.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    },
    archiveHabit: (state, action: PayloadAction<string>) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (habit) {
        habit.archivedAt = new Date().toISOString();
      }
    },
    deleteHabit: (state, action: PayloadAction<string>) => {
      state.habits = state.habits.filter(habit => habit.id !== action.payload);
    },
    addHabitLog: (state, action: PayloadAction<{ habitId: string; log: HabitLog }>) => {
      const { habitId, log } = action.payload;
      const habit = state.habits.find(h => h.id === habitId);
      if (habit) {
        // Check if there's already a log for this date
        const existingLogIndex = habit.logs.findIndex(l => l.date === log.date);
        if (existingLogIndex !== -1) {
          habit.logs[existingLogIndex] = log;
        } else {
          habit.logs.push(log);
        }
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setHabits,
  addHabit,
  updateHabit,
  archiveHabit,
  deleteHabit,
  addHabitLog,
} = habitSlice.actions;

export default habitSlice.reducer;
