import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Card, Chip, Text, useTheme } from 'react-native-paper';
import EventCardImage from '../components/EventCardImage';
import ScreenHeader from '../components/ScreenHeader';
import { events } from '../data/events';
import { homeStyles as styles } from '../styles/screenStyles';

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
            accessibilityLabel="View all community events"
            accessibilityHint="Opens the community events list"
            onPress={() => navigation.navigate('Events')}
          >
            View all
          </Text>
        </View>

        {events.map((event) => (
          <Pressable
            key={event.id}
            accessibilityRole="button"
            accessibilityLabel={`${event.title}, ${event.date} at ${event.location}`}
            accessibilityHint="Opens event details"
            onPress={() => navigation.navigate('EventDetails', { event })}
          >
            <Card style={styles.eventCard}>
              <EventCardImage event={event} />
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
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
