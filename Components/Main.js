import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Log from './Log';

const Stack = createNativeStackNavigator();
export default function Main() {
  return (
      <Stack.Navigator>
        <Stack.Screen  name='Admins' component={Home}  options={{ headerShown: false }} />
        <Stack.Screen  name='Logs' component={Log} options={{ headerShown: false }} />
    </Stack.Navigator>
    
    
  )
};
