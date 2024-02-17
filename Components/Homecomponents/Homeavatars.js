import React from 'react';
import { Image, Text, View } from 'react-native';

const AvatarImage = (props) => {
  const userpic = props.image;
  const defaultImageSource =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.773280407.1699858006&semt=ais';
 
    const getFirstName = ( fullName)=> {
      const names = fullName.split(' ');
      return names[0];
    }
  return(
  <View style={{ alignItems: 'center' , marginLeft: 10, marginRight:18}}>
    <Image
      source={{
        uri: userpic ? `data:image/png;base64,${userpic}` : defaultImageSource,
      }}
      style={{
        width: 64,
        height: 64,
        marginTop: 10,
        borderRadius: 50,
        
        
      }}
    />
  <Text>  {getFirstName(props.name)} </Text>
  </View>)
};

export default AvatarImage;
