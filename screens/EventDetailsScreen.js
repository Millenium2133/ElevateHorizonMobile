import React, { useContext } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { EventsContext } from '../EventsContext';
import ScreenHeader from '../components/ScreenHeader';
import { eventDetailsStyles as styles } from '../styles/screenStyles';

export default function EventDetailsScreen({ route, navigation }) {
  const { event: routeEvent } = route.params;
  const { events } = useContext(EventsContext);
  const event = events.find((item) => String(item.id) === String(routeEvent.id)) ?? routeEvent;
  const isFull = event.spotsRemaining <= 0;
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
        {isFull && (
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            This event is full and no longer accepting registrations.
          </Text>
        )}
        <Text style={styles.description}>{event.description}</Text>
        <Button
          accessibilityLabel={isFull ? `${event.title} is full` : `Register for ${event.title}`}
          accessibilityHint={isFull ? 'Shows that this event is full' : 'Opens the event registration form'}
          mode="contained"
          onPress={() => {
            if (isFull) {
              Alert.alert('Event full', `${event.title} is full and no longer accepting registrations.`);
              return;
            }
            navigation.navigate('Registration', { event });
          }}
        >
          {isFull ? 'Event Full' : 'Register'}
        </Button>
      </View>
    </>
  );
}