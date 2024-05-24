import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, ResetPasswordScreen,OnboardingScreen} from '../screens';



const Stack = createNativeStackNavigator()

export default AuthNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='OnboardingScreen' screenOptions={{ headerShown: false, }} >
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
}

