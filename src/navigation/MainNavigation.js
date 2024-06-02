import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthNavigation from './AuthNavigation';
import AdminNavigation from './AdminNavigation';
import UserNavigation from './UserNavigation';
import axios from 'axios';
import { loadUser } from '../api/user-api';
import { logout } from '../redux/actions/authAction';

const Stack = createNativeStackNavigator();
export default function MainNavigation() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    /* useEffect(() => {
        const checkAccessToken = async () => {
            if (isAuthenticated) {
                const accessToken = user.accessToken;
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const userGet = await loadUser();
                console.log(userGet);
                if (userGet.status === 2) {
                    dispatch(logout());
                }
            }
        };
        checkAccessToken();
    }, []); */

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthNavigation /> : user.role === 'admin' ? <AdminNavigation /> : <UserNavigation />}
        </NavigationContainer>
    );
}
