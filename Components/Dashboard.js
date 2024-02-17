import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Signup from './Signup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from './Main';
import Homescreen from './Homescreen';
import {useWindowDimensions} from 'react-native';
import Notice from './Notice';
export default function Dashboard() {
  const Tab = createBottomTabNavigator();
  const dimensions = useWindowDimensions();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 10,
          right: 16,
          left: dimensions.width > dimensions.height ? '30%' : 15,
          borderRadius: 30,
          width: dimensions.width > dimensions.height ? 350 : null,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Homescreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'signup') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'admin') {
            iconName = focused
              ? 'shield-checkmark'
              : 'shield-checkmark-outline';
          } else if (route.name === 'about') {
            iconName = focused ? 'paper-plane' : 'paper-plane-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={dimensions.width > dimensions.height ? 27 : 30}
              color={'#533A71'}
            />
          );
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Homescreen" component={Homescreen} />
      <Tab.Screen name="signup" component={Signup} />
      <Tab.Screen name="admin" component={Main} />
      <Tab.Screen name="about" component={Notice} />
    </Tab.Navigator>
  );
}
