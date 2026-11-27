import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { loadingStyles as styles } from '../styles/screenStyles';

export default function LoadingScreen() {
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Loading" />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="headlineSmall">Loading</Text>
      </View>
    </>
  );
}
