import React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';
export default function Noticeitems({title, date,description}) {
  return (
    <Card.Title
    title= {title}
    subtitle={description}
    left={(props) => <Avatar.Icon {...props} icon="information" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
    style={{width:'100%'}}
  />
  )
}
