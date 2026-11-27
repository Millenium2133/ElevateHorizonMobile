// theme.js
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#006593',
    onPrimary: '#f5f9ff',
    primaryContainer: '#55b9fa',
    onPrimaryContainer: '#00344e',
    secondary: '#42637b',
    onSecondary: '#f5f9ff',
    secondaryContainer: '#c9e6ff',
    onSecondaryContainer: '#34556d',
    tertiary: '#814799',
    onTertiary: '#fff7fc',
    tertiaryContainer: '#e5a3fe',
    onTertiaryContainer: '#561d6f',
    error: '#bb1b1b',
    onError: '#fff7f6',
    errorContainer: '#fe4e44',
    onErrorContainer: '#570003',
    background: '#3CA6E5',
    onBackground: '#2e3337',
    surface: '#f6faff',
    onSurface: '#2e3337',
    surfaceVariant: '#dfe3e8',
    onSurfaceVariant: '#5b5f64',
    outline: '#777b80',
    outlineVariant: '#aeb2b7',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#0a0f12',
    inverseOnSurface: '#999da2',
    inversePrimary: '#55b9fa',

    elevation: {
      level0: 'transparent',
      level1: '#f0f4f9', // surface-container-low
      level2: '#ebeef3', // surface-container
      level3: '#e5e8ee', // surface-container-high
      level4: '#dfe3e8', // surface-container-highest
      level5: '#d7dae0', // surface-dim
    },

    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f0f4f9',
    surfaceContainer: '#ebeef3',
    surfaceContainerHigh: '#e5e8ee',
    surfaceContainerHighest: '#dfe3e8',
    surfaceBright: '#f6faff',
    surfaceDim: '#d7dae0',
    surfaceTint: '#006593',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#55b9fa',
    onPrimary: '#00344e',
    primaryContainer: '#40a9e8',
    onPrimaryContainer: '#00253a',
    secondary: '#a9cbe7',
    onSecondary: '#21435a',
    secondaryContainer: '#1c3f55',
    onSecondaryContainer: '#a2c3df',
    tertiary: '#ecb6ff',
    onTertiary: '#61287a',
    tertiaryContainer: '#e5a3fe',
    onTertiaryContainer: '#561d6f',
    error: '#ff7164',
    onError: '#4a0002',
    errorContainer: '#ac0c12',
    onErrorContainer: '#ffb8b0',
    background: '#0a0f12',
    onBackground: '#e2e6eb',
    surface: '#0a0f12',
    onSurface: '#e2e6eb',
    surfaceVariant: '#22262a',
    onSurfaceVariant: '#a7abb0',
    outline: '#72767b',
    outlineVariant: '#44484d',
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#f6faff',
    inverseOnSurface: '#51555a',
    inversePrimary: '#006593',

    elevation: {
      level0: 'transparent',
      level1: '#0f1418', // surface-container-low
      level2: '#161a1e', // surface-container
      level3: '#1c2024', // surface-container-high
      level4: '#22262a', // surface-container-highest
      level5: '#282d31', // surface-bright
    },
    surfaceContainerLowest: '#000000',
    surfaceContainerLow: '#0f1418',
    surfaceContainer: '#161a1e',
    surfaceContainerHigh: '#1c2024',
    surfaceContainerHighest: '#22262a',
    surfaceBright: '#282d31',
    surfaceDim: '#0a0f12',
    surfaceTint: '#55b9fa',
  },
};
