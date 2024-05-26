import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { appColor } from '../constants/appColor';
import { UserBookingScreen, UserHomeScreen, UserNotificationScreen, UserProfileEditScreen } from '../screens';
import UserBottomNavigation from './UserBottomNavigation';


const Stack = createStackNavigator();

const UserNavigation = () => {
    

    return (
        <Stack.Navigator
            initialRouteName='UserBottomNavigation'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.SlideFromRightIOS,
            }}
        >
            <Stack.Screen name="UserBottomNavigation" component={UserBottomNavigation} />
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
            <Stack.Screen
                name="UserProfileEditScreen"
                component={UserProfileEditScreen}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: appColor.blackblue },
                    headerTintColor: '#fff',
                    headerTitle: 'Cập nhật thông tin',
                }}
            />
            <Stack.Screen
                name="UserNotificationScreen"
                component={UserNotificationScreen}
                
            />
            <Stack.Screen
                name="UserBookingScreen"
                component={UserBookingScreen}
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    menu: {
        backgroundColor: '#E0E0E0',
        height: "90%",
        justifyContent: "center"
    },
    menuItem: {
        paddingHorizontal: 10,
    },
    menuItemText: {
        fontSize: 16,
        color: appColor.darkGray,
    },
    line: {
        borderBottomWidth: 0.5,
    },
});

export default UserNavigation;
