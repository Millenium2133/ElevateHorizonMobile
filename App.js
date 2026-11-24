import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './theme';

import MainTabs from './navigation/MainTabs';
import EventDetailsScreen from './screens/EventDetailsScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const activeTheme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={activeTheme}>
      <NavigationContainer theme={activeTheme}>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
