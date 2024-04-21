import React, { createContext, useState, useEffect } from 'react';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const PermissionContext = createContext();

export const PermissionProvider = ({children}) => {
    const [permissionsGranted, setPermissionGranted] = useState(false);

    const checkPermissionUserStorage = async () => {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.DENIED) {
        const requestResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (requestResult === RESULTS.GRANTED) {
        console.log('izin verilib')
        setPermissionGranted(true);
        } else if (requestResult === RESULTS.DENIED) {
        console.log('izin verilmeyib')
        setPermissionGranted(false);
        }
      } else if (result === RESULTS.GRANTED) {
        setPermissionGranted(true);
        console.log('izin onsuzda verilib')
      }
  }

  useEffect(() => { 
    AsyncStorage.getItem('permissionGranter').then((value) => {
      if (value === true) {
        setPermissionGranted(true);
      } else if (value === false) {
        setPermissionGranted(false);
      } else {
        checkPermissionUserStorage();
      }
    })
  }, [])
    return (
       <PermissionContext.Provider value={{ permissionsGranted, checkPermissionUserStorage }}>
        {children}
       </PermissionContext.Provider>
    )
}

