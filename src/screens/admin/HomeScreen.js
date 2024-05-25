import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Appbar, Menu, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions/authAction';

export default function HomeScreen({navigation}) {
  const [services, setServices] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const formatPriceToVND = price => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const onLogoutPressed = async () => {
    await dispatch(logout());
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#090210',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Xác nhận hành động',
                'Bạn có chắc chắn muốn đăng xuất?',
                [
                  {
                    text: 'Hủy bỏ',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Xác nhận',
                    onPress: () => {
                      onLogoutPressed();
                    },
                  },
                ],
              );
            }}>
            <Icon
              name="logout"
              size={30}
              color="#fff"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>{user.name}</Text>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot(querySnapshot => {
        const servicesList = [];
        querySnapshot.forEach(documentSnapshot => {
          servicesList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setServices(servicesList);
      });

    return () => unsubscribe();
  }, []);
  const navigateToAddNewServices = () => {
    setMenuVisible(false);
    navigation.navigate('AddNewServicesScreen');
  };
  const navigateToAddNewPitches = () => {
    setMenuVisible(false);
    navigation.navigate('AddNewPitchesScreen');
  };  
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => {
        navigation.navigate('ServicesDetailScreen', {serviceId: item.key});
      }}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>
        {formatPriceToVND(parseFloat(item.price))}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logodth.png')} style={styles.logo} />
      <View style={styles.headerRow}>
        <Text style={styles.serviceListTitle}>Danh sách dịch vụ</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Icon
              name="add-circle"
              size={40}
              color="#ff4081"
              onPress={() => setMenuVisible(true)}
            />
          }>
            <Menu.Item onPress={navigateToAddNewServices} title="Add New Service" />
            <Menu.Item onPress={navigateToAddNewPitches} title="Thêm sân bóng" />
        </Menu>
      </View>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.serviceList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    alignContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  serviceListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceList: {
    paddingHorizontal: 10,
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  servicePrice: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    marginRight: 10,
  },
});
