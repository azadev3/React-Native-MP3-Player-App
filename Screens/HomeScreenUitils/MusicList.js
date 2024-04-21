import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { screenWidth } from "../../global/Dimensions";
import IonIcon from 'react-native-vector-icons/Ionicons'


const MusicList = ({musicName, artistPhoto, artistName, navigation}) => {

const musiclistData = [
    {id: 1, name: musicName, artist: artistName},
    {id: 2, name: musicName, artist: artistName},
    {id: 3, name: musicName, artist: artistName},
    {id: 4, name: musicName, artist: artistName},
    {id: 5, name: musicName, artist: artistName},
]


    return (
        <View style={styles.musicListContainer}>

<TouchableOpacity
onPress={() => {navigation.navigate('Musiqilərim')}}
>
  <View style={styles.infoPlakat}>
    <IonIcon name="musical-notes" size={26} color="white" />
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <IonIcon name="chevron-down-outline" size={26} color="white" />
      <Text style={{ fontFamily: 'Poppins-Medium', letterSpacing: -0.7 }}>Musiqilərin buradadır</Text>
    </View>
  </View>
    </TouchableOpacity>

            <FlatList
            horizontal 
            showsHorizontalScrollIndicator={false}
            data={musiclistData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
            <TouchableOpacity>
                <View style={styles.musicListBox}>
                    <Image 
                    style={{width: 50, height: 50, marginBottom: 16}}
                    source={require('../../assets/images/logoPlay.png')}
                    />
                    <Text style={{fontFamily: 'Poppins-Medium', letterSpacing: -0.9, fontSize: 13}}>{item.name}</Text>
                    <Text style={{fontFamily: 'Poppins-Italic', letterSpacing: -1, fontSize: 15}}>
                       <Text style={{fontFamily: 'Poppins-Light'}}>Artist:</Text> {item.artist}
                    </Text>
                </View>
            </TouchableOpacity>
            )}
            />

    </View>
    )
}

const styles = StyleSheet.create({
    musicListContainer: {
        width: screenWidth,
        height: 400,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    musicListBox: {
        width: 120,
        overflow: 'hidden',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'slateblue',
        top: 30
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
        borderRadius: 30,
        width: screenWidth
      },
  
})

export default MusicList;