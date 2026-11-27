import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { events } from '../data/events';

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
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('EventDetails', { event: item })}
            >
              <Card.Content>
                <Text variant="titleMedium">{item.title}</Text>
                <Text>{item.date} · {item.time}</Text>
                <Text>{item.location}</Text>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    padding: 16,
  },

  card: {
    marginBottom: 12,
  },
});
