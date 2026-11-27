import { StyleSheet } from 'react-native';

// Shared style groups keep screen layout definitions out of the rendering components.
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
  fullEventCard: {
    opacity: 0.5,
  },
  eventContent: {
    gap: 8,
  },
  eventHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventTitle: {
    flex: 1,
    minWidth: 0,
  },
  eventCategory: {
    flexShrink: 0,
  },
  status: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
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
  fullCard: {
    opacity: 0.5,
  },
  status: {
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
});

export const eventCardImageStyles = StyleSheet.create({
  image: {
    width: '100%',
    height: 96,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export const settingsStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 16,
  },
  audioControl: {
    marginTop: 16,
  },
  audioToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  audioLabel: {
    flex: 1,
    marginRight: 12,
  },
  accountDescription: {
    marginVertical: 12,
  },
  volumeLabel: {
    marginTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
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

export const accountRegistrationStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 12,
  },
  input: {
    marginTop: 4,
  },
});

export const accountStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 16,
  },
  cardContent: {
    gap: 12,
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

export const appAudioStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
