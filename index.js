import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PermissionProvider } from './contexts/PermissionContext';
import TrackPlayer from 'react-native-track-player';
import { TrackPlayerContextProvider } from './contexts/TrackPlayerContext';

TrackPlayer.setupPlayer().then(() => console.log('ok')).catch((err) => console.log(err))

export const onRegisterPlayback = async() => {
    
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

 TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

 TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy())
}

const AppWrapper = () => {
  return (
    <PermissionProvider>
      <TrackPlayerContextProvider>
      <App />
      </TrackPlayerContextProvider>
    </PermissionProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppWrapper);
TrackPlayer.registerPlaybackService(() => onRegisterPlayback)
