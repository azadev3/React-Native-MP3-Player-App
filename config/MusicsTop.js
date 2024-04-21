import React from "react";
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { screenWidth } from "../global/Dimensions";
import IonIcons from 'react-native-vector-icons/Ionicons'
import Borderline from "./Borderline";

const MusicsTop = () => {
    return (
<SafeAreaView>
        <View style={styles.categories}>

            <TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <IonIcons name="flask" size={16} color="#fff"/>
            <Text style={{fontSize: 11, color: '#fff'}}>Qarışdır oxut</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <IonIcons name="calendar" size={16} color="#fff"/>
            <Text style={{fontSize: 11, color: '#fff'}}>Tarixə görə sırala</Text>
            </View>
            </TouchableOpacity>    

            <TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <IonIcons name="flask" size={16} color="#fff"/>
            <Text style={{fontSize: 11, color: '#fff'}}>Ada görə sırala</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <IonIcons name="share-social" size={25} color="#fff"/>
            <Text style={{fontSize: 12, color: '#fff'}}>Musiqini paylaş</Text>
            </View>
            </TouchableOpacity>

        </View>
     <Borderline />
</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    categories: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: screenWidth,
        flexDirection: 'row',
        paddingBottom: 8,
        height: 66,
        backgroundColor: 'slateblue'
    },


})

export default MusicsTop;