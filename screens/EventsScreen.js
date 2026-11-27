import React, { useContext } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { EventsContext } from '../EventsContext';
import EventCardImage from '../components/EventCardImage';
import ScreenHeader from '../components/ScreenHeader';
import { eventsStyles as styles } from '../styles/screenStyles';

export default function EventsScreen({ navigation }) {
  const { colors } = useTheme();
  const { events, isLoading, error, refreshEvents } = useContext(EventsContext);

  const emptyList = (
    <View style={styles.status}>
      {isLoading ? (
        <ActivityIndicator accessibilityLabel="Loading events" />
      ) : error ? (
        <>
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            Couldn’t load events: {error.message}
          </Text>
          <Button
            accessibilityLabel="Retry loading events"
            onPress={refreshEvents}
          >
            Retry
          </Button>
        </>
      ) : (
        <Text variant="bodyLarge">There are no events to show.</Text>
      )}
    </View>
  );

  return (
    <>
      <ScreenHeader title="Community Events" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          contentContainerStyle={styles.list}
          data={events}
          keyExtractor={(item) => String(item.id)}
          refreshing={isLoading}
          onRefresh={refreshEvents}
          ListEmptyComponent={emptyList}
          ListHeaderComponent={error && events.length > 0 ? (
            <View style={styles.status}>
              <Text accessibilityRole="alert" style={{ color: colors.error }}>
                Couldn’t refresh events: {error.message}
              </Text>
              <Button
                accessibilityLabel="Retry loading events"
                onPress={refreshEvents}
              >
                Retry
              </Button>
            </View>
          ) : null}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.title}, ${item.displayDate} at ${item.location}`}
              accessibilityHint="Opens event details"
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            >
              <Card style={styles.card}>
                <EventCardImage event={item} />
                <Card.Content>
                  <Text variant="titleMedium">{item.title}</Text>
                  <Text>{item.displayDate} · {item.displayTime}</Text>
                  <Text>{item.location}</Text>
                </Card.Content>
              </Card>
            </Pressable>
          )}
        />
      </View>
    </>
  );
}
