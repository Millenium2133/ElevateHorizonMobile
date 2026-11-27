import React, { createContext, useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { getEvents } from './services/apiClient';

const EVENT_REFRESH_INTERVAL_MS = 60_000;

export const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  // Share one event list and refresh state across Home and Events screens.
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshEvents = useCallback(async ({ showLoading = true } = {}) => {
    if (showLoading) setIsLoading(true);
    setError(null);

    try {
      setEvents(await getEvents());
    } catch (requestError) {
      console.error('Unable to load events.', requestError);
      setError(requestError);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  useEffect(() => {
    // Poll quietly while active; foregrounding also refreshes events immediately.
    const refreshInBackground = () => {
      if (AppState.currentState === 'active') {
        refreshEvents({ showLoading: false });
      }
    };
    const interval = setInterval(refreshInBackground, EVENT_REFRESH_INTERVAL_MS);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') refreshEvents({ showLoading: false });
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [refreshEvents]);

  return (
    <EventsContext.Provider value={{ events, isLoading, error, refreshEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
