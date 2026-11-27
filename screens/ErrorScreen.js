import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { errorStyles as styles } from '../styles/screenStyles';

export default function ErrorScreen() {
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Error" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="headlineSmall">Error</Text>
      </View>
    </>
  );
}
