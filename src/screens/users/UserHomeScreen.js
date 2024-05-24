import { MessageQuestion, Notification, } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View, StyleSheet, FlatList, Image } from 'react-native';
import { appColor } from '../../constants/appColor';
import Slides from '../../components/Slides';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
const pitch = [
    {
        pitchId: '1',
        status: 'chưa đặt',
        image: require('../../assets/background2.jpg'),
        money: '200.000 VNĐ'
    },
    {
        pitchId: '2',
        status: 'chưa đặt',
        image: require('../../assets/background3.jpg'),
        money: '200.000 VNĐ'
    },
    {
        pitchId: '3',
        status: 'chưa đặt',
        image: require('../../assets/background2.jpg'),
        money: '200.000 VNĐ'
    },
    {
        pitchId: '4',
        status: 'chưa đặt',
        image: require('../../assets/background2.jpg'),
        money: '200.000 VNĐ'
    },
    {
        pitchId: '5',
        status: 'chưa đặt',
        image: require('../../assets/background3.jpg'),
        money: '200.000 VNĐ'
    },
];

export default UserHomeScreen = ({ navigation }) => {

    const user = useSelector(state => state.auth.userData);
    const [imageLoaded, setImageLoaded] = useState(false);

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
            headerTitle: '',
            headerLeft: () => {
                return (
                    <View style={{ height: StatusBar.currentHeight + 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ paddingLeft: 7 }}>
                                <Image
                                    source={{ uri: "https://ui-avatars.com/api/?name=" + user.name + "&size=128" }}
                                    style={{ ...styles.logo, borderRadius: 64, aspectRatio: 1 }}
                                    onLoadEnd={() => setImageLoaded(true)}
                                />
                            </View>
                            <Text style={{
                                fontSize: 14,
                                color: 'white',
                                fontWeight: 'bold',
                                paddingLeft: 5,
                            }}>
                                Trần Văn Đức
                            </Text>
                        </View>
                    </View>
                );
            },
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 5,
                        padding: 10
                    }}
                    onPress={() => {
                        Alert.alert("Notification", "This is a notification");
                    }}>
                    <Notification size="25" color="white" />
                </TouchableOpacity>
            ),

        });
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>Sân số: {item.pitchId}</Text>
            <Image source={item.image} style={styles.image} />
            <Text>Trạng thái: {item.status}</Text>
            <Text>Giá tiền: {item.money}</Text>
        </View>
    );

    return (
        <Fragment>
        {!imageLoaded ? <ActivityIndicator style={{flex: 1}}/> 
        : (
        <View style={styles.background}>
            <View style={{
                ...styles.address, flexDirection: 'row', alignItems: 'center',
            }}>
                <Image source={require('../../assets/logodth.png')} style={styles.logo} />
                <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1 }}>
                    <Text style={{
                        ...styles.text,
                        fontSize: 16,
                        color: appColor.blackblue,
                        fontFamily: 'italic'
                    }}>Sân bóng đá ĐTH</Text>
                    <Text style={{
                        fontSize: 12,
                        color: appColor.blackblue,
                        fontFamily: 'italic',
                        flexShrink: 1,
                    }}>Địa chỉ: 223 Đường Huỳnh Văn Lũy, Phú Hòa, Thành Phố Thủ Dầu Một, Bình Dương</Text>
                </View>
            </View>
            <Slides />
            <FlatList
                data={pitch}
                renderItem={renderItem}
                keyExtractor={item => item.pitchId}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
        )
        }
        </Fragment>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginBottom: 60,
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    text: {
        fontSize: 13,
        marginRight: 30,
        color: "#ccc",
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    flatListContainer: {

    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        margin: 8,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 5,
    },
});
