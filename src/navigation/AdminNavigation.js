import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddNewServicesScreen, Dashboard, ServicesDetailScreen, UpdateServicesScreen,AddNewPitchesScreen } from '../screens';
import AdminBottomNavigation from './AdminBottomNavigation';



const Stack = createNativeStackNavigator()

export default AdminNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='AdminBottomNavigation' screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="AdminBottomNavigation" component={AdminBottomNavigation} />
            <Stack.Screen name="ServicesDetailScreen" component={ServicesDetailScreen} />
            <Stack.Screen name="AddNewServicesScreen" component={AddNewServicesScreen} />
            <Stack.Screen name="AddNewPitchesScreen" component={AddNewPitchesScreen} />
            <Stack.Screen name="UpdateServicesScreen" component={UpdateServicesScreen} />
        </Stack.Navigator>
    );
}