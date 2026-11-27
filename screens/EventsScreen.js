import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import EventCardImage from '../components/EventCardImage';
import ScreenHeader from '../components/ScreenHeader';
import { events } from '../data/events';
import { eventsStyles as styles } from '../styles/screenStyles';

export default function EventsScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Community Events" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          contentContainerStyle={styles.list}
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.title}, ${item.date} at ${item.location}`}
              accessibilityHint="Opens event details"
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            >
              <Card style={styles.card}>
                <EventCardImage event={item} />
                <Card.Content>
                  <Text variant="titleMedium">{item.title}</Text>
                  <Text>{item.date} · {item.time}</Text>
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
