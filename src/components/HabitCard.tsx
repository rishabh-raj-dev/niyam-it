import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Surface, Checkbox, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { Habit } from '../types/habit';
import { addHabitLog } from '../store/slices/habitSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Find today's log if it exists
  const todayLog = habit.logs.find(log => log.date === today);
  const isCompleted = todayLog?.completed || false;
  
  const toggleCompletion = () => {
    dispatch(
      addHabitLog({
        habitId: habit.id,
        log: {
          date: today,
          completed: !isCompleted,
        },
      })
    );
  };

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderLeftColor: habit.color,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name={habit.icon as any} size={24} color={habit.color} />
        </View>
        
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {habit.name}
          </Text>
          {habit.description && (
            <Text variant="bodySmall" style={styles.description}>
              {habit.description}
            </Text>
          )}
        </View>
        
        <View style={styles.actions}>
          <Checkbox
            status={isCompleted ? 'checked' : 'unchecked'}
            onPress={toggleCompletion}
            color={theme.colors.primary}
          />
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => {
              navigation.navigate('HabitDetails', { habitId: habit.id });
            }}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.outline}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default HabitCard;
