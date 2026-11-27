import React, { useContext, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Card, Chip, Searchbar, Text, useTheme } from 'react-native-paper';
import { EventsContext } from '../EventsContext';
import EventCardImage from '../components/EventCardImage';
import ScreenHeader from '../components/ScreenHeader';
import { eventsStyles as styles } from '../styles/screenStyles';

function isPastEvent(event, now) {
  const [year, month, day] = event.date.split('-').map(Number);
  const [hours, minutes] = (event.endTime || event.startTime).split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes) < now;
}

export default function EventsScreen({ navigation }) {
  const { colors } = useTheme();
  const { events, isLoading, error, refreshEvents } = useContext(EventsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const now = new Date();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categories = [...new Set(
    events.map((event) => String(event.category ?? '').trim()).filter(Boolean)
  )].sort((left, right) => left.localeCompare(right));
  const filteredEvents = events.filter((event) => {
    if (isPastEvent(event, now) !== showPastEvents) return false;
    if (
      selectedCategory
      && String(event.category ?? '').toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }
    if (!normalizedQuery) return true;

    return [event.title, event.category]
      .some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery));
  });

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
        <Text variant="bodyLarge">
          {events.length === 0
            ? 'There are no events to show.'
            : showPastEvents
              ? 'No past events match your search.'
              : 'No upcoming events match your search.'}
        </Text>
      )}
    </View>
  );

  // Keep existing cards visible if refreshing fails, and show retry above them.
  return (
    <>
      <ScreenHeader title="Community Events" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.filters}>
          <Searchbar
            accessibilityLabel="Search events by name or category"
            placeholder="Search by name or category"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilters}
          >
            <Chip
              accessibilityLabel="Show all event categories"
              selected={!selectedCategory}
              onPress={() => setSelectedCategory(null)}
            >
              All
            </Chip>
            {categories.map((category) => (
              <Chip
                key={category}
                accessibilityLabel={`Filter by ${category}`}
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(
                  selectedCategory === category ? null : category
                )}
              >
                {category}
              </Chip>
            ))}
          </ScrollView>
          <Button
            accessibilityLabel={showPastEvents ? 'Show upcoming events' : 'Show past events'}
            accessibilityHint={showPastEvents
              ? 'Shows events that have not ended yet'
              : 'Shows events that have already ended'}
            icon={showPastEvents ? 'calendar-clock' : 'history'}
            mode="outlined"
            onPress={() => setShowPastEvents((current) => !current)}
          >
            {showPastEvents ? 'Show Upcoming Events' : 'Show Past Events'}
          </Button>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={filteredEvents}
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
          renderItem={({ item }) => {
            const isFull = item.spotsRemaining <= 0;

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${item.title}${isFull ? ', full' : ''}, ${item.displayDate} at ${item.location}`}
                accessibilityHint={isFull ? 'Shows that this event is full' : 'Opens event details'}
                onPress={() => {
                  if (isFull) {
                    Alert.alert('Event full', `${item.title} is full and no longer accepting registrations.`);
                    return;
                  }
                  navigation.navigate('EventDetails', { event: item });
                }}
              >
                <Card style={[styles.card, isFull && styles.fullCard]}>
                  <EventCardImage event={item} />
                  <Card.Content>
                    <Text variant="titleMedium">{item.title}</Text>
                    <Text>{item.displayDate} · {item.displayTime}</Text>
                    <Text>{item.location}</Text>
                    <Text>{item.spotsRemaining} spots remaining</Text>
                  </Card.Content>
                </Card>
              </Pressable>
            );
          }}
        />
      </View>
    </>
  );
}
