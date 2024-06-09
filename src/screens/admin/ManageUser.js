import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loadAllUserAndCountBooking } from '../../api/user-api';
import { appColor } from '../../constants/appColor';

const ManagerUser = ({ navigation }) => {
    const [user, setUser] = useState([]);
    const dispatch = useDispatch();

    const loadUser = async () => {
        try {
            const usersData = await loadAllUserAndCountBooking();
            if (usersData.status === 1) {
                setUser(usersData.data);
            } else {
                throw new Error(usersData.message);
            }
        } catch (error) {
            console.log(error, 1);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadUser();
        }, []),
    );

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.blackblue,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => <Text style={styles.headerTitle}>Quản lý người dùng</Text>,
        });
    }, [dispatch, navigation]);

    const renderItem = ({ item }) => (
        <Card
            onPress={() => {
                Alert.alert(`User ID: ${item.id}`);
            }}
            style={styles.card}
        >
            <Card.Title
                title={<Text style={styles.cardTitle}>{item.fullname}</Text>}
                subtitle={<Text style={styles.cardSubtitle}>{item.email}</Text>}
                left={() => (
                    <Image
                        source={{
                            uri: item.imageURL || `https://ui-avatars.com/api/?name=${item.fullname}&size=128`,
                        }}
                        style={styles.avatar}
                    />
                )}
                right={() => <Text style={styles.times}>Số lần đặt: {item.countBooking}</Text>}
            />
        </Card>
    );

    return (
        <View>
            <FlatList
                data={user}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.container}
                ListEmptyComponent={<ActivityIndicator size="large" color={appColor.blackblue} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        marginBottom: 50,
    },
    note: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    texttimes: {
        fontWeight: 'bold',
        marginLeft: 120,
    },
    textinfo: {
        marginLeft: 40,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 5,
    },
    times: {
        paddingRight: 20,
        fontSize: 13,
        color: appColor.blackblue,
    },
});

export default ManagerUser;
