import React, { useState ,useEffect} from 'react'
import Dashboard from './Components/Dashboard'
import { NavigationContainer } from '@react-navigation/native';
import { createContext } from 'react';
import { Alert, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
export const  LockedContext  = createContext();
export default function App() {
       useEffect (()=>{
        SplashScreen.hide();
       },[])

    const [locked, setlocked] = useState(true);
    const [status, setstatus] = useState(true);
    const handleLock = ()=>{
          setlocked(!locked);
          locked?Alert.alert('Unclocked successfully'):Alert.alert('Locked successfully!!');
    }
    const handleStatus =()=>{
       setstatus(!status);
    }

  return (
    <LockedContext.Provider value={{ locked ,handleLock, status, handleStatus}}>
      <StatusBar  backgroundColor='#380E6B' />
    <NavigationContainer>
      <Dashboard/>
    </NavigationContainer>
    </LockedContext.Provider>
      
  )
}
