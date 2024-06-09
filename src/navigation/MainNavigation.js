import notifee, { AndroidImportance } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateTokenFCM } from '../api/user-api';
import { showNotification } from '../helpers/showNotification';
import AdminNavigation from './AdminNavigation';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';

const Stack = createNativeStackNavigator();
export default function MainNavigation() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.userData);

    const setupNotificationChannel = async () => {
        await notifee.createChannel({
            id: 'D20CNTT01',
            name: 'DTH',
            importance: AndroidImportance.HIGH,
        });
    };

    const requestUserPermission = async () => {
        await setupNotificationChannel();
        await notifee.requestPermission();
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };
    const getToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        const updateToken = await updateTokenFCM(token);
        console.log('Token:', token, updateToken, user);
    };

    useEffect(() => {
        if (user !== null && user !== undefined) {
            requestUserPermission();
            getToken();
            const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
                if (
                    user.role === 'user' &&
                    remoteMessage.data &&
                    remoteMessage.data.type === 'adminToUser' &&
                    remoteMessage.data.reciverIDS === user.id
                ) {
                    if (remoteMessage.notification) {
                        showNotification(
                            remoteMessage.notification.title,
                            remoteMessage.notification.body,
                            remoteMessage.notification.android ? remoteMessage.notification.android.imageUrl : null,
                        );
                    }
                } else if (
                    user.role === 'admin' &&
                    remoteMessage.data &&
                    remoteMessage.data.type === 'userToAdmin' &&
                    remoteMessage.data.reciverIDS === user.id
                ) {
                    if (remoteMessage.notification) {
                        showNotification(
                            remoteMessage.notification.title,
                            remoteMessage.notification.body,
                            remoteMessage.notification.android ? remoteMessage.notification.android.imageUrl : null,
                        );
                    }
                }
            });
            return unsubscribe;
        }
    }, [user]);

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthNavigation /> : user.role === 'admin' ? <AdminNavigation /> : <UserNavigation />}
        </NavigationContainer>
    );
}
