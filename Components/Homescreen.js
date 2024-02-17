import React, {useEffect, useState, useRef, useContext} from 'react';
import {ScrollView, Text, View, Dimensions, Alert} from 'react-native';
import AvatarImage from './Homecomponents/Homeavatars';
import {Chip} from 'react-native-paper';
import {Adminsphere, Memoadmin, Memosphere} from './Homecomponents/Homecards';
import Offers from './Homecomponents/Offers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LockedContext} from '../App';
import Message from './Dialog';
import {News} from './Homecomponents/News';
import About from './Homecomponents/About';
import {API_KEY} from '@env';
export default function Homescreen() {
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setloading] = useState(true);
  const {status} = useContext(LockedContext);
  const handleScroll = event => {
    const {width} = Dimensions.get('window');
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentPage = Math.floor(contentOffsetX / width);
    setCurrentPage(currentPage);
  };
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const {width} = Dimensions.get('window');
      const nextPage = (currentPage + 1) % 3; // Change 3 to the number of pages in your carousel
      scrollViewRef.current.scrollTo({x: nextPage * width, animated: true});
      setCurrentPage(nextPage);
    }, 1500); // Set your desired interval in milliseconds

    return () => clearInterval(scrollInterval);
  }, [currentPage]);

  const [offer, setoffer] = useState(false);
  const [recentAdmins, setRecentAdmins] = useState([]);
  useEffect(() => {
    const fetchDataFromStorage = async () => {
      setloading(true);
      try {
        const storedData = await AsyncStorage.getItem('recentAdmins');

        if (storedData) {
          console.log('found in local storage');
          const parsedData = JSON.parse(storedData);
          setloading(false);
          setRecentAdmins(parsedData);
        }
      } catch (error) {
        setloading(false);
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    const fetchRecentAdmins = async () => {
      console.log('calling recent admins again');
      try {
        const response = await fetch(
          `${API_KEY}alladmins`,
        );
        const admins = await response.json();

        // Order admins by recent date (descending order)
        const sortedAdmins = admins.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date),
        );

        // Get the top 6 admins
        const top6Admins = sortedAdmins.slice(0, 6);

        // Store the fetched data in AsyncStorage
        await AsyncStorage.setItem('recentAdmins', JSON.stringify(top6Admins));

        // Update state with fetched data
        setRecentAdmins(top6Admins);
      } catch (error) {
        // Handle errors as needed
        //  Alert.alert('Network error', 'check your internet connection');
        // Attempt to fetch from AsyncStorage if there's an error fetching from the API
        fetchDataFromStorage();
      }
    };

    // Fetch from local storage on mount
    fetchDataFromStorage();
    fetchRecentAdmins();
    // Fetch from the API and set up interval
    const intervalId = setInterval(() => {
      fetchRecentAdmins();
    }, 240000); // 300,000 milliseconds = 5 minutes

    return () => clearInterval(intervalId);
  }, [status]);
 
  const {width, height} = Dimensions.get('window');
   if(width>height){
    Alert.alert('Note', 'for better experience use potrait mode');
   }
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#380E6B',
          height: 39,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          alignItems: 'center',
          marginBottom: 5,
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 20, marginTop: 5}}>
          Adminsphere <Message />
        </Text>
      </View>
      <Chip
        icon="clock-time-eight"
        style={{width: 150, marginTop: 5, marginLeft: 5, borderRadius: 30}}>
        Recent Admins
      </Chip>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {recentAdmins.map(admin => (
          <AvatarImage name={admin.name} key={admin.id} image={admin.image} />
        ))}
      </ScrollView>
      <Chip
        icon="google-earth"
        style={{width: 160, marginTop: 5, marginLeft: 5, borderRadius: 30}}>
        Memo Ecosystem
      </Chip>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <Memosphere />
        <Memoadmin />
        <Adminsphere />
      </ScrollView>
      <View
        style={{
          backgroundColor: '#380E6B',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: 20,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 10,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          height: offer ? null : 60,
        }}>
        <Chip
          icon="google-earth"
          style={{
            width: 180,
            marginTop: 12,
            marginLeft: 20,
            borderRadius: 30,
            marginBottom: 5,
          }}
          onPress={() => setoffer(!offer)}>
          What we offer here
        </Chip>
        {offer ? (
          <View
            style={{
              marginTop: 20,
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 1,
              marginBottom: 30,
            }}>
            <Offers
              title="Create an admin"
              image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Offers
              title="Manage admin activities on the go"
              image="https://images.pexels.com/photos/775091/pexels-photo-775091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Offers
              title="Restrict Admins"
              image="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Offers
              title="Place a Notice for Admins (coming soon)"
              image="https://media.istockphoto.com/id/1264996335/photo/business-people-meeting-at-office-and-use-post-it-notes-to-share-idea.jpg?s=612x612&w=0&k=20&c=cUgYCOkGtJPMK_d-inEYJwru6BsODRuCDeivVj9S87c="
            />
          </View>
        ) : null}
      </View>

      <News />
      <Chip
        icon="google-earth"
        style={{
          width: 180,
          marginTop: 10,
          marginLeft: 5,
          borderRadius: 30,
          marginBottom: 2, 
          borderWidth:15,
          borderColor:'#380E6B'
        }}
       >
        About us
      </Chip>
     <About/>
    </ScrollView>
  );
}
