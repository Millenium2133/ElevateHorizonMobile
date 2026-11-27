import React from 'react';
import { Image } from 'react-native';
import { getEventImage } from '../data/eventImages';
import { eventCardImageStyles } from '../styles/screenStyles';

export default function EventCardImage({ event }) {
  const source = getEventImage(event);
  if (!source) return null;

  // The parent card already announces event details to screen readers.
  return (
    <Image
      source={source}
      style={eventCardImageStyles.image}
      resizeMode="cover"
      accessible={false}
      importantForAccessibility="no"
    />
  );
}
