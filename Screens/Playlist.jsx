import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MusicsTop from '../config/MusicsTop'

export default function Playlist() {
  return (
    <SafeAreaView>
      <MusicsTop />
    <View>
      <Text>Playlist</Text>
    </View>
    </SafeAreaView>
  )
}