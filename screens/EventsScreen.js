import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { events } from '../data/events';

export default function EventsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Community Events" />
      </Appbar.Header>

      <FlatList
        contentContainerStyle={styles.list}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate('EventDetails', {
                event: item,
              })
            }
          >
            <Card.Content>
              <Text variant="titleMedium">
                {item.title}
              </Text>

              <Text>{item.date}</Text>
              <Text>{item.location}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
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
