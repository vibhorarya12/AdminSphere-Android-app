import React, {useContext, useState} from 'react';
import {Text, View, Image, Alert, ScrollView} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import {Chip} from 'react-native-paper';
import {LockedContext} from '../App';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import boss from './Images/boss.png';
import {API_KEY} from '@env';
const Signup = () => {
  const {locked, handleStatus} = useContext(LockedContext);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [emailflag, setemailFlag] = useState(false);
function isValidEmail(email) {
  return emailRegex.test(email);
}
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });
  const [load, setload] = useState(false);
  const handleTextChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    //  const [err, seterr] = useState("");
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImage = response.assets[0];
        setFormData({
          ...formData,
          image: selectedImage,
        });
      }
    });
  };

  const handleSignup = async () => {
    try {
      const {name, email, password, confirmPassword, image} = formData;
      if (locked) {
        Alert.alert('Warning', 'Please unlock the crud operation to proceed');
        return;
      }
      if (name === '') {
        Alert.alert('name', 'name cannot be left blank');
        return;
      }
      if (email === '') {
        Alert.alert('Email !', 'email cannot be left blank');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Password and Confirm Password do not match');
        return;
      }
      if(!isValidEmail(email)){
          Alert.alert('Invalid email type','Please enter a proper email');
          setemailFlag(true);
          return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('password', password);

      if (image) {
        formDataToSend.append('image', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      }

      try {
        setload(true);
        const response = await axios.post(
          `${API_KEY}createadmin`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.status === 200) {
          // Successfully created user
          const responseData = response.data;
          console.log('User created:', responseData);
          setload(false);
          Alert.alert('Success', 'Admin created successfully');
          handleReset();
          setview(false);
          handleStatus();
        } 
         
        else {
          console.log('Error creating user:', response.status);
          Alert.alert(
            'Error',
            `Failed to create user. Status: ${response.status}`,
          );
          setload(false);
        }
      } catch (error) {
        Alert.alert('Error', 'useremail alreay exists');
        setload(false);
        
      }
    } catch (outerError) {
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
      setload(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: null,
    });
  };
  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  const [view, setview] = useState(false);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
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
        <Text style={{color: 'white', fontSize: 30}}>
          Create an admin account now !
        </Text>
        {view?
        <Button mode="elevated"
       icon='keyboard-backspace'
          style={{
            marginTop:5,
            width: '40%', // Adjusted width
            marginHorizontal: '2%', // Added margin for spacing
            borderRadius: 50,
            backgroundColor: '#FFBD00',
            marginLeft:20,
          }} onPress={()=>setview(false)}>back</Button>:null}
        <Image
          source={boss}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>

      <Button
      icon='account-plus-outline'
        mode="elevated"
        style={{
          width: '50%',
          borderRadius: 50,
          backgroundColor: '#FFBD00',
          position: 'absolute',
          bottom: '15%',
        }}
        onPress={() => setview(true)}>
        Signup
      </Button>

      {view ? (
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
          }}>
          <TextInput
            label="Name"
            style={{width: '70%', backgroundColor: 'transparent', marginTop: 5}}
            value={formData.name}
            onChangeText={text => handleTextChange('name', text)}
          />
          <TextInput
            label="Email"
            style={{width: '70%', backgroundColor: 'transparent'}}
            value={formData.email}
            onChangeText={text => handleTextChange('email', text)}
            error ={emailflag}
          />
          <TextInput
            label="Password"
            style={{width: '70%', backgroundColor: 'transparent'}}
            secureTextEntry={true}
            value={formData.password}
            onChangeText={text => handleTextChange('password', text)}
            autoCapitalize='none'
          />
          <TextInput
            label="Confirm Password"
            style={{width: '70%', backgroundColor: 'transparent'}}
            secureTextEntry={true}
            value={formData.confirmPassword}
            onChangeText={text => handleTextChange('confirmPassword', text)}
            autoCapitalize='none'
          />
          <Chip
            icon="image"
            style={{borderRadius: 20, marginTop: 10}}
            onPress={() => handleImageUpload()}>
            Upload Image
          </Chip>

          {formData.image && (
            <>
              <Image
                source={{uri: formData.image.uri}}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  borderRadius: 50,
                }}
              />
              <Chip
                style={{borderRadius: 40, marginTop: 5}}
                onPress={() => removeImage()}>
                X
              </Chip>
            </>
          )}

          <Button
          icon = 'send'
            mode="elevated"
            style={{
              marginTop: 20,
              width: '50%',
              backgroundColor: '#380E6B',
              marginBottom: 20,
            }}
            onPress={() => handleSignup()}>
            <Text style={{color: 'white'}}>Submit</Text>
          </Button>

          {load && <ActivityIndicator color={'#380E6B'} size={30} />}
          
        </View>
      ) : null}
    </View>
  );
};

export default Signup;
