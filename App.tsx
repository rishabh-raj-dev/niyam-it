// Import Reanimated at the very top of the file
import 'react-native-reanimated';

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { theme as appTheme } from './src/theme';
import { paperTheme } from './src/theme/paper-theme';
import { loadHabits, loadAppSettings } from './src/services/storage';
import { setHabits } from './src/store/slices/habitSlice';
import { setFirstLaunch, setTheme, setNotificationsEnabled, setMotivationalQuotesEnabled } from './src/store/slices/appSlice';
import { configureNotifications, registerForPushNotificationsAsync } from './src/services/notifications';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  // Load saved data and initialize app
  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialize notifications
        await configureNotifications();
        await registerForPushNotificationsAsync();
        
        // Load habits from storage
        const habits = await loadHabits();
        if (habits.length > 0) {
          store.dispatch(setHabits(habits));
        }
        
        // Load app settings
        const settings = await loadAppSettings();
        if (settings) {
          store.dispatch(setFirstLaunch(settings.isFirstLaunch));
          store.dispatch(setTheme(settings.theme));
          store.dispatch(setNotificationsEnabled(settings.notificationsEnabled));
          store.dispatch(setMotivationalQuotesEnabled(settings.motivationalQuotesEnabled));
          
          // Update color scheme based on settings
          if (settings.theme !== 'system') {
            setColorScheme(settings.theme);
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initApp();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={appTheme.colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PaperProvider theme={paperTheme}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <RootNavigator />
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
