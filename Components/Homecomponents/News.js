import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import { Linking } from 'react-native';
import { Chip } from 'react-native-paper';
export const News = () => {
    const visitlink = ()=>{
        const url = 'https://newsmagier.web.app/';
        Linking.openURL(url);
    }
  return (
    <Card style={{marginBottom: 2, backgroundColor:'#e8def7', borderTopRightRadius:40, borderTopLeftRadius:40, borderBottomLeftRadius:30, borderBottomRightRadius:30}} mode="elevated">
      <Text
        style={{fontSize: 20, marginTop: 15, marginLeft: 10}}
        numberOfLines={3}>
        Want to read top stories and news from New York Times?
      </Text>
      
      <Card.Cover
        source={{
          uri: 'https://images.pexels.com/photos/3781529/pexels-photo-3781529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        }}
        style={{height: 200, marginLeft: 2, marginRight: 3, marginTop: 20}}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={{marginTop:10, fontStyle:'italic', fontSize:15}}>
          Experience the magic of news with Newsmagier! Dive into a world of
          captivating top stories and breaking news curated from The New York
          Times. Elevate your reading experience and stay informed with
          Newsmagier – your portal to the latest and most engaging news from one
          of the most trusted sources in journalism!
        </Text>
      </Card.Content>
      <Card.Actions>
       
        <Button mode='contained'  style={{backgroundColor:'#380E6B'}} onPress={()=>visitlink()} > Visit</Button>
      </Card.Actions>
    </Card>
  );
};
