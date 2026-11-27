import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './theme';
import { ThemeContext, ThemeProvider } from './ThemeContext';

import MainTabs from './navigation/MainTabs';
import EventDetailsScreen from './screens/EventDetailsScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const colorScheme = useColorScheme();
  const { themeMode } = useContext(ThemeContext);
  const isDark = themeMode === 'system'
    ? colorScheme === 'dark'
    : themeMode === 'dark';
  const activeTheme = isDark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={activeTheme}>
      <NavigationContainer theme={activeTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
