import React, { createContext, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@elevate-horizon/audio-settings';
const DEFAULT_SETTINGS = {
  musicEnabled: true,
  musicVolume: 0.1,
  tapEnabled: true,
  tapVolume: 1,
};

const clampVolume = (value, fallback) => (
  typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(1, value))
    : fallback
);

function parseSettings(value) {
  const parsed = JSON.parse(value);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Stored audio settings must be an object.');
  }

  return {
    musicEnabled: typeof parsed.musicEnabled === 'boolean'
      ? parsed.musicEnabled
      : DEFAULT_SETTINGS.musicEnabled,
    musicVolume: clampVolume(parsed.musicVolume, DEFAULT_SETTINGS.musicVolume),
    tapEnabled: typeof parsed.tapEnabled === 'boolean'
      ? parsed.tapEnabled
      : DEFAULT_SETTINGS.tapEnabled,
    tapVolume: clampVolume(parsed.tapVolume, DEFAULT_SETTINGS.tapVolume),
  };
}

export const AudioSettingsContext = createContext(null);

export function AudioSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedSettings !== null && isMounted) {
          setSettings(parseSettings(storedSettings));
        }
      } catch (error) {
        console.error('Unable to load audio settings.', error);
      } finally {
        if (isMounted) setIsReady(true);
      }
    };

    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return undefined;

    const timeout = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch((error) => {
        console.error('Unable to save audio settings.', error);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [isReady, settings]);

  const updateSettings = useCallback((updates) => {
    setSettings((current) => ({
      ...current,
      ...updates,
      ...(updates.musicVolume !== undefined
        ? { musicVolume: clampVolume(updates.musicVolume, current.musicVolume) }
        : {}),
      ...(updates.tapVolume !== undefined
        ? { tapVolume: clampVolume(updates.tapVolume, current.tapVolume) }
        : {}),
    }));
  }, []);

  return (
    <AudioSettingsContext.Provider value={{ settings, updateSettings, isReady }}>
      {children}
    </AudioSettingsContext.Provider>
  );
}
