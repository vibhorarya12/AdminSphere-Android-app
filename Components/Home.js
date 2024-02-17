import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MyComponent from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LockedContext} from '../App';
import {Icon} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import {API_KEY} from '@env';
export default function Home(props) {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);
  const {locked, status, handleStatus} = useContext(LockedContext);
  const handleDate = date => {
    const Gmtdate = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return Gmtdate.toLocaleDateString(undefined, options);
  };

  const handleView = () => {
    setView(!view);
  };

  const handleNav = (user, id, date, email, image) => {
    props.navigation.navigate('Logs', {
      name: user,
      userid: id,
      doj: date,
      useremail: email,
      userpic: image,
    });
  };

  const deleteAdmin = async id => {
    if (locked) {
      Alert.alert('Warning', 'Please unlock!!');
      return;
    }
    try {
      // Show a confirmation dialog
      Alert.alert(
        'Confirmation',
        "Are you sure you want to delete this admin, this can't be undone?",
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              const response = await fetch(`${API_KEY}deleteadmin/${id}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                // console.log(`Admin with ID ${id} deleted successfully.`);
                // Update the state to remove the deleted admin
                setAdmins(prevAdmins =>
                  prevAdmins.filter(admin => admin.id !== id),
                );
                handleStatus();
              } else {
                console.error(`Failed to delete admin with ID ${id}.`);
                // Handle error cases
              }
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error deleting admin:', error);
      // Handle network or other errors
    }
  };
  useEffect(() => {
    const fetchDataFromStorage = async () => {
      try {
        // Check if data exists in AsyncStorage
        const storedData = await AsyncStorage.getItem('admins');

        if (storedData) {
          // If data exists in AsyncStorage, use it
          setAdmins(JSON.parse(storedData));
          // console.log('found adminlists in local storage');
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    const fetchAdminData = async () => {
      // console.log('fetching admin list from the endpoint');
      try {
        // Fetch data from the remote endpoint
        const response = await fetch(`${API_KEY}alladmins`);
        const data = await response.json();
        const sortedAdmins = data.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date),
        );

        // Update state with fetched data
        setAdmins(sortedAdmins);

        // Save fetched data to AsyncStorage for future use
        await AsyncStorage.setItem('admins', JSON.stringify(sortedAdmins));
      } catch (error) {
      } finally {
        // Set loading to false when data fetching is complete
        setLoading(false);
      }
    };

    fetchDataFromStorage();

    // Fetch from the API and set up interval
    fetchAdminData();
    const intervalId = setInterval(fetchAdminData, 300000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [status]);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#380E6B',
          height: 39,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 10,
            color: 'white',
          }}>
          Admin Management
        </Text>
        <TouchableOpacity onPress={handleView} style={{marginLeft: 5}}>
          <Icon source={'account-search'} size={30} color="white" />
        </TouchableOpacity>
      </View>
      {view ? (
        <Searchbar
          placeholder="Search by name"
          style={{marginTop: 0}}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
        />
      ) : null}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#533A71"
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          style={{marginBottom: 65}}
          data={filteredAdmins} // Set the data prop to your filteredAdmins
          keyExtractor={item => item.id.toString()} // Provide a key extractor function
          renderItem={({item}) => (
            <MyComponent
              key={item.id}
              name={item.name}
              email={item.email}
              date={handleDate(item.Date)}
              image={item.image}
              id={item.id}
              deleteadmin={() => deleteAdmin(item.id)}
              handleNav={() =>
                handleNav(
                  item.name,
                  item.id,
                  handleDate(item.Date),
                  item.email,
                  item.image,
                )
              }
            />
          )}
        />
      )}
    </>
  );
}
