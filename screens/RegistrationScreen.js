import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { colors } = useTheme();

  const register = () => {
    Alert.alert(
      'Success',
      'Registration submitted successfully.'
    );
  };

  return (
    <>
      <ScreenHeader title="Registration" navigation={navigation} showBack />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Button mode="contained" onPress={register}>
          Submit Registration
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
});