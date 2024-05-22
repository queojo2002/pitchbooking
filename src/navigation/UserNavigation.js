import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserHomeScreen } from '../screens';
import UserBottomNavigation from './UserBottomNavigation';



const Stack = createNativeStackNavigator()

export default UserNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='UserBottomNavigation' screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="UserBottomNavigation" component={UserBottomNavigation} />
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
        </Stack.Navigator>
    );
}

