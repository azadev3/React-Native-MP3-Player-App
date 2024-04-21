import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import {screenHeight, screenWidth} from '../../global/Dimensions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Slider} from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';
import { TrackPlayerContext } from '../../contexts/TrackPlayerContext';



const PlayingScreenModal = ({  }) => {
    const { 
      hours, 
      minutes, 
      seconds, 
      nowPlayingMusicModal, 
      setNowPlayingMusicModal, 
      togglePlayPause,
      isPlaying,
      skipToNextTrack,
      currentTrack,
    } = useContext(TrackPlayerContext);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(totalSeconds);
    const onSliderValueChange = value => {
      setCurrentTime(value);
    };
    const onSliderSlidingComplete = async value => {
      await TrackPlayer.seekTo(value);
    };
    useEffect(() => {
      const interval = setInterval(() => {
        TrackPlayer.getPosition().then(position => {
          setCurrentTime(position);
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
    const formatTime = timeInSeconds => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

   
    const pan = useRef(new Animated.ValueXY(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        Animated.event([null, { dy: pan.y }], {
          useNativeDriver: false,
        })(event, gestureState);
        const opacityValue = 1 - Math.abs(gestureState.dy) / 300;
        Animated.timing(opacity, {
          toValue: opacityValue,
          duration: 0,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dy) >= 300) {
          setNowPlayingMusicModal(false);
          Animated.timing(pan, {
            toValue: { x: 0, y: -900 }, 
            duration: 100,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
      },
    });



  return (
    <Animated.View 
      {...panResponder.panHandlers}
    style={[
      styles.playingScreenContainer,
     {top: nowPlayingMusicModal ? 0 : null},
     {transform: [{translateY: pan.y}]},
     {opacity}
    ]}
     
     >
      <View style={styles.settingsAndMore}>
        <TouchableOpacity>
          <Ionicon name="heart-outline" size={30} color="#EA1179" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicon name="menu-outline" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicon name="share-social-outline" size={30} color="#BBE1FA" />
        </TouchableOpacity>
      </View>
      <View style={styles.image}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/musicCover.jpg')}
            style={{width: 300, height: 300, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>

{/* PROGRESS BAR */}
      <View style={{ width: screenWidth, alignItems: 'center'}}>   
        <Slider
        animateTransitions={false}
        style={styles.progressBarContainer}
          value={currentTime}
          minimumValue={0}
          maximumValue={totalTime}
          step={1}
          thumbTintColor="#FFD369"
          thumbStyle={{width: 20, height: 20}}
          onValueChange={onSliderValueChange}
          onSlidingComplete={onSliderSlidingComplete}
          minimumTrackTintColor="mediumslateblue"
          maximumTrackTintColor="white"
          />
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', columnGap: 270}}>
        <Text>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>
            {Math.floor(totalTime / 60)}:
            {(totalTime % 60).toString().padStart(2, '0')}
        </Text>
          </View>
        <TouchableOpacity>
          <View style={{width: screenWidth, height: 50, backgroundColor: '#352F50',justifyContent: 'center', alignItems: 'center', position: 'relative', top: 40}}>
          <Text style={{fontFamily: 'Poppins-Bold', color: '#f5d5d5', letterSpacing: -1, fontSize: 25}}>
            {currentTrack.title}
          </Text>
          </View>
        </TouchableOpacity>
 
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity>
          <Ionicon
            name="play-skip-back-circle-outline"
            size={45}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => togglePlayPause()}>
          <Ionicon name={isPlaying ? 'pause' : 'play'} size={50} color="#F9FBE7" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicon
            name="play-skip-forward-circle-outline"
            size={45}
            color="red"
          />
        </TouchableOpacity>
      </View>

      <Animated.View {...panResponder.panHandlers} style={[styles.chevronIcon, {transform: [{translateY: pan.y}]}, {opacity}]}>
        <TouchableOpacity onPress={() => {setNowPlayingMusicModal(false)}}>
        <Ionicon name='arrow-up-outline' size={35} color="#fff"/>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playingScreenContainer: {
    width: screenWidth,
    height: screenHeight,
    top: 0,
    position: 'absolute',
    backgroundColor: '#352F44',
    alignItems: 'center',
  },
  settingsAndMore: {
    width: 300,
    height: 60,
    borderRadius: 20,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttons: {
    alignItems: 'center',
    columnGap: 80,
    flexDirection: 'row',
    marginTop: 75
  },
  progressBarContainer: {
    width: 300,
    justifyContent: 'center'
  },
  chevronIcon: {
    top: 50,
  },
  timeText: {
    backgroundColor: 'white',
    color: 'black',
    padding: 2,
    fontWeight: 'bold'
  }
});

export default PlayingScreenModal;
