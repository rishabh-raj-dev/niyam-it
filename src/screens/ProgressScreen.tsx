import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text, useTheme, SegmentedButtons, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAppSelector } from '../hooks/reduxHooks';
import { format, subDays, eachDayOfInterval } from 'date-fns';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const theme = useTheme();
  const habits = useAppSelector(state => state.habits.habits);
  const [timeFrame, setTimeFrame] = useState('week');

  // Get active habits (not archived)
  const activeHabits = habits.filter(habit => !habit.archivedAt);

  // Get dates for the selected time frame
  const getDates = () => {
    const today = new Date();
    let startDate;
    
    switch(timeFrame) {
      case 'week':
        startDate = subDays(today, 6); // Last 7 days
        break;
      case 'month':
        startDate = subDays(today, 29); // Last 30 days
        break;
      case 'year':
        startDate = subDays(today, 364); // Last 365 days
        break;
      default:
        startDate = subDays(today, 6);
    }
    
    return eachDayOfInterval({ start: startDate, end: today });
  };

  const dates = getDates();

  // Calculate completion rates for each habit
  const getCompletionRates = () => {
    return activeHabits.map(habit => {
      const completedDays = habit.logs.filter(log => log.completed).length;
      const totalDays = habit.logs.length || 1; // Avoid division by zero
      const rate = (completedDays / totalDays) * 100;
      return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        completionRate: Math.round(rate),
      };
    }).sort((a, b) => b.completionRate - a.completionRate);
  };

  // Calculate longest streaks for each habit
  const getLongestStreaks = () => {
    return activeHabits.map(habit => {
      let currentStreak = 0;
      let longestStreak = 0;
      
      // Sort logs by date
      const sortedLogs = [...habit.logs].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      for (const log of sortedLogs) {
        if (log.completed) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
      
      return {
        id: habit.id,
        name: habit.name,
        color: habit.color,
        longestStreak,
      };
    }).sort((a, b) => b.longestStreak - a.longestStreak);
  };

  const completionRates = getCompletionRates();
  const longestStreaks = getLongestStreaks();

  // Data for the line chart
  const lineChartData = {
    labels: dates.map(date => format(date, 'MM/dd')),
    datasets: [
      {
        data: dates.map(date => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const completedHabits = activeHabits.filter(habit => 
            habit.logs.some(log => log.date === dateStr && log.completed)
          );
          return completedHabits.length;
        }),
        color: () => theme.colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  // Data for the bar chart
  const barChartData = {
    labels: completionRates.slice(0, 5).map(item => item.name.slice(0, 5) + '...'),
    datasets: [
      {
        data: completionRates.slice(0, 5).map(item => item.completionRate),
        colors: completionRates.slice(0, 5).map(item => () => item.color),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${parseInt(theme.colors.primary.slice(1, 3), 16)}, ${parseInt(theme.colors.primary.slice(3, 5), 16)}, ${parseInt(theme.colors.primary.slice(5, 7), 16)}, ${opacity})`,
    labelColor: () => theme.colors.text,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>Your Progress</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.segmentContainer}>
          <SegmentedButtons
            value={timeFrame}
            onValueChange={setTimeFrame}
            buttons={[
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'year', label: 'Year' },
            ]}
          />
        </View>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>
              Daily Completed Habits
            </Text>
            <LineChart
              data={lineChartData}
              width={width - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>
              Top Habit Completion Rates
            </Text>
            {completionRates.length > 0 ? (
              <BarChart
                data={barChartData}
                width={width - 64}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                verticalLabelRotation={30}
              />
            ) : (
              <Text style={styles.noDataText}>No data available yet</Text>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.chartTitle}>Longest Streaks</Text>
            {longestStreaks.map((streak, index) => (
              <View key={streak.id} style={styles.streakItem}>
                <View style={styles.streakInfo}>
                  <Text variant="bodyMedium">{index + 1}. {streak.name}</Text>
                  <View style={[styles.streakIndicator, { backgroundColor: streak.color }]} />
                </View>
                <Text variant="titleSmall" style={styles.streakValue}>
                  {streak.longestStreak} {streak.longestStreak === 1 ? 'day' : 'days'}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  segmentContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chartCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  chartTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
    paddingRight: 16,
  },
  streakItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  streakValue: {
    fontWeight: '700',
  },
  noDataText: {
    textAlign: 'center',
    paddingVertical: 40,
  },
});

export default ProgressScreen;
