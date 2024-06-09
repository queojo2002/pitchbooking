import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { checkIsBooking } from '../../api/pitch-api';
import { userSendNotification } from '../../api/user-api';
import { useSelector } from 'react-redux';

export default UseConfirmBooking = ({ navigation, route }) => {
    const { data, item } = route.params;
    const checkIsBookingRef = useRef();
    const user = useSelector((state) => state.auth.userData);

    const sendNotification = async () => {
        try {
            const res = await userSendNotification(
                'Đặt sân',
                'Người dùng ' +
                    user.fullname +
                    ' đã đặt sân ' +
                    item.name +
                    ' - Trạng thái: <b style="color: green">Đã thanh toán</b>',
                item.imageURL,
            );
            if (res.status === 1) {
                console.log('OK');
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: 'green',
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
                        Thanh toán đặt sân
                    </Text>
                );
            },
        });
    }, []);

    useEffect(() => {
        checkIsBookingRef.current = setInterval(() => {
            try {
                const check = async () => {
                    const res = await checkIsBooking(data.id);
                    if (res.status === 1 || res.status === 2) {
                        console.log('Sending notification'); // Debugging log
                        await sendNotification();
                        clearInterval(checkIsBookingRef.current);
                        navigation.goBack();
                        navigation.navigate('UserHistoryScreen');
                    }
                };
                check();
            } catch (error) {
                console.log(error);
            }
        }, 5000);

        return () => {
            clearInterval(checkIsBookingRef.current);
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <WebView
                style={{
                    width: '100%',
                    height: '100%',
                }}
                scrollEnabled={true}
                source={{
                    uri: data.url,
                }}
                onShouldStartLoadWithRequest={(event) => {
                    return true;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
