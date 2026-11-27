import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { navigationStyles } from '../styles/screenStyles';

const Tab = createBottomTabNavigator();

const icon = (active, inactive) => ({ focused, color, size }) => (
  <MaterialCommunityIcons name={focused ? active : inactive} size={size} color={color} />
);

export default function MainTabs() {
  // Adapt React Navigation's tab events and labels to the Paper bottom bar.
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          style={navigationStyles.bottomBar}
          activeColor="#FFFFFF"
          inactiveColor="#D7DAE0"
          getAccessibilityLabel={({ route }) =>
            descriptors[route.key].options.tabBarAccessibilityLabel ?? route.name
          }
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
        options={{
          tabBarAccessibilityLabel: 'Home tab',
          tabBarIcon: icon('home', 'home-outline'),
        }} />
      <Tab.Screen name="Events" component={EventsScreen}
        options={{
          tabBarAccessibilityLabel: 'Events tab',
          tabBarIcon: icon('calendar', 'calendar-outline'),
        }} />
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarAccessibilityLabel: 'Settings tab',
          tabBarIcon: icon('cog', 'cog-outline'),
        }} />
    </Tab.Navigator>
  );
}