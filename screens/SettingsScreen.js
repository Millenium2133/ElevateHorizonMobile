import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Dark Mode</Text>

      <Switch
        value={darkMode}
        onValueChange={() => setDarkMode(!darkMode)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});