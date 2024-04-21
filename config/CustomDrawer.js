import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, Image, ScrollView, Text, StyleSheet } from 'react-native';

const CustomDrawer = props => {
    
   return( 
   <DrawerContentScrollView {...props} style={{backgroundColor: '#000000',}}>
        <View 
        style={{display: 'flex', justifyContent: 'center', 
        alignItems: 'center', flexDirection: "row"
        }}>
            <Image source={require('../assets/images/logoo.png')} 
                style={{width: 80, height:  80, marginTop: 40}}
            />
        </View>

        <View style={{flex: 1, marginTop: 100}}>
        <DrawerItemList {...props} />
        </View>
    </DrawerContentScrollView>
    );
};

export default CustomDrawer;