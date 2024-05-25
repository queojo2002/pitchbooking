import React, { Fragment, useEffect } from 'react';
import { appColor } from '../../constants/appColor';
import { Image, ImageBackground, Text, View } from 'react-native';



export default function UserBookingScreen({ navigation }) {


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
            headerTitle: 'Đặt sân',

        });

    });




    return (
        <Fragment>
            <Image
                source={require('../../assets/logodth.png')}
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    marginTop: 50,
                    resizeMode: "contain"
                }}
            />
        </Fragment>
    );
}