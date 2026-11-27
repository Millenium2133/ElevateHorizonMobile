import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { eventDetailsStyles as styles } from '../styles/screenStyles';

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Event Details" navigation={navigation} showBack />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="headlineMedium">{event.title}</Text>
        <Text>Date: {event.date}</Text>
        <Text>Time: {event.time}</Text>
        <Text>Location: {event.location}</Text>
        <Text>Category: {event.category}</Text>
        <Text>Spots Remaining: {event.spotsRemaining}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Registration', { event })}
        >
          Register
        </Button>
      </View>
    </>
  );
}