import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Avatar} from 'react-native-paper';
import ProfileImage from '../Images/port.jpg';
export default function About() {
  return (
    <View
      style={{
        height: 400,
        backgroundColor: '#e8def7',
        marginTop: 5,
        width: '100%',
        marginBottom: 75,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        justifyContent: 'center',
        alignItems: 'center,',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          top: 40,
          right: 18,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#380E6B'}}>
          From The Developer
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#380E6B',
          width: '100%',
          position: 'absolute',
          height: 5,
          top: 100,
          marginLeft: 5,
          opacity: 0.7,
        }}></View>
      <Avatar.Image
        size={150}
        source={ProfileImage}
        style={{position: 'absolute', top: 6, zIndex: 1, left: 1}}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          marginLeft:2,
          marginRight:2,
          backgroundColor: '#380E6B',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: '55%',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <Text
          numberOfLines={15}
          style={{
            fontSize: 15,
            color: 'white',
            paddingLeft: 10,
            paddingRight: 15,
            marginTop: 8,
            marginLeft: 5,
            fontStyle: 'italic',
            
          }}>
          Adminsphere, crafted by Vibhor Arya, is a powerful React Native
          Android app designed to simplify and optimize administrative tasks. As
          a dedicated graduate student pursuing a Masters in Computer
          Applications, Vibhor brings expertise and passion to create an
          intuitive and efficient solution. Experience seamless task management
          and data handling, all wrapped in a user-friendly interface. Join us
          in revolutionizing administrative processes with Adminsphere!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'flex-end',
          top: 110,
          right: 45,
        }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://github.com/vibhorarya12')}>
          <Avatar.Icon
            size={50}
            icon="github"
            style={{marginLeft: 10, backgroundColor: '#380E6B'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://discord.com/users/491091986334351360')
          }>
          <Avatar.Icon
            size={50}
            icon="discord"
            style={{marginLeft: 10, backgroundColor: '#380E6B'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://instagram.com/iam_vibhor47?igshid=MzRlODBiNWFlZA==',
            )
          }>
          <Avatar.Icon
            size={50}
            icon="instagram"
            style={{marginLeft: 10, backgroundColor: '#380E6B'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
