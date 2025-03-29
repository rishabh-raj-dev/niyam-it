import { colors } from './colors';
import { spacing } from './spacing';

export const theme = {
  colors,
  spacing,
  roundness: 10,
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  }
};

export type Theme = typeof theme;
