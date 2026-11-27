import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, Card } from 'react-native-paper';
import { ThemeContext } from '../ThemeContext';

export default function SettingsScreen() {
  const {
    themeMode,
    setThemeMode,
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">
            Theme
          </Text>

          <RadioButton.Group
            onValueChange={setThemeMode}
            value={themeMode}
          >
            <RadioButton.Item
              label="System"
              value="system"
            />

            <RadioButton.Item
              label="Light"
              value="light"
            />

            <RadioButton.Item
              label="Dark"
              value="dark"
            />
          </RadioButton.Group>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});