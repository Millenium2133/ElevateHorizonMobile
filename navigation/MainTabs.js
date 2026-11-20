import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const icon = (active, inactive) => ({ focused, color, size }) => (
  <MaterialCommunityIcons name={focused ? active : inactive} size={size} color={color} />
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) =>
            descriptors[route.key].options.tabBarIcon?.({ focused, color, size: 24 }) ?? null
          }
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return options.tabBarLabel ?? options.title ?? route.name;
          }}
        />
      )}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ tabBarIcon: icon('home', 'home-outline') }} />
      <Tab.Screen name="Events" component={EventsScreen}
        options={{ tabBarIcon: icon('calendar', 'calendar-outline') }} />
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{ tabBarIcon: icon('cog', 'cog-outline') }} />
    </Tab.Navigator>
  );
}