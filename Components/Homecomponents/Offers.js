import React from 'react';
import { View, Text, ImageBackground ,Animated} from 'react-native';
import { Card } from 'react-native-paper';
import { useState,useEffect } from 'react';

const Offers = (props) => {
    const [scaleValue] = useState(new Animated.Value(1)); // Initial scale value

  useEffect(() => {
    // Zoom in and out animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1, // Zoom in
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Zoom out
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleValue]);
  return (
    <Card style={{ marginLeft: 5, marginBottom: 1, borderRadius: 20, marginTop: 10, paddingRight:5, paddingLeft:5 , backgroundColor:'transparent'}}>
      <ImageBackground
        source={{ uri: props.image }}
        style={{ borderRadius: 5, width: 350, height: 200, overflow: 'hidden'}}
      >
     
     <Animated.View
          style={{
            flex: 1,
            justifyContent:'flex-end',
            alignItems: 'center',
            transform: [{ scale: scaleValue }],
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold',textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5,opacity:0.8 , marginBottom:10}}>
            {props.title}
          </Text>
        </Animated.View>
      </ImageBackground>
    </Card>
  );
};

export default Offers;
