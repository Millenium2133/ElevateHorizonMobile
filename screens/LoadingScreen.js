import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
