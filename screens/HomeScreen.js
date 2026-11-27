import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip, Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { events } from '../data/events';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();

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
            onPress={() => navigation.navigate('Events')}
          >
            View all
          </Text>
        </View>

        {events.map((event) => (
          <Card
            key={event.id}
            style={styles.eventCard}
            onPress={() => navigation.navigate('EventDetails', { event })}
            accessibilityLabel={`${event.title}, ${event.date} at ${event.location}`}
          >
            <Card.Content style={styles.eventContent}>
              <View style={styles.eventHeading}>
                <Text variant="titleMedium">{event.title}</Text>
                <Chip compact>{event.category}</Chip>
              </View>
              <Text variant="bodyMedium">{event.date} · {event.time}</Text>
              <Text variant="bodyMedium">{event.location}</Text>
              <Text variant="bodySmall">
                {event.spotsRemaining} spots remaining
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  introCard: {
    minHeight: 190,
    justifyContent: 'center',
  },
  introTitle: {
    marginBottom: 12,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventCard: {
    marginBottom: 4,
  },
  eventContent: {
    gap: 8,
  },
  eventHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
