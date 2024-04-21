import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../global/Dimensions';
import {colors} from '../config/colors';
import MusicsTop from '../config/MusicsTop';
import LastedDownloadedCategories from '../Screens/HomeScreenUitils/LastedDownloadedCategories';
import MusicList from '../Screens/HomeScreenUitils/MusicList';
import Playlists from '../Screens/HomeScreenUitils/Playlists';

export default function Container({navigation}) {
  const [empty, setEmpty] = React.useState(false);
  React.useEffect(() => {
    setEmpty(empty ? true : false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {empty ? (
        <Text>Musiqi yoxdur.</Text>
      ) : (
        <SafeAreaView>
          <View style={styles.boxContainer}>
            <LastedDownloadedCategories 
            musicDate="Bugün" 
            musicName="Maykzed - Etiraf(2023) mp4 Okay- 92845 nmdfr-0we"
            navigation={navigation}
            />
          </View>
            <MusicList 
            musicName='Maykez - Lalafdo -249 m3 full hd mp305'
            artistName='Maykez'
            navigation={navigation}
            /> 
            <Playlists 
            playlistName='Playlist1'
            navigation={navigation}
            /> 


        </SafeAreaView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BlackColor,
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
    
  },
  boxContainer: {
    width: screenWidth,
    height: 330,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },         
});
