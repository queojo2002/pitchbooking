import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appColor } from '../../constants/appColor';
import { ArrowLeft, ArrowRight, InfoCircle, Polkadot } from 'iconsax-react-native';
import { Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDateTimeToHM } from '../../helpers/formatDateTimeToHM';
import { formatDateToVND } from '../../helpers/formatDateToVND';

export default MyComponent = ({ navigation, route }) => {
    const [pitchesBooking] = useState(route.params.pitchesBooking);

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
            headerTintColor: '#fff',
            headerTitle: () => {
                return (
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Chi tiết đặt sân
                    </Text>
                );
            },
        });
        console.log(pitchesBooking);
    }, []);

    return (
        <Card style={styles.container}>
            <Card.Cover
                source={{ uri: pitchesBooking.imageURL }}
                style={{
                    margin: 10,
                }}
            />
            <Card.Content>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'red',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                    }}
                    variant="titleLarge"
                >
                    {pitchesBooking.name}
                </Text>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="tooltip-text" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Người đặt: {pitchesBooking.fullname}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="email" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Email người đặt: {pitchesBooking.email}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="cellphone" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Số điện thoại người đặt: {pitchesBooking.phone}
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="format-list-numbered-rtl" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Mã giao dịch VNPAY: {pitchesBooking.TransactionNo}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="bank" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Mã giao dịch Ngân hàng: {pitchesBooking.BankTranNo}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="clock-time-five-outline" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Thời gian:{' '}
                            {formatDateTimeToHM(pitchesBooking.timeStart * 1000) +
                                ' - ' +
                                formatDateTimeToHM(pitchesBooking.timeEnd * 1000)}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <MaterialCommunityIcons name="clock-time-five-outline" size={20} color="black" />
                        <Text style={styles.textContent} variant="bodyMedium">
                            Thời gian đặt: {formatDateToVND(pitchesBooking.timeCreate * 1000)}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    textContent: {
        fontSize: 13,
        color: 'black',
        paddingBottom: 5,
    },
});
