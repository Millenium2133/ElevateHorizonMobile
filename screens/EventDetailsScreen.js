import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { eventDetailsStyles as styles } from '../styles/screenStyles';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Event Details" navigation={navigation} showBack />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="headlineMedium">{event.title}</Text>
        {/* Use formatted API labels when present, with raw fixture values as fallback. */}
        <Text>Date: {event.displayDate ?? event.date}</Text>
        <Text>Time: {event.displayTime ?? event.time}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Category: {event.category}</Text>
        <Text>Spots Remaining: {event.spotsRemaining}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Button
          accessibilityLabel={`Register for ${event.title}`}
          accessibilityHint="Opens the event registration form"
          mode="contained"
          onPress={() => navigation.navigate('Registration', { event })}
        >
          Register
        </Button>
      </View>
    </>
  );
}