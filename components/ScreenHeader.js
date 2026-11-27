import React from 'react';
import { Appbar } from 'react-native-paper';
import { screenHeaderStyles } from '../styles/screenStyles';

export default function ScreenHeader({ title, navigation, showBack = false }) {
  return (
    <Appbar.Header mode="small" style={screenHeaderStyles.header}>
      {showBack && (
        <Appbar.BackAction
          accessibilityLabel={`Go back from ${title}`}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
      )}
      <Appbar.Content title={title} color="#FFFFFF" />
    </Appbar.Header>
  );
}
