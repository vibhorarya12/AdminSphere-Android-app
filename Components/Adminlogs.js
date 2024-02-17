//admin logs content box//
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {Chip} from 'react-native-paper';
export default function Adminlogs(props) {
  const handleDate = date => {
    const Gmtdate = new Date(date);
    return Gmtdate.toUTCString();
  };
  return (
    <Card style={{marginBottom: 10}}>
      <Card.Content>
        <Chip
          icon="information"
          style={{width: 170, borderRadius: 30, backgroundColor: '#E1E2EF'}}>
          {props.title}
        </Chip>
        <Text variant="bodyMedium">{props.description}</Text>
        <Text variant="bodyMedium">{handleDate(props.date)}</Text>
      </Card.Content>
    </Card>
  );
}
