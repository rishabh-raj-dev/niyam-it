# Habito - Modern Habit Tracker App

Habito is a feature-rich habit tracking application built with React Native and Expo. It helps users create, track, and maintain positive habits with a beautiful, modern UI and powerful tracking features.

## Features

- **Habit Management**: Create, edit, and track daily, weekly, or monthly habits
- **Visual Progress Tracking**: Track your streaks and view progress with intuitive charts
- **Reminders**: Set customizable reminders to help maintain consistency
- **Motivational Quotes**: Get daily motivational quotes to stay inspired
- **Customization**: Personalize habits with icons and colors
- **Dark Mode Support**: Light and dark themes with system preference option
- **Data Export/Import**: Back up and restore your habit data

## Tech Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **TypeScript**: Type-safe JavaScript
- **Redux Toolkit**: State management
- **React Navigation**: Navigation library
- **React Native Paper**: Material Design components
- **React Native Chart Kit**: Progress visualization
- **Async Storage**: Local data persistence
- **Expo Notifications**: Local notifications
- **React Native Reanimated**: Animations

## Project Structure

The project follows a modern, organized architecture:

```
src/
├── assets/           # Images, fonts, and other static resources
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration and types
├── screens/          # Application screens
├── services/         # Services for notifications, storage, etc.
├── store/            # Redux store and slices
├── theme/            # Theme configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v12 or newer)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd habito
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Use the Expo Go app on your device to scan the QR code, or run on an emulator/simulator

## Usage

1. **Create a habit**: Tap the "+" button to add a new habit
2. **Track your progress**: Mark habits as complete and view your streaks on the Progress tab
3. **Customize reminders**: Set up personalized reminders in the habit settings
4. **View insights**: Check your habit completion rates and streaks in the Progress tab

## License

This project is licensed under the MIT License.

## Acknowledgments

- The habit tracking community for inspiration
- Open source libraries that made this project possible
