import { MessageQuestion, Notification } from 'iconsax-react-native';
import React, { useEffect } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { appColor } from '../../constants/appColor';

export default UserHomeScreen = ({ navigation }) => {


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.lightBlue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => {
                return (
                    <View style={{
                        height: StatusBar.currentHeight + 5,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: 'bold',
                        }}>Sân bóng đá ĐTH</Text>
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
                        navigation.navigate("UserNotificationScreen");
                    }}>
                    <Notification size="25" color="white" />
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{
                        marginLeft: 5,
                        padding: 10
                    }}
                    onPress={() => {
                        return (
                            Alert.alert("Asdsad", "asdasd")
                        );
                    }}>
                    <MessageQuestion size="25" color="white" />
                </TouchableOpacity>
            ),
            

        })
    }, [])



    
    return (
        <View></View>
    );

}

