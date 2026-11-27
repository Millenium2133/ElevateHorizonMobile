import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button, Card, RadioButton, Switch, Text, useTheme } from 'react-native-paper';
import { AudioSettingsContext } from '../AudioSettingsContext';
import { ThemeContext } from '../ThemeContext';
import ScreenHeader from '../components/ScreenHeader';
import { settingsStyles as styles } from '../styles/screenStyles';

export default function SettingsScreen({ navigation }) {
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const { settings, updateSettings, isReady } = useContext(AudioSettingsContext);
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Settings" />
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.container}
      >
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Theme</Text>
            <RadioButton.Group onValueChange={setThemeMode} value={themeMode}>
              <RadioButton.Item
                accessibilityLabel="System theme"
                label="System"
                value="system"
              />
              <RadioButton.Item
                accessibilityLabel="Light theme"
                label="Light"
                value="light"
              />
              <RadioButton.Item
                accessibilityLabel="Dark theme"
                label="Dark"
                value="dark"
              />
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Text variant="titleLarge">Audio</Text>

            <View style={styles.audioControl}>
              <View style={styles.audioToggleRow}>
                <View style={styles.audioLabel}>
                  <Text variant="titleMedium">Background music</Text>
                  <Text variant="bodySmall">Music while you use the app</Text>
                </View>
                <Switch
                  accessibilityLabel="Enable background music"
                  accessibilityHint="Turns background music on or off"
                  disabled={!isReady}
                  value={settings.musicEnabled}
                  onValueChange={(musicEnabled) => updateSettings({ musicEnabled })}
                />
              </View>
              <Text variant="labelLarge" style={styles.volumeLabel}>
                Volume: {Math.round(settings.musicVolume * 100)}%
              </Text>
              {isReady ? (
                <Slider
                  accessibilityLabel={`Background music volume, ${Math.round(settings.musicVolume * 100)} percent`}
                  accessibilityHint="Adjusts the background music volume"
                  disabled={!settings.musicEnabled}
                  maximumTrackTintColor={colors.outlineVariant}
                  maximumValue={1}
                  minimumTrackTintColor={colors.primary}
                  minimumValue={0}
                  onValueChange={(musicVolume) => updateSettings({ musicVolume })}
                  step={0.01}
                  style={styles.slider}
                  thumbTintColor={colors.primary}
                  value={settings.musicVolume}
                />
              ) : (
                <Text variant="bodySmall">Loading saved audio settings...</Text>
              )}
            </View>

            <View style={styles.audioControl}>
              <View style={styles.audioToggleRow}>
                <View style={styles.audioLabel}>
                  <Text variant="titleMedium">Tap sounds</Text>
                  <Text variant="bodySmall">Sound when you tap the screen</Text>
                </View>
                <Switch
                  accessibilityLabel="Enable tap sounds"
                  accessibilityHint="Turns tap sounds on or off"
                  disabled={!isReady}
                  value={settings.tapEnabled}
                  onValueChange={(tapEnabled) => updateSettings({ tapEnabled })}
                />
              </View>
              <Text variant="labelLarge" style={styles.volumeLabel}>
                Volume: {Math.round(settings.tapVolume * 100)}%
              </Text>
              {isReady ? (
                <Slider
                  accessibilityLabel={`Tap sound volume, ${Math.round(settings.tapVolume * 100)} percent`}
                  accessibilityHint="Adjusts the tap sound volume"
                  disabled={!settings.tapEnabled}
                  maximumTrackTintColor={colors.outlineVariant}
                  maximumValue={1}
                  minimumTrackTintColor={colors.primary}
                  minimumValue={0}
                  onValueChange={(tapVolume) => updateSettings({ tapVolume })}
                  step={0.01}
                  style={styles.slider}
                  thumbTintColor={colors.primary}
                  value={settings.tapVolume}
                />
              ) : (
                <Text variant="bodySmall">Loading saved audio settings...</Text>
              )}
            </View>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Text variant="titleLarge">Account</Text>
            <Text variant="bodyMedium" style={styles.accountDescription}>
              Create an account to register for community events.
            </Text>
            <Button
              accessibilityLabel="Create a community account"
              onPress={() => navigation.navigate('AccountRegistration')}
              mode="contained"
            >
              Create Account
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}