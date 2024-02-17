import React, { useState } from 'react';
import { Card, Text, Title } from 'react-native-paper';
import { ImageBackground, View } from 'react-native';
import { TouchableOpacity , Linking} from 'react-native';
import { Button } from 'react-native-paper';




export const Memosphere = () => {
  const openLink = () => {
    const url = 'https://imemosphere.web.app/'; 
    Linking.openURL(url);
  };
   const [visit , setvisit] = useState(false);
   return(
  <TouchableOpacity>
  <Card style={{ width: 370, marginTop: 10, marginLeft: 3 }} onPress={()=>setvisit(!visit)} >
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/4144223/pexels-photo-4144223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={{ borderRadius: 15, overflow: 'hidden', height:200,opacity: visit ? 0.6 : 1 }}
    >   
     
     {visit==false? <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
      <Title style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }}>Memosphere</Title>
      <Text style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }} >Capture Ideas Digitally Anywhere</Text>
     
      </View>:null}
      
     
    </ImageBackground>
    <View style={{ position: 'absolute', bottom: 10, right: 10,  }}>
         {visit?<Button mode="contained" buttonColor='#380E6B' onPress={()=>openLink()}>
            Visit
          </Button>:null} 
        </View>
  </Card>
  </TouchableOpacity>)
};
export const Memoadmin = () => {
  const [visit , setvisit] = useState(false);
  const openLink = () => {
    const url = 'https://memoadminpanel.web.app/'; // Replace with your actual URL
    Linking.openURL(url);
    setvisit(false);
  };
  
  return(
    <TouchableOpacity> 
  <Card style={{ width: 350, marginTop: 10, marginLeft: 3 , borderRadius:10}} onPress={()=>setvisit(!visit)}>
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
      style={{ borderRadius: 10, overflow: 'hidden', height:200 ,opacity: visit ? 0.6 : 1}}
    >   
     
     {visit==false? <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
      <Title style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }}>Memoadmin</Title>
      <Text style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }} >Manage users here</Text>
      </View>:null}
    </ImageBackground>
    <View style={{ position: 'absolute', bottom: 10, right: 10,  }}>
         {visit?<Button mode="contained" buttonColor='#380E6B' onPress={()=>openLink()}>
            Visit
          </Button>:null} 
        </View>
  </Card>
  </TouchableOpacity>
  )
};
export const Adminsphere = () => {

  return(
  <Card style={{ width: 350, marginTop: 10, marginLeft: 3 }}>
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2019/04/29/07/04/software-development-4165307_1280.jpg' }}
      style={{ borderRadius: 10, overflow: 'hidden', height:200 }}
    >   
     
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
      <Title style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }}>AdminSphere</Title>
      <Text style={{ color: 'white', textShadowColor: 'black', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5 }} >Manage Admins here</Text>
      </View>
    </ImageBackground>
  </Card>)
};
