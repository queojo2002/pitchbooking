import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, ResetPasswordScreen, StartScreen } from '../screens';



const Stack = createNativeStackNavigator()

export default AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='StartScreen' screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
}

