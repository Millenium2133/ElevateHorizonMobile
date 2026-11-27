import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { AccountContext } from '../AccountContext';
import ScreenHeader from '../components/ScreenHeader';
import { accountStyles as styles } from '../styles/screenStyles';

export default function AccountScreen({ navigation }) {
  const { account } = useContext(AccountContext);
  const { colors } = useTheme();

  return (
    <>
      <ScreenHeader title="Account" navigation={navigation} showBack />
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.container}
      >
        <Card>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge">Account details</Text>
            {account ? (
              <>
                <Text variant="titleMedium">{account.name}</Text>
                <Text>{account.email}</Text>
                {account.phone ? <Text>{account.phone}</Text> : null}
              </>
            ) : (
              <>
                <Text>No account is saved on this device.</Text>
                <Button
                  accessibilityLabel="Create a community account"
                  onPress={() => navigation.navigate('AccountRegistration')}
                >
                  Create Account
                </Button>
              </>
            )}
          </Card.Content>
        </Card>

        {account && (
          <Card>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge">Event registrations</Text>
              {/* Keep the requested actions visible but unavailable until the API can scope them to this account. */}
              <Text>
                Viewing and cancelling registrations will be available when the
                backend provides account-specific registration endpoints.
              </Text>
              <Button
                accessibilityLabel="View registered events, not available yet"
                disabled
                mode="outlined"
              >
                View Registered Events
              </Button>
              <Button
                accessibilityLabel="Cancel registrations, not available yet"
                disabled
                mode="outlined"
              >
                Cancel Registrations
              </Button>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </>
  );
}
