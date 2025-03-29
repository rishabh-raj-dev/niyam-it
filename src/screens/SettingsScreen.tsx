import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, List, Switch, Divider, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { 
  setTheme, 
  setNotificationsEnabled, 
  setMotivationalQuotesEnabled 
} from '../store/slices/appSlice';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  
  const { 
    theme: currentTheme, 
    notificationsEnabled, 
    motivationalQuotesEnabled 
  } = useAppSelector(state => state.app);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Theme"
            description={
              currentTheme === 'light' 
                ? 'Light' 
                : currentTheme === 'dark' 
                  ? 'Dark' 
                  : 'System default'
            }
            left={props => <List.Icon {...props} icon="palette-outline" />}
            onPress={() => {}}
            right={props => (
              <View style={styles.themeOptions}>
                <Button 
                  mode={currentTheme === 'light' ? 'contained' : 'outlined'} 
                  onPress={() => dispatch(setTheme('light'))}
                  compact
                >
                  Light
                </Button>
                <Button 
                  mode={currentTheme === 'dark' ? 'contained' : 'outlined'} 
                  onPress={() => dispatch(setTheme('dark'))}
                  compact
                  style={styles.middleButton}
                >
                  Dark
                </Button>
                <Button 
                  mode={currentTheme === 'system' ? 'contained' : 'outlined'} 
                  onPress={() => dispatch(setTheme('system'))}
                  compact
                >
                  System
                </Button>
              </View>
            )}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Enable Notifications"
            description="Receive reminders for your habits"
            left={props => <List.Icon {...props} icon="bell-outline" />}
            right={props => (
              <Switch
                value={notificationsEnabled}
                onValueChange={value => dispatch(setNotificationsEnabled(value))}
              />
            )}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Motivation</List.Subheader>
          <List.Item
            title="Motivational Quotes"
            description="Show daily motivational quotes"
            left={props => <List.Icon {...props} icon="format-quote-close" />}
            right={props => (
              <Switch
                value={motivationalQuotesEnabled}
                onValueChange={value => dispatch(setMotivationalQuotesEnabled(value))}
              />
            )}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Data</List.Subheader>
          <List.Item
            title="Export Data"
            description="Export your habits and progress"
            left={props => <List.Icon {...props} icon="export-variant" />}
            onPress={() => {}}
          />
          <List.Item
            title="Import Data"
            description="Import previously exported data"
            left={props => <List.Icon {...props} icon="import" />}
            onPress={() => {}}
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information-outline" />}
          />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account-outline" />}
            onPress={() => {}}
          />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document-outline" />}
            onPress={() => {}}
          />
        </List.Section>
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
  themeOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleButton: {
    marginHorizontal: 8,
  },
});

export default SettingsScreen;
