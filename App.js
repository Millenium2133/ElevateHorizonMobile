import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme } from './theme';

function AppContent() {
  const systemTheme = useColorScheme();
  const { themeMode } = useContext(ThemeContext);

  let currentTheme;

  if (themeMode === 'light') {
    currentTheme = lightTheme;
  } else if (themeMode === 'dark') {
    currentTheme = darkTheme;
  } else {
    currentTheme =
      systemTheme === 'dark'
        ? darkTheme
        : lightTheme;
  }

  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer theme={currentTheme}>
        {/* Navigator */}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}