import React, { useEffect, useState,Fragment} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator,Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { appColor } from '../../constants/appColor';
const UserChatScreen = ({ navigation }) => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.blackblue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => {
                return (
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: 'bold',
                        }}>
                       Nhắn tin
                    </Text>
                );
            },
        });

        const fetchAdmins = async () => {
            try {
                const snapshot = await firestore()
                    .collection('users')
                    .where('role', '==', 'admin')
                    .get();

                const admins = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAdmins(admins);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admins: ", error);
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleAdminPress = (admin) => {
        navigation.navigate('ChatScreen', { admin });
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
        <Fragment>
            <View style={styles.container}>
            <FlatList
                data={admins}
                renderItem={renderAdminItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
                keyExtractor={(item) => item.id}
            />
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'left',

    },
    filterContainer: {
        backgroundColor: '#FEFAF6',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
       
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

export default UserChatScreen;
