import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';
import { registrationStyles as styles } from '../styles/screenStyles';

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
          accessibilityLabel="Full name"
          accessibilityHint="Enter the name for this event registration"
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          accessibilityLabel="Email address"
          accessibilityHint="Enter your email address"
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Button
          accessibilityLabel="Submit registration"
          accessibilityHint="Submits your event registration"
          mode="contained"
          onPress={register}
        >
          Submit Registration
        </Button>
      </View>
    </>
  );
}