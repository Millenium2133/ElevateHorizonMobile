# Elevate Horizon Mobile

An MVP mobile app that lets residents browse, search and register for Elevate Horizon Connect's community events (yoga, walking clubs, trivia nights, movie screenings and more). It replaces the council's spreadsheet-and-email process.

Built for TAFE NSW Assessment Event 2 (ICTPRG436, ICTPRG437, ICTICT449).

**Author:** Hamish Gordon
**Status:** In development, MVP build in progress

## Features

- View today's events and all events
- Search and filter by keyword or date
- Event details and a registration form with confirmation
- Community member account registration
- Settings: light/dark theme and independent background-music and tap-sound volume/on-off controls (saved between launches)
- Loading and error states, with a Retry button
- Portrait (mobile) and landscape (tablet) layouts

## Tech stack

- React Native (Expo), JavaScript
- React Native Paper (UI) and React Navigation (tabs and stack)
- AsyncStorage (saved settings)
- REST API via `fetch` (`GET /events`, `POST /registrations`, `POST /users`), configurable with `EXPO_PUBLIC_API_URL`
- Git and GitHub

## Getting started

You need Node.js and either the Expo Go app on your phone or an Android/iOS emulator.

```bash
git clone https://github.com/Millenium2133/ElevateHorizonConnect_MVP_Mobile_Hamish.git
cd ElevateHorizonConnect_MVP_Mobile_Hamish
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) or `i` (iOS) to open an emulator.
The API defaults to `https://grmobile.onrender.com`; set `EXPO_PUBLIC_API_URL` to use another backend.

## Navigation

A bottom tab bar holds **Home**, **Events** and **Settings**. Tapping an event opens **Event Details**, which has a Register button that opens the **Registration** form.

## Accessibility

Tap targets are at least 48x48 dp, text meets WCAG AA contrast in both themes, text size follows the user's setting, and interactive elements have screen reader labels.