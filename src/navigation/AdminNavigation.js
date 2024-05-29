import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddNewServicesScreen, Dashboard,AddNewPitchesScreen,PitchesDetailScreen,UpdatePitchesScreen} from '../screens';
import AdminBottomNavigation from './AdminBottomNavigation';
import AddNotificationScreen from '../screens/admin/AddNotificationScreen';
import { appColor } from '../constants/appColor';



const Stack = createNativeStackNavigator()

export default AdminNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='AdminBottomNavigation' screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="AdminBottomNavigation" component={AdminBottomNavigation} />
            <Stack.Screen name="AddNewPitchesScreen" component={AddNewPitchesScreen} />
            <Stack.Screen name="PitchesDetailScreen" component={PitchesDetailScreen} />
            <Stack.Screen name="UpdatePitchesScreen" component={UpdatePitchesScreen} />
            <Stack.Screen name="AddNotificationScreen" component={AddNotificationScreen} 
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: appColor.blackblue },
                    headerTintColor: '#fff',
                    headerTitle: 'Send Notification',
                }}
            />

            
        </Stack.Navigator>
    );
}