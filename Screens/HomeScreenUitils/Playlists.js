import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { screenWidth } from "../../global/Dimensions";
import IonIcon from 'react-native-vector-icons/Ionicons'


const Playlists = ({playlistName, navigation}) => {

const musiclistData = [
    {id: 1, playlistName: playlistName},
    {id: 2, playlistName: playlistName},
    {id: 3, playlistName: playlistName},
    {id: 4, playlistName: playlistName},
    {id: 5, playlistName: playlistName},
]


    return (
        <View style={styles.musicListContainer}>

<TouchableOpacity
onPress={() => {navigation.navigate('Pleylistlərim')}}
>
  <View style={styles.infoPlakat}>
    <IonIcon name="library" size={26} color="white" />
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <IonIcon name="chevron-down-outline" size={26} color="white" />
      <Text style={{ fontFamily: 'Poppins-Medium', letterSpacing: -0.7 }}>Playlistlərin buradadır</Text>
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
                    style={{width: 100, height: 100, marginBottom: 16}}
                    source={require('../../assets/images/playlistLogo.png')}
                    />
                    <Text style={{fontFamily: 'Poppins-Medium', letterSpacing: -0.9, fontSize: 13}}>{item.playlistName}</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    musicListBox: {
        width: 120,
        overflow: 'hidden',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        height: 150,
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
        borderWidth: 0.5,
        borderColor: '#635985',
        padding: 5,
        borderRadius: 30,
        width: screenWidth,
      },
  
})

export default Playlists;