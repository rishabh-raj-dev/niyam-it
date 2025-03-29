import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Progress: undefined;
  Add: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  HabitDetails: { habitId: string };
};

export type ProgressStackParamList = {
  ProgressScreen: undefined;
  HabitProgressDetails: { habitId: string };
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  Notifications: undefined;
  About: undefined;
  Theme: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  HabitForm: { habitId?: string };
  Onboarding: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
