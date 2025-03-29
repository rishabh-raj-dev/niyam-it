import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Habit } from '../types/habit';

/**
 * Configure notification settings
 */
export const configureNotifications = async () => {
  // Set up notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

/**
 * Request permission for push notifications
 */
export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }
    
    return true;
  } else {
    console.log('Must use physical device for Push Notifications');
    return false;
  }
};

/**
 * Schedule a notification for a habit
 */
export const scheduleHabitNotification = async (habit: Habit): Promise<string | null> => {
  // Only schedule if the habit has a reminder
  if (!habit.reminder) return null;
  
  // Cancel any existing notifications for this habit
  await cancelHabitNotification(habit.id);
  
  const { time, days } = habit.reminder;
  const [hours, minutes] = time.split(':').map(Number);
  
  try {
    // Schedule notification for each selected day
    const notificationIds = await Promise.all(
      days.map(async (day) => {
        const trigger: Notifications.NotificationTriggerInput = {
          type: 'daily',
          hour: hours,
          minute: minutes,
          repeats: true,
        };
        
        const notificationContent = {
          title: 'Habit Reminder',
          body: `Time to complete your habit: ${habit.name}`,
          data: { habitId: habit.id },
        };
        
        const identifier = await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger,
        });
        
        return identifier;
      })
    );
    
    return notificationIds.join(',');
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

/**
 * Cancel notifications for a habit
 */
export const cancelHabitNotification = async (habitId: string): Promise<void> => {
  try {
    const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const habitNotifications = allNotifications.filter(
      (notification) => notification.content.data?.habitId === habitId
    );
    
    for (const notification of habitNotifications) {
      await Notifications.cancelScheduledNotificationAsync(notification.identifier);
    }
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
};
