import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { AudioSettingsContext } from '../AudioSettingsContext';
import { appAudioStyles } from '../styles/screenStyles';

const musicSource = require('../sounds/Music.mp3');
const tapSource = require('../sounds/Tap.mp3');

export default function AppAudio({ children }) {
  const musicPlayer = useAudioPlayer(musicSource);
  const tapPlayer = useAudioPlayer(tapSource);
  const touchStart = useRef(null);
  const audioModeReady = useRef(false);
  const { settings, isReady } = useContext(AudioSettingsContext);
  // The app-state listener reads this ref without needing to be recreated for each setting change.
  const shouldPlayMusic = useRef(false);
  shouldPlayMusic.current = isReady && settings.musicEnabled && settings.musicVolume > 0;

  useEffect(() => {
    let isMounted = true;
    musicPlayer.loop = true;

    const appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && audioModeReady.current && shouldPlayMusic.current) {
        musicPlayer.play();
      } else {
        musicPlayer.pause();
      }
    });

    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'mixWithOthers',
    })
      .then(() => {
        audioModeReady.current = true;
        if (
          isMounted
          && AppState.currentState === 'active'
          && shouldPlayMusic.current
        ) {
          musicPlayer.play();
        }
      })
      .catch((error) => {
        console.error('Unable to initialize background music.', error);
      });

    return () => {
      isMounted = false;
      audioModeReady.current = false;
      appStateSubscription.remove();
      musicPlayer.pause();
    };
  }, [musicPlayer]);

  useEffect(() => {
    musicPlayer.volume = isReady && settings.musicEnabled ? settings.musicVolume : 0;
    if (!shouldPlayMusic.current) {
      musicPlayer.pause();
    } else if (audioModeReady.current && AppState.currentState === 'active') {
      musicPlayer.play();
    }
  }, [musicPlayer, isReady, settings.musicEnabled, settings.musicVolume]);

  useEffect(() => {
    tapPlayer.volume = isReady && settings.tapEnabled ? settings.tapVolume : 0;
  }, [tapPlayer, isReady, settings.tapEnabled, settings.tapVolume]);

  const playTap = useCallback(() => {
    if (!isReady || !settings.tapEnabled || settings.tapVolume <= 0) return;

    tapPlayer
      .seekTo(0)
      .then(() => tapPlayer.play())
      .catch((error) => {
        console.error('Unable to play the tap sound.', error);
      });
  }, [tapPlayer, isReady, settings.tapEnabled, settings.tapVolume]);

  const handleTouchStart = useCallback(({ nativeEvent }) => {
    touchStart.current = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
      time: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback(({ nativeEvent }) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    // Ignore drags and long presses so scrolling does not trigger tap audio.
    const moved = Math.hypot(nativeEvent.pageX - start.x, nativeEvent.pageY - start.y) > 12;
    const wasQuick = Date.now() - start.time < 500;
    if (!moved && wasQuick) playTap();
  }, [playTap]);

  return (
    <View
      style={appAudioStyles.container}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
    >
      {children}
    </View>
  );
}
