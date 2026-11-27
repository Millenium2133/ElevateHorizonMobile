import React, { useContext } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Text, useTheme } from 'react-native-paper';
import { EventsContext } from '../EventsContext';
import EventCardImage from '../components/EventCardImage';
import ScreenHeader from '../components/ScreenHeader';
import { homeStyles as styles } from '../styles/screenStyles';

function getUpcomingEvents(events) {
  const now = new Date();
  return events
    .filter((event) => {
      const [year, month, day] = event.date.split('-').map(Number);
      const [hours, minutes] = event.startTime.split(':').map(Number);
      // Build local date/time parts together so the event date is not shifted by UTC parsing.
      const startsAt = new Date(year, month - 1, day, hours, minutes);
      return !event.isCancelled && startsAt >= now;
    })
    // Home is a preview; the Events tab provides the complete list.
    .slice(0, 3);
}

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { events, isLoading, error, refreshEvents } = useContext(EventsContext);
  const upcomingEvents = getUpcomingEvents(events);

  return (
    <>
      <ScreenHeader title="Elevate Horizon" />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        <Card style={styles.introCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.introTitle}>
              Find your next community event
            </Text>
            <Text variant="bodyLarge">
              Meet people, learn something new, and get involved in your
              community.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.sectionHeading}>
          <Text variant="titleLarge">Upcoming events</Text>
          <Text
            variant="labelLarge"
            accessibilityRole="button"
            accessibilityLabel="View all community events"
            accessibilityHint="Opens the community events list"
            onPress={() => navigation.navigate('Events')}
          >
            View all
          </Text>
        </View>

        {isLoading && events.length === 0 && (
          <ActivityIndicator accessibilityLabel="Loading upcoming events" />
        )}

        {error && (
          <View style={styles.status}>
            <Text accessibilityRole="alert" style={{ color: colors.error }}>
              Couldn’t load events: {error.message}
            </Text>
            <Button
              accessibilityLabel="Retry loading events"
              disabled={isLoading}
              onPress={refreshEvents}
            >
              Retry
            </Button>
          </View>
        )}

        {!isLoading && !error && upcomingEvents.length === 0 && (
          <Text variant="bodyLarge">There are no upcoming events.</Text>
        )}

        {upcomingEvents.map((event) => {
          const isFull = event.spotsRemaining <= 0;

          return (
            <Pressable
              key={event.id}
              accessibilityRole="button"
              accessibilityLabel={`${event.title}${isFull ? ', full' : ''}, ${event.displayDate} at ${event.location}`}
              accessibilityHint={isFull ? 'Shows that this event is full' : 'Opens event details'}
              onPress={() => {
                if (isFull) {
                  Alert.alert('Event full', `${event.title} is full and no longer accepting registrations.`);
                  return;
                }
                navigation.navigate('EventDetails', { event });
              }}
            >
              <Card style={[styles.eventCard, isFull && styles.fullEventCard]}>
                <EventCardImage event={event} />
                <Card.Content style={styles.eventContent}>
                  <View style={styles.eventHeading}>
                    <Text variant="titleMedium" style={styles.eventTitle}>
                      {event.title}
                    </Text>
                    <Chip compact style={styles.eventCategory}>
                      {event.category}
                    </Chip>
                  </View>
                  <Text variant="bodyMedium">
                    {event.displayDate} · {event.displayTime}
                  </Text>
                  <Text variant="bodyMedium">{event.location}</Text>
                  <Text variant="bodySmall">
                    {event.spotsRemaining} spots remaining
                  </Text>
                </Card.Content>
              </Card>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}
