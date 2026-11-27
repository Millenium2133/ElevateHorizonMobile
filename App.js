import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import { lightTheme, darkTheme } from './theme';
import { ThemeProvider, ThemeContext } from './ThemeContext';

import MainTabs from './navigation/MainTabs';
import EventDetailsScreen from './screens/EventDetailsScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  const systemTheme = useColorScheme();

  const { themeMode } = useContext(ThemeContext);

  let activeTheme;

  if (themeMode === 'light') {
    activeTheme = lightTheme;
  } else if (themeMode === 'dark') {
    activeTheme = darkTheme;
  } else {
    activeTheme =
      systemTheme === 'dark'
        ? darkTheme
        : lightTheme;
  }

  return (
    <PaperProvider theme={activeTheme}>
      <NavigationContainer theme={activeTheme}>
        <StatusBar
          style={
            activeTheme === darkTheme
              ? 'light'
              : 'dark'
          }
        />

        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{ title: 'Event Details' }}
          />

          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ title: 'Registration' }}
          />
        </Stack.Navigator>
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