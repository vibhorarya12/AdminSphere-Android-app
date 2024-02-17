//component for admin logs//
import React, {useEffect, useState} from 'react';
import {Card, Text, ActivityIndicator} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {View, Image, ScrollView, Alert, TouchableOpacity} from 'react-native';
import Adminlogs from './Adminlogs';
import {Chip} from 'react-native-paper';
import {Surface} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import notfound from "./Images/notfound.png";
import {API_KEY} from '@env';
export default function Log() {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [info, setinfo] = useState(false);
  const [date, setdate] = useState(false);
  const route = useRoute();
  const {name, userid, doj, useremail, userpic} = route.params;
  const defaultImageSource =
    'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.773280407.1699858006&semt=ais';

  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAdminInfo(userid) {
    const apiUrl = `${API_KEY}admininfo/${userid}`;

    try {
      const response = await fetch(apiUrl);
      const info = await response.json();

      if (response.ok) {
        setdata(info);
      } else {
        console.log('Error:');
      }
    } catch (error) {
      Alert.alert('Network error', 'check your internet connection');
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  }

  useEffect(() => {
    // Fetch admin info when the component mounts
    fetchAdminInfo(userid);
  }, [userid]);

  const sortedData = data
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Card elevation={4} >
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri: userpic
                ? `data:image/png;base64,${userpic}`
                : defaultImageSource,
            }}
            style={{
              width: 100,
              height: 100,
              marginTop: 10,
              borderRadius: 50,
              marginBottom: 10,
              borderColor: '#533A71',
              borderWidth: 4,
            }}
          />
          <Chip
            elevation={3}
            icon={userpic ? 'alert-decagram' : ''}
            style={{marginTop: 5, borderRadius: 20}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
          </Chip>
          <View style={{flexDirection: 'row'}}>
            <Surface style={styles.surface} elevation={2}>
              <Tooltip
                isVisible={toolTipVisible}
                content={<Text>{useremail}</Text>}
                placement="bottom"
                onClose={() => setToolTipVisible(false)}>
                <TouchableOpacity onPress={() => setToolTipVisible(true)}>
                  <Icon source="email-multiple" size={30} color="#380E6B" />
                </TouchableOpacity>
              </Tooltip>
            </Surface>
            <Surface style={styles.surface} elevation={2}>
              <Tooltip
                isVisible={info}
                content={<Text>id:{userid}</Text>}
                placement="bottom"
                onClose={() => setinfo(false)}>
                <TouchableOpacity onPress={() => setinfo(true)}>
                  <Icon source="information" size={30} color="#380E6B" />
                </TouchableOpacity>
              </Tooltip>
            </Surface>
            <Surface style={styles.surface} elevation={2}>
              <Tooltip
                isVisible={date}
                content={<Text>D.O.J:{doj}</Text>}
                placement="bottom"
                onClose={() => setdate(false)}>
                <TouchableOpacity onPress={() => setdate(true)}>
                  <Icon source="update" size={30} color="#380E6B" />
                </TouchableOpacity>
              </Tooltip>
            </Surface>
          </View>
        </View>
        <Card.Content></Card.Content>
      </Card>
      {loading ? ( // Display ActivityIndicator while loading
        <ActivityIndicator size="large" style={{marginTop: 20}} />
      ) : (
        <ScrollView style={{marginTop: 5}}>
          <View style={{marginBottom: 62}}>
            {sortedData.length === 0 ? (
              <>
                <View style={{marginBottom: 62}}>
                  <Text
                    style={{textAlign: 'center', marginTop: 10, fontSize: 20}}>
                    {name} has no logs
                  </Text>
                  <Image
                    source={notfound}
                    style={{
                      width: '100%',
                      height: 300,
                      resizeMode: 'contain',
                      marginBottom: 62,
                    }}
                  />
                </View>
              </>
            ) : (
              sortedData.map((log, index) => (
                <Adminlogs
                  key={index}
                  title={log.title}
                  description={log.description}
                  date={log.date}
                />
              ))
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderRadius: 32,
    marginLeft: 12,
    backgroundColor: '#e8def7',
   
  },
});
