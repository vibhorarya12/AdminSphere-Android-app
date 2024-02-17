// dialog modal for password validation//
import React, {useContext, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LockedContext} from '../App';
import {Button} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { PASS_KEY } from '@env';
const Message = () => {
  const {locked, handleLock} = useContext(LockedContext);
  const [modal, setmodal] = useState(false);
  const [text, setText] = useState('');
  const [flag, setflag] = useState(false);
  const handleSubmit = () => {
    
    if (PASS_KEY === text) {
      setflag(false);
      setmodal(false);
      handleLock();
      setText('');
    } else {
      setflag(true);
    }
  };
  return (
    <View>
      <Modal visible={modal} animationType="slide" style={{borderWidth:4}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '70%',
            }}>
            <TextInput
              label="Enter Password"
              value={text}
              onChangeText={text => setText(text)}
              style={{backgroundColor: 'transparent', width: '100%'}}
              autoCapitalize="none"
              secureTextEntry={true}
              error={flag}
            />
            {flag ? <Text style={{color: 'red'}}>wrong password</Text> : null}
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        style={{ marginTop: 20, backgroundColor: '#380E6B', flex: 1, marginRight: 10 }}
      >
        Ok
      </Button>
      <Button
        mode="contained"
        onPress={() => setmodal(false)}
        style={{ marginTop: 20, backgroundColor: '#380E6B', flex: 1, marginLeft: 10 }}
      >
        cancel
      </Button>
    </View>
          </View>
        </View>
      </Modal>
      
      <TouchableOpacity  onPress={() => (locked ? setmodal(true) : handleLock())}>
      {locked?<FontAwesome6 name='lock' size= {25} color = 'white'  />:<FontAwesome6 name='lock-open' size= {25} color = 'white' />}
      </TouchableOpacity>
    </View>
  );
};

export default Message;
