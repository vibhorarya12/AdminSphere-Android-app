import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Alert, Image, TouchableOpacity, View } from 'react-native';

const MyComponent = (props) => {
  const userpic = props.image;
  const defaultImageSource =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.773280407.1699858006&semt=ais';

  const LeftContent = () => (
    <TouchableOpacity onPress={props.handleNav}>
           <Image
      source={{
        uri: userpic ? `data:image/png;base64,${userpic}` : defaultImageSource,
      }}
      style={{
        width: 60,
        height: 60,
        marginTop: 10,
        borderRadius: 50,
        marginBottom: 10,
      }}
      
    />

    </TouchableOpacity>
   
  );

  return (
    <Card style={{marginBottom:5 , borderBottomRightRadius:30, borderBottomLeftRadius:30}}>
      <Card.Title title="" subtitle="" left={LeftContent} />
      <Card.Content style={{ marginLeft: 10 }}>
        <Text
          variant="bodyMedium"
          style={{ fontWeight: 'bold', fontSize: 18, fontWeight: 'bold' }}>
          name:<Text> {props.name}</Text>{' '}
        </Text>
        <Text variant="bodyMedium" style={{ fontSize: 18, fontWeight: 'bold' }}>
          email: <Text>{props.email}</Text>{' '}
        </Text>
        <Text variant="bodyMedium" style={{ fontSize: 15, fontWeight: 'bold' }}>
          D.O.J : <Text>{props.date}</Text>
        </Text>
        
      </Card.Content>

      <Card.Actions>
        <Button  onPress={() => {
            props.handleNav()
          }} >View Logs</Button>
        <Button
          style={{backgroundColor:'#380E6B'}}
          onPress={() => {
            props.deleteadmin(props.id)
          }}>
          Delete admin
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default MyComponent;
