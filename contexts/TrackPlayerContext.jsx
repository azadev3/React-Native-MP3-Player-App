import React, { useState, useEffect, createContext, useMemo } from "react";
import TrackPlayer, { Event } from "react-native-track-player";
import RNFS from 'react-native-fs';

export const TrackPlayerContext = createContext();

export const TrackPlayerContextProvider = ({children}) => {

    const [musicList, setMusicList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [nowPlayingMusicModal, setNowPlayingMusicModal] = useState(false);
    const [currentTrack, setCurrentTrack] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    
    const openPlayingScreen = () => {
      setNowPlayingMusicModal(!nowPlayingMusicModal);
    };

    useEffect(() => {
      const listFiles = async () => {
        try {
          const storage1 = RNFS.ExternalStorageDirectoryPath + '/snaptube/download/SnapTube Audio';
          const storage2 = RNFS.ExternalStorageDirectoryPath + '/download';
          const file = await RNFS.readDir(storage1);
          const file2 = await RNFS.readdir(storage2);
          const MusicFiles = [...file, ...file2].filter(
            item => item.name.endsWith('.mp3') || item.name.endsWith('.mp4') 
            || item.name.endsWith('.m4a') || item.name.endsWith('.mkv'),
          ).map(item => {
            let itemName = item.name.replace('.m4a', '').replace('(MP3_160K)', '');
            return { ...item, name: itemName };
          });    
          let counterID = 1;
          const musicList = MusicFiles.map(item => ({
            id: counterID++,
            name: item.name.replace('.mp3', '').replace('.mp4', ''),
            path: `file://${item.path}`,
          }));
          setMusicList(musicList);
        } catch (error) {
          console.log(error);
        }
      }
      listFiles(); 
    }, []); 

  
    const playMusic = async musicList => {
      setOpenModal(true);
      setIsPlaying(true);
      await TrackPlayer.reset();

      await TrackPlayer.add({
        url: `file://${musicList.path}`,
        title: musicList.name,
        id: musicList.id,
      });
      await TrackPlayer.play();
      setCurrentTrack(musicList);
      const trackDuration = await TrackPlayer.getDuration();
      const hours = Math.floor(trackDuration / 3600); // Saat
      const minutes = Math.floor((trackDuration % 3600) / 60); // Deqiqe
      const seconds = Math.floor(trackDuration % 60); // Saniye

      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
   
    };
    const togglePlayPause = async () => {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      setIsPlaying(!isPlaying);
    };

    
    


    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
          'playback-track-changed',
          async event => {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            if (track) {
              setCurrentTrack(track);
            }
          },
        );
        return () => {
          listener.remove();
        };
      }, []);

    

      
    return (
        <TrackPlayerContext.Provider 
        value={{ 
            musicList, 
            openModal, 
            nowPlayingMusicModal,
            currentTrack, 
            isPlaying,
            hours,
            minutes,
            seconds,
            playMusic,
            togglePlayPause,
            setOpenModal,
            openPlayingScreen,
            setNowPlayingMusicModal,
            setCurrentTrack
            }}>
            {children}
        </TrackPlayerContext.Provider>
    )
}