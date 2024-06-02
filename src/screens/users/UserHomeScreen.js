import { Notification } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { loadAllPith } from '../../api/pitch-api';
import { appColor } from '../../constants/appColor';
import { formatPriceToVND } from '../../helpers/formatPriceToVND';

const screenWidth = Dimensions.get('window').width;

export default UserHomeScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.userData);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [pitchLoaded, setPitchLoaded] = useState(false);
    const [pitch, setPitch] = useState([]);

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
                                    source={{
                                        uri: user.imageURL
                                            ? user.imageURL
                                            : 'https://ui-avatars.com/api/?name=' + user.fullname + '&size=128',
                                    }}
                                    style={{ ...styles.logo, borderRadius: 64, aspectRatio: 1 }}
                                    onLoadEnd={() => setImageLoaded(true)}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    paddingLeft: 5,
                                }}
                            >
                                {user.fullname}
                            </Text>
                        </View>
                    </View>
                );
            },
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 5,
                        padding: 10,
                    }}
                    onPress={async () => {
                        return navigation.navigate('UserNotificationScreen');
                    }}
                >
                    <Notification size="25" color="white" />
                </TouchableOpacity>
            ),
        });

        const loadPitch = async () => {
            try {
                const res = await loadAllPith();
                if (res.error) {
                    console.warn('Error', res.error);
                } else {
                    setPitch(res.data);
                    setPitchLoaded(true);
                }
            } catch (error) {
                console.warn('Error', error.message);
            }
        };
        loadPitch();
    }, [user]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            key={item.name}
            onPress={() => navigation.navigate('UserBookingScreen', { item: item })}
        >
            <Text style={{ ...styles.title, color: appColor.blackblue }}>{item.name}</Text>
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <Text
                style={{
                    marginTop: 5,
                    marginBottom: 5,
                    color: appColor.blackblue,
                    fontSize: 13,
                }}
            >
                Trạng thái:{' '}
                {item.status == 0 ? (
                    <Text style={{ color: 'red' }}>Đang mở</Text>
                ) : (
                    <Text style={{ color: 'green' }}>Đang đóng</Text>
                )}
            </Text>

            <Text
                style={{
                    marginBottom: 5,
                    color: appColor.blackblue,
                    fontSize: 13,
                }}
            >
                Loại sân:
                {item.type == 0 ? (
                    <Text style={{ color: 'red' }}> Sân 5</Text>
                ) : item.type == 1 ? (
                    <Text style={{ color: '#B50163' }}> Sân 7</Text>
                ) : item.type == 2 ? (
                    <Text style={{ color: '#329606' }}> Sân 11</Text>
                ) : (
                    <Text style={{ color: 'green' }}>Liên hệ chủ sân để biết thêm chi tiết</Text>
                )}
            </Text>

            <Text
                style={{
                    color: appColor.blackblue,
                    fontSize: 13,
                }}
            >
                Giá tiền / 1 tiếng: <Text style={{ color: 'blue' }}>{formatPriceToVND(item.price)}</Text>
            </Text>
        </TouchableOpacity>
    );

    return (
        <Fragment>
            {!imageLoaded || !pitchLoaded || !user ? (
                <ActivityIndicator style={{ flex: 1 }} />
            ) : (
                <View style={styles.background}>
                    <View
                        style={{
                            ...styles.address,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image source={require('../../assets/logodth.png')} style={styles.logo} />
                        <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1 }}>
                            <Text
                                style={{
                                    ...styles.text,
                                    fontSize: 16,
                                    color: 'green',
                                    fontStyle: 'italic',
                                }}
                            >
                                Sân bóng đá ĐTH
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: appColor.blackblue,
                                    fontFamily: 'italic',
                                    flexShrink: 1,
                                }}
                            >
                                223 Đường Huỳnh Văn Lũy, Phú Hòa, Thành Phố Thủ Dầu Một, Bình Dương
                            </Text>
                        </View>
                    </View>

                    <FlatList
                        data={pitch}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        numColumns={1}
                        contentContainerStyle={styles.flatListContainer}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
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
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    text: {
        fontSize: 13,
        marginRight: 30,
        color: '#ccc',
    },
    logo: {
        width: 85,
        height: 30,
        resizeMode: 'contain',
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
        width: screenWidth - 25,
        height: 130,
        borderRadius: 5,
        resizeMode: 'cover',
    },
});
