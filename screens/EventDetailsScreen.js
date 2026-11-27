import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">{event.title}</Text>

      <Text>Date: {event.date}</Text>
      <Text>Time: {event.time}</Text>
      <Text>Location: {event.location}</Text>
      <Text>Category: {event.category}</Text>
      <Text>Spots Remaining: {event.spotsRemaining}</Text>

      <Text style={styles.description}>
        {event.description}
      </Text>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('Registration', { event })
        }
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  description: {
    marginVertical: 10,
  },
});