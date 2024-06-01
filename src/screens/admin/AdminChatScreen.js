import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { appColor } from '../../constants/appColor';

const AdminChatScreen = ({ navigation }) => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const snapshot = await firestore()
                    .collection('users')
                    .where('role', '==', 'user')
                    .get();

                const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUser(users);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admins: ", error);
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleAdminPress = (user) => {
        navigation.navigate('ChatScreen', { user });
    };

    const renderAdminItem = ({ item }) => (
        <TouchableOpacity style={styles.adminItem} onPress={() => handleAdminPress(item)}>
            <View style={styles.contentContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.adminName}>Tên: {item.name}</Text>
                    <Text style={styles.phoneNumber}>Số điện thoại {item.phone}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderAdminItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FEFAF6',
        paddingTop: 20,
    },
    filterContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    adminItem: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    contentContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 20,
    },
    textContainer: {
        flexDirection: 'column',
    },
    adminName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    phoneNumber: {
        fontSize: 16,
    },
});

export default AdminChatScreen;
