import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../config/colors'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { screenWidth } from '../../global/Dimensions'

const LastedDownloadedCategories = ({musicName, musicDate, artistPhoto, navigation}) => {

const musicData = [
{id: 1, name: musicName, date: musicDate},
{id: 2, name: musicName, date: musicDate},
{id: 3, name: musicName, date: musicDate},
{id: 4, name: musicName, date: musicDate},
{id: 5, name: musicName, date: musicDate},
{id: 6, name: musicName, date: musicDate},
];


    return(
<SafeAreaView>

    <TouchableOpacity onPress={() => {navigation.navigate('Son yüklənənlər')}}>
  <View style={styles.infoPlakat}>
    <IonIcon name="time-outline" size={26} color="white" />
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <IonIcon name="chevron-down-outline" size={26} color="white" />
      <Text style={{ fontFamily: 'Poppins-Medium', letterSpacing: -0.7 }}>Ən son yüklədiklərin buradadır</Text>
    </View>
  </View>
    </TouchableOpacity>

      <FlatList 
      horizontal 
      showsHorizontalScrollIndicator={false}
      data={musicData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.lastDownloadBox}>
      <TouchableOpacity>
        <View style={styles.librarySection}>
            <View style={styles.artistPhoto}>
              <View 
              style={{
                borderRadius: 30, 
                backgroundColor: colors.musicBoxArtisPhotoColor, 
                width: 330, height: 140,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                }}>
                <Text style={{fontSize: 26}}>{artistPhoto}</Text>
              </View>
            </View>
            <Text style={{letterSpacing: -0.7, color: "#696969"}}>{musicName}</Text>
            <Text style={{fontFamily: 'Poppins-Italic', fontSize: 13, paddingTop: 5}}>Son yükləmə: {musicDate}</Text>
          </View>
    </TouchableOpacity>
        </View>  
      )}
      />       
      
 </SafeAreaView>
 );

}

const styles = StyleSheet.create({
  lastDownloadBox: {
    width: screenWidth,
    height: 200,
    alignItems: 'center',
    flexDirection: 'row',
  },
  librarySection: {
    marginStart: 16,
    backgroundColor: 'transparent',
    width: 370,
    height: 230,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: '#393053',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  artistPhoto: {
    marginBottom: 15,
  },
  infoPlakat: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
    columnGap: 30,
    marginTop: 40,
    borderWidth: 0.5,
    borderColor: '#635985',
    padding: 5,
    borderRadius: 30
  },
})

export default LastedDownloadedCategories;