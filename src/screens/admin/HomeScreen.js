import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';



export default function HomeScreen({ navigation }) {
    const [services, setServices] = useState([]);
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    const formatPriceToVND = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    const onLogoutPressed = async () => {
        await dispatch(logout())
    };

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f06292',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Xác nhận hành động",
                            "Bạn có chắc chắn muốn đăng xuất?",
                            [
                                {
                                    text: "Hủy bỏ",
                                    onPress: () => console.log("No Pressed"),
                                    style: "cancel"
                                },
                                {
                                    text: "Xác nhận",
                                    onPress: () => {
                                        onLogoutPressed()
                                    }
                                }
                            ]
                        );
                    }}>
                        <Icon name="logout" size={30} color="#fff" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: () => {
                return (
                    <View style={{ height: 30, justifyContent: "center", alignItems: "center", alignSelf: "center", alignContent: "center" }}>
                        <Text style={{ fontSize: 20, color: "white" }}>{user.name}</Text>
                    </View>
                );
            },
        });
    },[]);


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

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.serviceItem} onPress={() => {
            navigation.navigate('ServicesDetailScreen', { serviceId: item.key });
        }}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{formatPriceToVND(parseFloat(item.price))}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo123.png')} style={{
                alignContent: "center",
                alignSelf: "center",
                margin: 20,
                resizeMode: "contain"
            }} />
            <View style={styles.headerRow}>
                <Text style={styles.serviceListTitle}>Danh sách dịch vụ</Text>
                <Icon name="add-circle" size={40} color="#ff4081" style={styles.addButton} onPress={() => {
                    navigation.navigate("AddNewServicesScreen")
                }} />
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
    header: {
        backgroundColor: '#f06292',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    logo: {
        width: 100,
        height: 50,
        marginVertical: 10,
    },
    profileIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
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
        fontWeight: "bold",
        color: '#333',
    },
    servicePrice: {
        fontSize: 16,
        color: '#666',
    },
    addButton: {

    },
});

