import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  useTheme, 
  Chip,
  SegmentedButtons,
  Switch,
  IconButton
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addHabit, updateHabit } from '../store/slices/habitSlice';
import { RootStackParamList } from '../navigation/types';
import { Habit, HabitCategory, HabitFrequency } from '../types/habit';
import { colors } from '../theme/colors';

type HabitFormRouteProp = RouteProp<RootStackParamList, 'HabitForm'>;

// Predefined colors for habits
const habitColors = [
  colors.primary,
  colors.secondary,
  colors.accent1,
  colors.accent2,
  colors.accent3,
  colors.accent4,
  colors.success,
  colors.info,
];

// Predefined icons for habits
const habitIcons = [
  'fitness-outline',
  'walk-outline',
  'water-outline',
  'book-outline',
  'musical-notes-outline',
  'pencil-outline',
  'heart-outline',
  'medkit-outline',
  'alarm-outline',
  'bicycle-outline',
  'bed-outline',
  'language-outline',
  'nutrition-outline',
  'call-outline',
  'flask-outline',
];

// Habit categories
const habitCategories: HabitCategory[] = [
  'health',
  'fitness',
  'mindfulness',
  'productivity',
  'learning',
  'creativity',
  'social',
  'personal',
  'custom',
];

const HabitFormScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<HabitFormRouteProp>();
  const dispatch = useAppDispatch();
  const habits = useAppSelector(state => state.habits.habits);
  
  const habitId = route.params?.habitId;
  const existingHabit = habitId ? habits.find(h => h.id === habitId) : undefined;
  const isEditing = !!existingHabit;
  
  // Form state
  const [name, setName] = useState(existingHabit?.name || '');
  const [description, setDescription] = useState(existingHabit?.description || '');
  const [category, setCategory] = useState<HabitCategory>(existingHabit?.category || 'health');
  const [icon, setIcon] = useState(existingHabit?.icon || habitIcons[0]);
  const [color, setColor] = useState(existingHabit?.color || habitColors[0]);
  const [frequency, setFrequency] = useState<HabitFrequency>(existingHabit?.frequency || 'daily');
  const [target, setTarget] = useState(existingHabit?.target?.toString() || '1');
  const [reminderEnabled, setReminderEnabled] = useState(!!existingHabit?.reminder);
  const [reminderTime, setReminderTime] = useState(existingHabit?.reminder?.time || '09:00');
  const [reminderDays, setReminderDays] = useState<number[]>(
    existingHabit?.reminder?.days || [0, 1, 2, 3, 4, 5, 6]
  );
  
  // Validation state
  const [nameError, setNameError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Habit name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };
  
  const handleSave = () => {
    if (!validateForm()) return;
    
    const newHabit: Habit = {
      id: existingHabit?.id || uuidv4(),
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      icon,
      color,
      frequency,
      target: parseInt(target, 10) || 1,
      reminder: reminderEnabled ? {
        time: reminderTime,
        days: reminderDays,
      } : undefined,
      createdAt: existingHabit?.createdAt || new Date().toISOString(),
      logs: existingHabit?.logs || [],
    };
    
    if (isEditing) {
      dispatch(updateHabit(newHabit));
    } else {
      dispatch(addHabit(newHabit));
    }
    
    navigation.goBack();
  };
  
  const toggleReminderDay = (day: number) => {
    if (reminderDays.includes(day)) {
      setReminderDays(reminderDays.filter(d => d !== day));
    } else {
      setReminderDays([...reminderDays, day].sort());
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Basic Information</Text>
          
          <TextInput
            label="Habit Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            error={!!nameError}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          
          <TextInput
            label="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />
          
          <Text variant="bodyMedium" style={styles.label}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {habitCategories.map((cat) => (
              <Chip
                key={cat}
                selected={category === cat}
                onPress={() => setCategory(cat)}
                style={[
                  styles.chip, 
                  { 
                    backgroundColor: category === cat 
                      ? theme.colors.primaryContainer 
                      : theme.colors.surfaceVariant 
                  }
                ]}
                textStyle={{
                  color: category === cat 
                    ? theme.colors.onPrimaryContainer 
                    : theme.colors.onSurfaceVariant
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Chip>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.formSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Appearance</Text>
          
          <Text variant="bodyMedium" style={styles.label}>Icon</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {habitIcons.map((iconName) => (
              <TouchableOpacity
                key={iconName}
                style={[
                  styles.iconButton,
                  {
                    backgroundColor: icon === iconName ? color : theme.colors.surfaceVariant,
                  },
                ]}
                onPress={() => setIcon(iconName)}
              >
                <Ionicons 
                  name={iconName as any} 
                  size={24} 
                  color={icon === iconName ? 'white' : theme.colors.onSurfaceVariant} 
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <Text variant="bodyMedium" style={styles.label}>Color</Text>
          <View style={styles.colorGrid}>
            {habitColors.map((colorHex) => (
              <TouchableOpacity
                key={colorHex}
                style={[
                  styles.colorButton,
                  {
                    backgroundColor: colorHex,
                    borderWidth: color === colorHex ? 3 : 0,
                    borderColor: theme.colors.background,
                  },
                ]}
                onPress={() => setColor(colorHex)}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Frequency & Goals</Text>
          
          <Text variant="bodyMedium" style={styles.label}>Frequency</Text>
          <SegmentedButtons
            value={frequency}
            onValueChange={(value) => setFrequency(value as HabitFrequency)}
            buttons={[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
            style={styles.segmentedButtons}
          />
          
          <TextInput
            label="Target (times per period)"
            value={target}
            onChangeText={(text) => setTarget(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.reminderHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>Reminder</Text>
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
            />
          </View>
          
          {reminderEnabled && (
            <>
              <TextInput
                label="Time"
                value={reminderTime}
                onChangeText={setReminderTime}
                style={styles.input}
                placeholder="HH:MM"
                right={<TextInput.Icon icon="clock-outline" />}
              />
              
              <Text variant="bodyMedium" style={styles.label}>Days</Text>
              <View style={styles.daysContainer}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayButton,
                      {
                        backgroundColor: reminderDays.includes(index)
                          ? theme.colors.primary
                          : theme.colors.surfaceVariant,
                      },
                    ]}
                    onPress={() => toggleReminderDay(index)}
                  >
                    <Text
                      style={{
                        color: reminderDays.includes(index)
                          ? 'white'
                          : theme.colors.onSurfaceVariant,
                      }}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()}
          style={styles.footerButton}
        >
          Cancel
        </Button>
        <Button 
          mode="contained" 
          onPress={handleSave}
          style={styles.footerButton}
        >
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  label: {
    marginBottom: 8,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginTop: -12,
    marginBottom: 16,
    fontSize: 12,
  },
});

export default HabitFormScreen;
