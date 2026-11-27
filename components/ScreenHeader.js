import React from 'react';
import { Appbar } from 'react-native-paper';

export default function ScreenHeader({ title, navigation, showBack = false }) {
  return (
    <Appbar.Header mode="small" style={{ backgroundColor: '#424754' }}>
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
