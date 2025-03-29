import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/habit';

// Storage keys
const STORAGE_KEYS = {
  HABITS: 'habito_habits',
  APP_SETTINGS: 'habito_app_settings',
};

// Interface for app settings to be stored
interface AppSettings {
  isFirstLaunch: boolean;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  motivationalQuotesEnabled: boolean;
}

/**
 * Save habits to AsyncStorage
 */
export const saveHabits = async (habits: Habit[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(habits);
    await AsyncStorage.setItem(STORAGE_KEYS.HABITS, jsonValue);
  } catch (error) {
    console.error('Error saving habits:', error);
    throw error;
  }
};

/**
 * Load habits from AsyncStorage
 */
export const loadHabits = async (): Promise<Habit[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.HABITS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

/**
 * Save app settings to AsyncStorage
 */
export const saveAppSettings = async (settings: AppSettings): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(STORAGE_KEYS.APP_SETTINGS, jsonValue);
  } catch (error) {
    console.error('Error saving app settings:', error);
    throw error;
  }
};

/**
 * Load app settings from AsyncStorage
 */
export const loadAppSettings = async (): Promise<AppSettings | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading app settings:', error);
    return null;
  }
};

/**
 * Clear all app data
 */
export const clearAllData = async (): Promise<void> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter(key => key.startsWith('habito_'));
    await AsyncStorage.multiRemove(appKeys);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};
