import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, PanResponder } from 'react-native';
import { screenWidth } from "../../global/Dimensions";
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TrackPlayerContext } from "../../contexts/TrackPlayerContext";

const Modal = () => {

  const {
    nowPlayingMusicModal,
    openPlayingScreen,
    openModal, 
    currentTrack, 
    isPlaying,  
    togglePlayPause,} = useContext(TrackPlayerContext);


    return (
    <View 
    style={[
      { position: 'absolute', bottom: -168 },
    ]}
    
  >
      <View>
        {openModal && currentTrack && (
            <View style={[styles.ifMusicPlayBottomContainer, {display: nowPlayingMusicModal ? 'none' : null}]}>
              <View style={styles.userInteraction}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-BoldItalic',
                    letterSpacing: -0.8,
                    color: 'black'
                  }}>
                  İNDİ OXUNAN:
                </Text>
                <View style={styles.controlKeys}>
                  <TouchableOpacity activeOpacity={0}>
                    <Ionicon name="play-back" size={36} color="black" />
                  </TouchableOpacity>
    
                  <TouchableWithoutFeedback onPress={togglePlayPause}>
                    <Ionicon
                      name={isPlaying ? 'pause' : 'play'}
                      size={45}
                      color="black"
                    />
                  </TouchableWithoutFeedback>
    
                  <TouchableOpacity activeOpacity={0}>
                    <Ionicon name="play-forward" size={36} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
    
              <TouchableOpacity
                onPress={openPlayingScreen}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text  style={styles.currentTrackTitle}>{currentTrack.title}</Text>
                <Ionicon name="chevron-forward-outline" size={30} color="black" />
              </TouchableOpacity>
              
            </View>
          )}
         
      </View> 
    </View>
    )
}

const styles = StyleSheet.create({
    ifMusicPlayBottomContainer: {
        width: screenWidth,
        height: 100,
        zIndex: 1000,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 66,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
      },
      currentTrackTitle: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        letterSpacing: -1.5,
        fontSize: 17,
        width: 150,
      },
      userInteraction: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      controlKeys: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 5,
      },
})


export default Modal