import React, { createContext, useCallback, useEffect, useState } from 'react';
import { getEvents } from './services/apiClient';

export const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setEvents(await getEvents());
    } catch (requestError) {
      console.error('Unable to load events.', requestError);
      setError(requestError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  return (
    <EventsContext.Provider value={{ events, isLoading, error, refreshEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
