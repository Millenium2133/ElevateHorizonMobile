import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  introCard: {
    minHeight: 190,
    justifyContent: 'center',
  },
  introTitle: {
    marginBottom: 12,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventCard: {
    marginBottom: 4,
  },
  eventContent: {
    gap: 8,
  },
  eventHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const eventsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
});

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export const eventDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },
  description: {
    marginVertical: 10,
  },
});

export const registrationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
});

export const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const screenHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: '#424754',
  },
});

export const navigationStyles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#424754',
  },
});
