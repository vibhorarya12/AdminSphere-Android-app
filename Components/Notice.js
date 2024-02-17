import React, {useContext, useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {ActivityIndicator} from 'react-native';
import Noticeitems from './Noticeitems';
import {LockedContext} from '../App';
import noticeImage from "./Images/notice.png";
import {API_KEY} from '@env';
export default function Notice() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [view, setview] = useState('none');
  const [notice, setnotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const {locked} = useContext(LockedContext);
  const [notices, setNotices] = useState([]);
  const [noticeUpdate, setNoticeUpdate] = useState(true);
  const handleSubmit = async () => {
    if (locked) {
      Alert.alert('Warning', 'please unlock crud operations');
      return;
    }
    if (title === '' || description === '') {
      Alert.alert('warning !!', 'feilds cannot be left blank');
      return;
    }

    const apiUrl = `${API_KEY}adminnotice`;

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({title, description}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      Alert.alert('success', 'notice placed for admins');
      setLoading(false);
      setDescription('');
      setTitle('');
      setNoticeUpdate(!noticeUpdate);
    } catch (error) {
      Alert.alert('error', 'unable to request');
      setLoading(false);
    }
  };

  const handleSubmitUser = async () => {
    if (locked) {
      Alert.alert('Warning', 'please unlock crud operations');
      return;
    }
    if (title === '' || description === '') {
      Alert.alert('warning !!', 'feilds cannot be left blank');
      return;
    }
    const apiUrl = `${API_KEY}usernotice`;

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers if needed
        },
        body: JSON.stringify({title, description}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      Alert.alert('success', 'notice placed users');
      setLoading(false);
      setDescription('');
      setTitle('');
    } catch (error) {
      Alert.alert('error', 'unable to request');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_KEY}adminnotices`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNotices(data);
        setLoading(false);
      } catch (error) {
        Alert.alert('error', 'unable to request');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [noticeUpdate]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#380E6B',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '70%',
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 0,
        }}>
        <Text style={{color: 'white', fontSize: 27}}>
          Place notices for Admins and users
        </Text>
        {view ? null : (
          <Button
            mode="elevated"
            icon="keyboard-backspace"
            style={{
              marginTop: 10,
              width: '40%', // Adjusted width
              marginHorizontal: '2%', // Added margin for spacing
              borderRadius: 50,
              backgroundColor: '#FFBD00',
              marginLeft: 20,
            }}
            onPress={() => (setview('none'), setnotice(false))}>
            back
          </Button>
        )}
        <Image
          source={noticeImage}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: '15%',
        }}>
        <Button
          icon="animation-outline"
          mode="elevated"
          style={{
            width: '40%', // Adjusted width
            marginHorizontal: '2%', // Added margin for spacing
            borderRadius: 50,
            backgroundColor: '#FFBD00',
            marginLeft: 20,
          }}
          onPress={() => setview(null)}>
          View Notices
        </Button>

        <Button
          icon="book-information-variant"
          mode="elevated"
          style={{
            width: '40%', // Adjusted width
            marginLeft: 20,
            borderRadius: 50,
            backgroundColor: '#FFBD00',
          }}
          onPress={() => (setnotice(true), setview(null))}>
          {' '}
          Place Notice
        </Button>
      </View>
      <View
        style={{
          backgroundColor: '#e8def7',
          bottom: 0,
          height: '70%',
          width: '100%',
          position: 'absolute',
          zIndex: 1,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          alignItems: 'center',
          display: view,
        }}>
        {notice ? (
          <View style={{position: 'absolute', alignItems: 'center'}}>
            <TextInput
              label="Title"
              value={title}
              style={{
                width: '70%',
                marginTop: 20,
                backgroundColor: 'transparent',
              }}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              label="Description"
              value={description}
              style={{
                width: '70%',
                marginTop: 20,
                backgroundColor: 'transparent',
              }}
              numberOfLines={20}
              onChangeText={text => setDescription(text)}
            />
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                marginTop: 20,
              }}>
              <Button
                mode="elevated"
                icon="account-group-outline"
                style={{
                  width: '40%', // Adjusted width
                  marginLeft: 20,
                  borderRadius: 50,
                  backgroundColor: '#FFBD00',
                  marginTop: 10,
                }}
                onPress={() => handleSubmitUser()}>
                Users
              </Button>
              <Button
                mode="elevated"
                icon="security"
                style={{
                  width: '40%', // Adjusted width
                  marginLeft: 20,
                  borderRadius: 50,
                  backgroundColor: '#FFBD00',
                  marginTop: 10,
                }}
                onPress={() => handleSubmit()}>
                Admins
              </Button>
            </View>
            {loading && (
              <ActivityIndicator
                size={30}
                color={'#380E6B'}
                style={{marginTop: 10}}
              />
            )}
          </View>
        ) : (
          <ScrollView style={{marginTop: 15, borderTopLeftRadius: 50}}>
            <View
              style={{
                marginLeft: 10,
                borderTopLeftRadius: 50,
                marginBottom: 65,
              }}>
              {loading && (
                <ActivityIndicator
                  style={{position: 'absolute', alignSelf: 'center', marginBottom:20}}
                  size={40}
                  color='#380E6B'
                />
              )}
              {notices.map(notice => (
                <Noticeitems
                  key={notice._id}
                  title={notice.title}
                  date={notice.date}
                  description={notice.description}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
