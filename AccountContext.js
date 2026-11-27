import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@elevate-horizon/account';

export const AccountContext = createContext(null);

function parseAccount(value) {
  const parsed = JSON.parse(value);
  // Validate persisted fields before using them to prefill registration forms.
  if (
    typeof parsed !== 'object'
    || parsed === null
    || typeof parsed.name !== 'string'
    || typeof parsed.email !== 'string'
  ) {
    throw new Error('Saved account details have an invalid format.');
  }

  return {
    name: parsed.name,
    email: parsed.email,
    phone: typeof parsed.phone === 'string' ? parsed.phone : '',
  };
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadAccount = async () => {
      try {
        const storedAccount = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedAccount !== null && isMounted) {
          setAccount(parseAccount(storedAccount));
        }
      } catch (loadError) {
        console.error('Unable to load saved account details.', loadError);
        if (isMounted) setError(loadError);
      } finally {
        if (isMounted) setIsReady(true);
      }
    };

    loadAccount();
    return () => {
      isMounted = false;
    };
  }, []);

  const saveAccount = useCallback(async (profile) => {
    if (
      !profile
      || typeof profile.name !== 'string'
      || typeof profile.email !== 'string'
      || !profile.name.trim()
      || !profile.email.trim()
    ) {
      throw new Error('A name and email address are required to save this account.');
    }

    const savedAccount = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      phone: typeof profile.phone === 'string' ? profile.phone.trim() : '',
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedAccount));
    setAccount(savedAccount);
    setError(null);
  }, []);

  return (
    <AccountContext.Provider value={{ account, isReady, error, saveAccount }}>
      {children}
    </AccountContext.Provider>
  );
}
