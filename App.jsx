import React, { useContext } from 'react';
import { Text, Button } from 'react-native'
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import Musics from './Screens/Musics';
import {createDrawerNavigator,} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeScreen from './Screens/HomeScreen';
import Playlist from './Screens/Playlist';
import LastDownload from './Screens/LastDownload';
import Equalizer from './Screens/Equalizer';
import IonIcons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './config/CustomDrawer';
import { PermissionContext } from './contexts/PermissionContext';
import TrackPlayer from 'react-native-track-player';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerFunc = ({navigation}) => {
  const handleNextPage = currentRouteName => {
    currentRouteName === 'Əsas'
    ? navigation.navigate('Musiqilərim')
    : currentRouteName === 'Musiqilərim'
    ? navigation.navigate('Pleylistlərim')
    : currentRouteName === 'Pleylistlərim'
    ? navigation.navigate('Son yüklənənlər')
    : currentRouteName === 'Son yüklənənlər'
    ? navigation.navigate('Ekolayzer')
    : currentRouteName === 'Ekolayzer'
    ? navigation.navigate('Əsas')
    : null;
  };

  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        drawerType: 'slide',
        drawerContentContainerStyle: {top: 300},
        drawerContentStyle: {backgroundColor: '#000000',},
        drawerLabelStyle: {color: 'white', fontFamily: 'Poppins-Medium',},
        headerStyle: {
          backgroundColor: '#101010',
        },
        headerTintColor: 'whitesmoke',
        headerLeft: () => (
          <TouchableOpacity
            style={{marginStart: 16}}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <IonIcons name="menu" size={30} color="#9685FF" />
          </TouchableOpacity>
        ),
        headerRight: () => {
          const currentRouteName = route.name;
          return (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => handleNextPage(currentRouteName)}>
              <IonIcons name="return-up-forward" size={30} color="#9685FF" />
            </TouchableOpacity>
          );
        },
        drawerIcon: ({iconName, color, size}) => {
          (color = '#9685FF'), (size = 30);
          route.name === 'Əsas'
            ? (iconName = 'play')
            : route.name === 'Musiqilərim'
            ? (iconName = 'musical-notes')
            : route.name === 'Pleylistlərim'
            ? (iconName = 'barcode')
            : route.name === 'Son yüklənənlər'
            ? (iconName = 'trending-down')
            : route.name === 'Ekolayzer'
            ? (iconName = 'options')
            : null;
          return <IonIcons name={iconName} color={color} size={size} />;
        },
    
      })}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Əsas" children={(props) => <HomeScreen navigation={navigation} {...props}/>} />
      <Drawer.Screen name="Musiqilərim" 
      children={() => 
      <Musics
      musicDate='05.06.2023'
      artistName='Unkown'
      musicLength='2:64'
      artistPhoto='M'
      musicName='Maykzed - Etiraf (2023).mp3 (PLAY)' />} 
      />
      <Drawer.Screen name="Pleylistlərim" component={Playlist} />
      <Drawer.Screen name="Son yüklənənlər" component={LastDownload} />
      <Drawer.Screen name="Ekolayzer" component={Equalizer} />
    </Drawer.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={DrawerFunc} />
    </Stack.Navigator>
  );
};

const App = () => { 

  const { permissionsGranted, checkPermissionUserStorage } = useContext(PermissionContext);

  return (
    <NavigationContainer>
      {permissionsGranted && (
        null
        )}
      {!permissionsGranted && (
        <Button title='izin verin' onPress={checkPermissionUserStorage} />
        )}
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
