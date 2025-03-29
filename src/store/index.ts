import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './slices/habitSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
