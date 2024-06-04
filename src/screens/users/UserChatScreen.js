import { CloseSquare, SearchNormal1 } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import { loadInfoAdmin } from '../../api/user-api';
import { appColor } from '../../constants/appColor';
const UserChatScreen = ({ navigation }) => {
    
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
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
                        }}
                    >
                        Nhắn tin
                    </Text>
                );
            },
        });

        const fetchAdmins = async () => {
            try {
                const admins = await loadInfoAdmin();
                if (admins.status === 1) {
                    setAdmins(admins.data);
                    setLoading(false);
                } else {
                    throw new Error('Không thể lấy dữ liệu người dùng.');
                }
            } catch (error) {
                console.error('Error fetching admins: ', error);
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const renderAdminItem = ({ item }) => (
        <TouchableOpacity style={styles.adminItem} onPress={() => navigation.navigate('ChatScreen', { item })}>
            <View style={styles.contentContainer}>
                <Image source={{ uri: item.imageURL }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.adminName}>{item.fullname}</Text>
                    <Text>Bạn: Hiện tin nhắn mới nhất : 7:30</Text>
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
                <View style={styles.searchContainer}>
                    <SearchNormal1 name="search" size={20} color="#C8C8C8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm ..."
                        placeholderTextColor="gray"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                            <CloseSquare name="close" size={20} color="black" />
                        </TouchableOpacity>
                    )}
                </View>
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
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'left',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#FCFCFC',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 5,
        height: 40,
        margin: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        paddingVertical: 0,
    },
    filterContainer: {
        backgroundColor: '#ffff',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
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
        marginTop: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 50,
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
