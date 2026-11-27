import React, { useContext, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AccountContext } from '../AccountContext';
import { createUser } from '../services/apiClient';
import ScreenHeader from '../components/ScreenHeader';
import { accountRegistrationStyles as styles } from '../styles/screenStyles';

export default function AccountRegistrationScreen({ navigation }) {
  const { saveAccount } = useContext(AccountContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serverCreatedProfile, setServerCreatedProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  const register = async () => {
    // Trim user input before validating and sending it to the API.
    const profile = serverCreatedProfile ?? {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    if (!profile.name) {
      setError('Enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setError('Enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      if (!serverCreatedProfile) {
        // The backend assigns account roles; the client only submits contact details.
        await createUser(profile);
        setServerCreatedProfile(profile);
      }

      try {
        await saveAccount(profile);
      } catch (storageError) {
        console.error('Account created, but could not be saved on this device.', storageError);
        setError('Account created, but it could not be saved on this device. Try saving again.');
        return;
      }

      Alert.alert(
        'Account created',
        'Your community member account has been created.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ScreenHeader title="Create Account" navigation={navigation} showBack />
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text variant="bodyMedium">
          Create a community member account to register for events.
        </Text>
        {error && (
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            {error}
          </Text>
        )}
        <TextInput
          accessibilityLabel="Full name"
          accessibilityHint="Enter your name"
          autoComplete="name"
          disabled={isSubmitting || Boolean(serverCreatedProfile)}
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          accessibilityLabel="Email address"
          accessibilityHint="Enter your email address"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          disabled={isSubmitting || Boolean(serverCreatedProfile)}
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          accessibilityLabel="Phone number (optional)"
          accessibilityHint="Enter a phone number, or leave this blank"
          autoComplete="tel"
          disabled={isSubmitting || Boolean(serverCreatedProfile)}
          keyboardType="phone-pad"
          label="Phone (optional)"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
        <Button
          accessibilityLabel={serverCreatedProfile ? 'Save account on this device' : 'Create community account'}
          accessibilityHint={serverCreatedProfile
            ? 'Saves the already-created account on this device'
            : 'Submits your account details'}
          mode="contained"
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={register}
        >
          {serverCreatedProfile ? 'Retry Saving Account' : 'Create Account'}
        </Button>
      </ScrollView>
    </>
  );
}
