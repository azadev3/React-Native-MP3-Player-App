import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  PanResponder,
  Animated
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {colors} from '../config/colors';
import MusicsTop from '../config/MusicsTop';
import Modal from './MusicsUitils/Modal';
import { TrackPlayerContext } from '../contexts/TrackPlayerContext';
import PlayingScreenModal from './MusicsUitils/PlayingScreenModal';

export default function Musics({artistName}) {

  const {
    nowPlayingMusicModal,
    openPlayingScreen,
    musicList, 
    openModal, 
    currentTrack, 
    playMusic,
  } = useContext(TrackPlayerContext);

  return (
    <View style={{backgroundColor: colors.BackgroundColor,}}>
      <MusicsTop />
      <FlatList
        style={{height: openModal ? 550 : null}}
        data={musicList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => playMusic(item)}>
              <View
                style={styles.musicListContainer}
              >
              <Image
                source={require('../assets/images/logoo.png')}
                style={{width: 40, height: 40, borderRadius: 100}}
              />

              <View 
              style={[styles.mscList,]}>
                <Text style={[styles.MusicTitles,]}>{item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>Artist: {artistName}</Text>
                  <Text style={{paddingHorizontal: 20}}>
                    Cover: {artistName}
                  </Text>
                </View>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />

      {openModal && currentTrack && (
        <Modal />
      )}
      {nowPlayingMusicModal && (
        <PlayingScreenModal />
      )}
      
    </View>
  );
}
const styles = StyleSheet.create({
  musicListContainer: {
    width: 360,
    height: 70,
    marginVertical: 5,
    marginHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 36,
    overflow: 'hidden',
  },
  mscList: {
    marginStart: 16,
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  MusicTitles: {
    color: 'white',
    fontWeight: '800',
    fontFamily: 'Poppins-Medium',
    letterSpacing: -0.5,
    fontSize: 14,
  },
});
