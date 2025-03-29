import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation
import MainTabs from './MainTabs';

// Screens
import HabitFormScreen from '../screens/HabitFormScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

// Types
import { RootStackParamList } from './types';
import { useAppSelector } from '../hooks/reduxHooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isFirstLaunch = useAppSelector(state => state.app.isFirstLaunch);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
        }}
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'Main'}
      >
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="HabitForm" 
              component={HabitFormScreen} 
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Create Habit'
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
