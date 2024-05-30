import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appbar, Menu, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { logout } from '../../redux/actions/authAction';

export default function HomeScreen({ navigation }) {
    const [pitches, setPitches] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const formatPriceToVND = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
                            Alert.alert('Xác nhận hành động', 'Bạn có chắc chắn muốn đăng xuất?', [
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
                            ]);
                        }}
                    >
                        <Icon name="logout" size={30} color="#fff" style={{ marginRight: 15 }} />
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
                    }}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>{user.name}</Text>
                </View>
            ),
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = firestore()
                .collection('pitches')
                .onSnapshot((querySnapshot) => {
                    const pitchesList = [];
                    querySnapshot.forEach((documentSnapshot) => {
                        pitchesList.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    });
                    setPitches(pitchesList);
                });

            return () => unsubscribe();
        }, []),
    );

    const navigateToAddNewPitches = () => {
        setMenuVisible(false);
        navigation.navigate('AddNewPitchesScreen');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.pitchItem}
            onPress={() => {
                navigation.navigate('PitchesDetailScreen', { pitchId: item.key });
            }}
        >
            <Image src={item.imageURL} style={styles.image}></Image>
            <Text style={styles.pitchName}>{item.name}</Text>
            <Text style={styles.pitchPrice}>{formatPriceToVND(parseFloat(item.price))}</Text>
        </TouchableOpacity>
    );

    return (
        <Fragment>
            <View style={styles.container}>
                <Image source={require('../../assets/logodth.png')} style={styles.logo} />
                <View style={styles.headerRow}>
                    <Text style={styles.pitchListTitle}>Danh sách sân bóng</Text>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <Icon name="add-circle" size={40} color="#ff4081" onPress={() => setMenuVisible(true)} />
                        }
                    >
                        <Menu.Item onPress={navigateToAddNewPitches} title="Thêm sân bóng" />
                    </Menu>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={pitches}
                    keyExtractor={(item) => item.key}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Fragment>
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
    pitchListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pitchList: {
        paddingHorizontal: 10,
    },
    pitchItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1,
    },
    pitchName: {
        position: 'absolute',
        left: 120,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    pitchPrice: {
        fontSize: 16,
        color: '#666',
    },
    addButton: {
        marginRight: 10,
    },
    image: {
        width: 100,
        height: 50,
    },
    flatListContainer: {
        paddingBottom: 70,
    },
});
