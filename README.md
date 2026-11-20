# Elevate Horizon Mobile

An MVP mobile app that lets residents browse, search and register for Elevate Horizon Connect's community events (yoga and walking clubs, trivia nights, movie screenings, live music and more).

Built with React Native (Expo) as part of TAFE NSW Assessment Event 2 (ICTPRG436, ICTPRG437, ICTICT449).

**Author:** Hamish Gordon
**Status:** In development, MVP build in progress

---

## Table of contents

- [About the project](#about-the-project)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Testing the app](#testing-the-app)
- [Project structure](#project-structure)
- [App navigation](#app-navigation)
- [Accessibility](#accessibility)
- [Data source](#data-source)
- [Project status and roadmap](#project-status-and-roadmap)

---

## About the project

Elevate Horizon Connect is a local council group running programs that strengthen community ties. Event information is currently managed through spreadsheets and email, which leads to confusion, delays and duplicated data, and staff spend too much time answering basic enquiries.

This app is a Minimum Viable Product (MVP) that simplifies how events are shared with the public. It is intended to demonstrate core functionality and gather feedback before a full release.

### Who is it for?

- **Primary audience:** residents and the general public, who browse and register for events.
- **Secondary audience:** council staff and volunteers, who benefit from reduced admin work. There is no staff or admin interface in this MVP; admin and authentication are out of scope for now.

---

## Features

- **Home screen:** a clear view of today's listed events
- **Events screen:** browse all events
- **Search and filter:** find events by keyword, category or date
- **Event details:** full information for a selected event
- **Event registration form:** register for an event in as few taps as possible, with a confirmation on submit
- **Settings screen:**
  - adjustable text size
  - light and dark theme toggle
  - sound on/off
  - settings persist between app launches
- **Loading, error and empty states:** a loading indicator while data is fetched, and an error screen with a Retry button if the fetch fails
- **Responsive layouts:** designed for both mobile (portrait) and tablet (landscape)

---

## Tech stack

| Purpose | Technology |
| --- | --- |
| Framework | [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) |
| Language | JavaScript |
| UI components | [React Native Paper](https://callstack.github.io/react-native-paper/) (Material Design, built-in light/dark theming) |
| Navigation | [React Navigation](https://reactnavigation.org/) (bottom tabs plus stack) |
| Settings storage | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) |
| Settings state | React Context |
| Data fetching | `fetch` with `async`/`await` |
| Icons | Material Community Icons (bundled with React Native Paper) |
| Version control | Git and GitHub |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended) and npm
- [Git](https://git-scm.com/)
- One of the following to run the app:
  - the **Expo Go** app on a phone (iOS or Android), or
  - an Android emulator or iOS simulator

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Millenium2133/ElevateHorizonMobile.git

# 2. Move into the project folder
cd ElevateHorizonMobile

# 3. Install dependencies
npm install

# 4. Start the Expo development server
npx expo start
```

### Running on a device or emulator

After `npx expo start`, a QR code appears in the terminal.

- **Physical device:** open Expo Go and scan the QR code. Your phone and computer must be on the same network.
- **Android emulator:** press `a` in the terminal.
- **iOS simulator (macOS only):** press `i` in the terminal.
- **Tablet or landscape layout:** rotate the device or emulator to landscape.

If your device cannot connect over the local network, try `npx expo start --tunnel`.

---

## Testing the app

Manual testing checklist:

1. **Home:** today's events are shown, and tapping an event card opens Event Details.
2. **Events:** all events are listed. Searching by keyword or date narrows the list, and clearing the search restores it.
3. **Event details:** the event information displays correctly, and the back arrow returns to the previous screen.
4. **Registration:** from Event Details, tap Register, fill in the form, submit and confirm that a confirmation appears. Leaving a required field empty should show a validation message. The back arrow cancels without submitting.
5. **Settings:** change the text size, switch between light and dark themes, and toggle sound. Changes apply straight away across every screen. Close and reopen the app to confirm the settings were saved.
6. **Loading and error states:** confirm a loading indicator appears while events load. Turn off the network connection and relaunch to confirm the error screen and Retry button work.
7. **Orientation:** rotate between portrait and landscape and confirm that layouts adapt without anything being cut off.

---

## Project structure

```text
ElevateHorizonMobile/
├── App.js                 # App entry point: providers and navigation
├── app.json               # Expo configuration
├── package.json
├── assets/                # Images, icons and sounds
└── src/
    ├── components/        # Reusable UI: EventCard, SearchBar, PrimaryButton, Loading, Error
    ├── context/           # Settings context (text size, theme, sound)
    ├── data/              # Mock event data
    ├── navigation/        # Tab and stack navigators
    ├── screens/           # Home, Events, EventDetails, Registration, Settings
    ├── services/          # Remote data fetching
    └── theme/             # Colours, font sizes and spacing in one place
```

---

## App navigation

The app uses a bottom tab bar for the main sections, with a stack navigator inside the tabs for screens that sit within a section.

- **Bottom tabs (always visible):** Home, Events, Settings
- **Home** shows today's events. Tapping an event card opens Event Details, and "View all events" goes to the Events tab.
- **Events** lists all events with search and filter. Tapping an event opens Event Details.
- **Event Details** has a Register button that opens the Registration form.
- **Registration** submits the form and shows a confirmation, then returns the user to Event Details or Events. The back arrow cancels without submitting.
- **Settings** is reachable from the tab bar on every screen.

In landscape (tablet), the tab bar moves to a side rail and the event list and details can sit side by side.

---

## Accessibility

Accessibility is a core goal of the app, so that it works for older users and people with disabilities:

- tap targets are at least 48x48 dp
- text and background colours meet WCAG AA contrast (4.5:1) in both light and dark themes
- interactive elements have `accessibilityLabel`s for screen readers
- text scales with the user's text size setting
- meaning is never conveyed by colour alone

---

## Data source

Event data is loaded in stages:

1. **Mock data** during the early build, so screens and navigation can be developed independently of the backend.
2. **Remote JSON endpoint** using `fetch` and `async`/`await`, with loading, error (with Retry) and empty states handled on each screen.

> **Note:** add the endpoint URL (or the name of the config file or constant where it is set) here once it is finalised.

---

## Project status and roadmap

**Current status:** in development, MVP build in progress.

| Milestone | Session | Status |
| --- | --- | --- |
| Kick-off and repository setup | 1 | Done |
| Wireframes and UI/UX interpretation | 2 | Done |
| Core build with navigation and mock data | 3 | In progress |
| Styling and remote data integration | 4 | Planned |
| Peer testing and fixes | 5 | Planned |
| Final polish, reflection and submission | 6 | Planned |

### Out of scope for the MVP

- Staff or admin interface, and authentication
- Publishing to app stores

---

## Version control

Work is committed regularly with clear, descriptive commit messages. The class teacher has been added as a collaborator on this repository.

---

## Acknowledgements

Built for **Elevate Horizon Connect** (a fictional client scenario) as part of the TAFE NSW Certificate IV in Information Technology (ICT40120). UI wireframe templates were provided by TAFE NSW and adapted to fix usability issues identified during planning.
