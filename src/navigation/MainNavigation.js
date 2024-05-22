import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigation from './AuthNavigation';
import AdminNavigation from './AdminNavigation';
import UserNavigation from './UserNavigation';

const Stack = createNativeStackNavigator()
export default function MainNavigation() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.userData);

    return (
        <NavigationContainer>
            {!isAuthenticated ?
                <AuthNavigation />
                : user.role === 'admin' ? (
                    <AdminNavigation />
                ) : (
                    <UserNavigation />
                )
            }
        </NavigationContainer>
    );
}
