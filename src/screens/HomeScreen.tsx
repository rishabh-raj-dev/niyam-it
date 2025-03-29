import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

import HabitCard from '../components/HabitCard';
import { useAppSelector } from '../hooks/reduxHooks';
import { getMotivationalQuote } from '../utils/quotes';

const HomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const habits = useAppSelector(state => state.habits.habits);
  const motivationalQuotesEnabled = useAppSelector(state => state.app.motivationalQuotesEnabled);
  const [quote, setQuote] = React.useState('');
  
  // Filter out archived habits and sort by creation date (newest first)
  const activeHabits = habits
    .filter(habit => !habit.archivedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  useEffect(() => {
    if (motivationalQuotesEnabled) {
      setQuote(getMotivationalQuote());
    }
  }, [motivationalQuotesEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Habits</Text>
          <Text style={styles.subtitle}>
            {format(new Date(), 'EEEE, MMMM d')}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('HabitForm', {})}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {motivationalQuotesEnabled && quote && (
        <View style={[styles.quoteContainer, { backgroundColor: theme.colors.primaryContainer }]}>
          <Text style={[styles.quoteText, { color: theme.colors.onPrimaryContainer }]}>
            {quote}
          </Text>
        </View>
      )}
      
      {activeHabits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={80} color={theme.colors.primary} />
          <Text style={styles.emptyTitle}>No habits yet</Text>
          <Text style={styles.emptySubtitle}>
            Start building positive habits by adding your first habit
          </Text>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('HabitForm', {})}
            style={styles.emptyButton}
          >
            Add Your First Habit
          </Button>
        </View>
      ) : (
        <FlatList
          data={activeHabits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HabitCard habit={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  quoteText: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 24,
  },
  emptyButton: {
    marginTop: 16,
  },
});

export default HomeScreen;
