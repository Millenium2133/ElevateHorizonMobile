import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
