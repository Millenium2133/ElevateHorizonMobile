import React, { useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { AccountContext } from '../AccountContext';
import { createRegistration } from '../services/apiClient';
import ScreenHeader from '../components/ScreenHeader';
import { registrationStyles as styles } from '../styles/screenStyles';

export default function RegistrationScreen({ route, navigation }) {
  const { event } = route.params;
  const { account, isReady: accountIsReady } = useContext(AccountContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    if (!accountIsReady || !account) return;
    setName(account.name);
    setEmail(account.email);
  }, [account, accountIsReady]);

  const register = async () => {
    // Ignore surrounding whitespace so it cannot satisfy required-field checks.
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
    // Keep unavailable events from being submitted even if this handler runs directly.
    if (event.isCancelled || event.spotsRemaining <= 0) {
      setError('This event is no longer accepting registrations.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      // The MVP endpoint requires name and email at the top level of the request.
      await createRegistration({
        eventId: event.id,
        name: trimmedName,
        email: trimmedEmail,
      });
      Alert.alert(
        'Registration submitted',
        `You are registered for ${event.title}.`,
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
      <ScreenHeader title="Registration" navigation={navigation} showBack />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="titleMedium">Register for {event.title}</Text>
        {!accountIsReady ? (
          <Text variant="bodySmall">Loading saved account details...</Text>
        ) : account ? (
          <Text variant="bodySmall">Saved account details are filled in; you can edit them.</Text>
        ) : null}
        {error && (
          <Text accessibilityRole="alert" style={{ color: colors.error }}>
            {error}
          </Text>
        )}
        <TextInput
          accessibilityLabel="Full name"
          accessibilityHint="Enter the name for this event registration"
          disabled={!accountIsReady}
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          accessibilityLabel="Email address"
          accessibilityHint="Enter your email address"
          label="Email"
          disabled={!accountIsReady}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          style={styles.input}
        />
        <Button
          accessibilityLabel="Submit registration"
          accessibilityHint="Submits your event registration"
          mode="contained"
          loading={isSubmitting}
          disabled={!accountIsReady || isSubmitting || event.isCancelled || event.spotsRemaining <= 0}
          onPress={register}
        >
          Submit Registration
        </Button>
      </View>
    </>
  );
}