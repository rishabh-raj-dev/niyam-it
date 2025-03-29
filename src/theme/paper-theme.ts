import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';
import { colors } from './colors';

// Define valid typography variants
const fontConfig = {
  fontFamily: 'System',
  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
    heavy: '900',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '900',
    },
  },
};

export const paperTheme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryLight,
    background: colors.background,
    surface: colors.card,
    error: colors.error,
  },
  // Keep the default fonts from DefaultTheme
  // This is important because Paper expects a specific structure
};
