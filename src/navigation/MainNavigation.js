import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavigation from './AdminNavigation';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import { logout } from '../redux/actions/authAction';

const Stack = createNativeStackNavigator();
export default function MainNavigation() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.userData);
    /*     const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
        console.log(isAuthenticated);
    }, []); */
    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthNavigation /> : user.role === 'admin' ? <AdminNavigation /> : <UserNavigation />}
        </NavigationContainer>
    );
}
