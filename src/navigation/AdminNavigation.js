import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddNewServicesScreen, Dashboard,AddNewPitchesScreen,PitchesDetailScreen,UpdatePitchesScreen} from '../screens';
import AdminBottomNavigation from './AdminBottomNavigation';
import { appColor } from '../constants/appColor';



const Stack = createNativeStackNavigator()

export default AdminNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='AdminBottomNavigation' screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="AdminBottomNavigation" component={AdminBottomNavigation} />
            <Stack.Screen name="AddNewPitchesScreen" component={AddNewPitchesScreen} />
            <Stack.Screen name="PitchesDetailScreen" component={PitchesDetailScreen} />
            <Stack.Screen name="UpdatePitchesScreen" component={UpdatePitchesScreen} />

            
        </Stack.Navigator>
    );
}