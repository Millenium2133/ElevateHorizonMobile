import React, { useContext } from 'react';
import { View } from 'react-native';
import { RadioButton, Text, Card, useTheme } from 'react-native-paper';
import { ThemeContext } from '../ThemeContext';
import ScreenHeader from '../components/ScreenHeader';
import { settingsStyles as styles } from '../styles/screenStyles';

export default function SettingsScreen() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Settings" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Theme</Text>
            <RadioButton.Group onValueChange={setThemeMode} value={themeMode}>
              <RadioButton.Item label="System" value="system" />
              <RadioButton.Item label="Light" value="light" />
              <RadioButton.Item label="Dark" value="dark" />
            </RadioButton.Group>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}