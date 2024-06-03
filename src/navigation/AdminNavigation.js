import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    AddNewServicesScreen,
    Dashboard,
    AddNewPitchesScreen,
    PitchesDetailScreen,
    UpdatePitchesScreen,
    AdminChatScreen,
    ChatScreen,
} from '../screens';
import AdminBottomNavigation from './AdminBottomNavigation';
import { appColor } from '../constants/appColor';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default AdminNavigation = () => {
    return (
        <GestureHandlerRootView>
            <Stack.Navigator initialRouteName="AdminBottomNavigation" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AdminBottomNavigation" component={AdminBottomNavigation} />
                <Stack.Screen name="AddNewPitchesScreen" component={AddNewPitchesScreen} />
                <Stack.Screen name="PitchesDetailScreen" component={PitchesDetailScreen} />
                <Stack.Screen name="UpdatePitchesScreen" component={UpdatePitchesScreen} />
                <Stack.Screen name="AdminChatScreen" component={AdminChatScreen} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    );
};