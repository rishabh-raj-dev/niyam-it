import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddHabitScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // This screen serves as a transition - immediately navigate to the habit form
    navigation.navigate('HabitForm');
  }, [navigation]);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
});

export default AddHabitScreen;
