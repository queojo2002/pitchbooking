//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { appColor } from '../../constants/appColor';

// create a component
export default UseConfirmBooking = ({ navigation }) => {


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: "green",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => {
                return (
                    <Text style={{
                        fontSize: 14,
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        Thanh toán đặt sân
                    </Text>
                );
            },

        });
    })

    return (
        <View style={{
            flex: 1
        }}>




            <WebView
                style={{
                    backgroundColor: 'blue',
                    width: '100%',
                    height: '100%',
                }}
                scrollEnabled={true}
                
                source={{
                    uri: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1000000&vnp_Command=pay&vnp_CreateDate=20240529081855&vnp_CurrCode=VND&vnp_ExpireDate=20240529083355&vnp_IpAddr=171.240.208.111&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+GD%3A9063&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Fkkts.vanduc.top%2Fvnpay_php%2Fvnpay_return.php&vnp_TmnCode=6LY4D08E&vnp_TxnRef=9063&vnp_Version=2.1.0&vnp_SecureHash=5c9e63c3f809834787ad285dba0416d39058aab92edf203f49e746303d815fc556723bddde2bab31da03ab22954385b5bab633b008217fcf7d5e9a418196bedc'
                }}
                onShouldStartLoadWithRequest={(event) => {
                    console.log(event.url)
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


