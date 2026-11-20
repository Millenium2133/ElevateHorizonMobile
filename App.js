import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import MainTabs from './navigation/MainTabs';
import EventDetailsScreen from './screens/EventDetailsScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
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