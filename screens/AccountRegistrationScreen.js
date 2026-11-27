import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { createUser } from '../services/apiClient';
import ScreenHeader from '../components/ScreenHeader';
import { accountRegistrationStyles as styles } from '../styles/screenStyles';

export default function AccountRegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  const register = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await createUser({
        name: trimmedName,
        email: trimmedEmail,
        phone: phone.trim(),
      });
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
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          accessibilityLabel="Phone number (optional)"
          accessibilityHint="Enter a phone number, or leave this blank"
          autoComplete="tel"
          keyboardType="phone-pad"
          label="Phone (optional)"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
        <Button
          accessibilityLabel="Create community account"
          accessibilityHint="Submits your account details"
          mode="contained"
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={register}
        >
          Create Account
        </Button>
      </ScrollView>
    </>
  );
}
