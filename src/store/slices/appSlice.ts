import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isFirstLaunch: boolean;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  motivationalQuotesEnabled: boolean;
}

const initialState: AppState = {
  isFirstLaunch: true,
  theme: 'system',
  notificationsEnabled: true,
  motivationalQuotesEnabled: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setMotivationalQuotesEnabled: (state, action: PayloadAction<boolean>) => {
      state.motivationalQuotesEnabled = action.payload;
    },
  },
});

export const {
  setFirstLaunch,
  setTheme,
  setNotificationsEnabled,
  setMotivationalQuotesEnabled,
} = appSlice.actions;

export default appSlice.reducer;
