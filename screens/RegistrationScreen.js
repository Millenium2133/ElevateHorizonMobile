import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function RegistrationScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const register = () => {
    Alert.alert(
      'Success',
      'Registration submitted successfully.'
    );
  };

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
});