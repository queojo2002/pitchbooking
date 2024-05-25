import { MessageQuestion, Notification, } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View, StyleSheet, FlatList, Image, TouchableHighlight, Touchable } from 'react-native';
import { appColor } from '../../constants/appColor';
import Slides from '../../components/Slides';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { loadAllPith } from '../../api/pitch-api';




export default UserHomeScreen = ({ navigation }) => {

    const user = useSelector(state => state.auth.userData);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [pitchLoaded, setPitchLoaded] = useState(false);
    const [pitch, setPitch] = useState([]);
    const formatPriceToVND = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

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
                            <View style={{ paddingLeft: 10 }}>
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
                                {user.name}
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
                        return (
                            navigation.navigate("UserNotificationScreen")
                        );
                    }}>
                    <Notification size="25" color="white" />
                </TouchableOpacity>
            ),

        });


        const unsubscribe = loadAllPith((res) => {
            if (res.error) {
                Alert.alert("Error", res.error);
            } else {
                setPitch(res.data);
                setPitchLoaded(true);
            }
        });

        return () => unsubscribe();


    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert("assd", item.name)} key={item.name}>
            <Text style={{
                ...styles.title,
                color: appColor.blackblue,
            }}>{item.name}</Text>
            <Image source={{
                uri: item.imageURL,
            }} style={styles.image} />
            <Text style={{ marginTop: 10, marginBottom: 5, color: appColor.blackblue, fontSize: 13 }}>Trạng thái: {item.status == 1 ? <Text style={{ color: "red" }}>Đang mở</Text> : <Text style={{ color: "green" }}>Đang đóng</Text>}</Text>
            <Text style={{ color: appColor.blackblue, fontSize: 13 }}>Giá tiền: <Text style={{ color: "blue" }}>{formatPriceToVND(item.price)}</Text></Text>
        </TouchableOpacity>
    );

    return (
        <Fragment>
            {(!imageLoaded || !pitchLoaded) ? <ActivityIndicator style={{ flex: 1 }} />
                : (
                    <View style={styles.background}>
                        <View style={{
                            ...styles.address, flexDirection: 'row', alignItems: 'center',
                        }}>
                            <Image source={require('../../assets/Logodth.png')} style={styles.logo} />
                            <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1 }}>
                                <Text style={{
                                    ...styles.text,
                                    fontSize: 16,
                                    color: "green",
                                    fontStyle: 'italic',
                                }}>Sân bóng đá ĐTH</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: appColor.blackblue,
                                    fontFamily: 'italic',
                                    flexShrink: 1,
                                }}>223 Đường Huỳnh Văn Lũy, Phú Hòa, Thành Phố Thủ Dầu Một, Bình Dương</Text>
                            </View>
                        </View>

                        <FlatList
                            data={pitch}
                            renderItem={renderItem}
                            keyExtractor={item => item.name}
                            numColumns={1}
                            contentContainerStyle={styles.flatListContainer}
                            showsVerticalScrollIndicator={false}

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
        backgroundColor: 'white',
        marginBottom: 50,
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
        width: 85,
        height: 30,
        resizeMode: "contain"
    },
    flatListContainer: {
         paddingBottom: 20,   
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        margin: 8,
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: appColor.blackblue,
        borderWidth: 0.5,
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
        resizeMode: 'cover',
    },
});




