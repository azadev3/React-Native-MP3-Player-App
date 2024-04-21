import { View, Text } from 'react-native'
import React from 'react'
import Container from '../Components/Container'

export default function HomeScreen({navigation}) {
  return (
    <View>
      <Container navigation={navigation}/>
    </View>
  )
}
