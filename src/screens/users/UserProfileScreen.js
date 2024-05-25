import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import ProfileThumbnail from '../../components/ProfileThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { logout } from '../../redux/actions/authAction';
import { truncate } from '../../helpers/truncateString';
import auth from '@react-native-firebase/auth';
import { LOGIN_SUCCESS } from '../../redux/actions';
import { useFocusEffect } from '@react-navigation/native';
import { appColor } from '../../constants/appColor';

const UserProfileScreen = ({navigation}) => {
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            if (auth().currentUser) {
                auth().currentUser.reload().then(() => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            ...user,
                            ...auth().currentUser,
                        },
                    });
                });
            }
        }, [dispatch, user])
    );
    const handleUpdateProfile = () => {
        navigation.navigate('UserProfileEditScreen');
    };
    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ProfileThumbnail 
                    avatar={user.avatar}
                    name={user.name} 
                    phone={user.phone} 
                />
            </View>
            <ScrollView style={styles.detailsSection}>
                <ProfileDetailItem 
                    icon="mail" 
                    title={user._user.emailVerified ? "Email - Đã xác thực" : "Email - Chưa xác thực"} 
                    subtitle={user.email} 
                />
                <ProfileDetailItem 
                    icon="phone" 
                    title="Số điện thoại" 
                    subtitle={user.phone} 
                />
                <ProfileDetailItem 
                    icon="location-on" 
                    title="Địa chỉ" 
                    subtitle={truncate(user.address, 15)} 
                />
                <TouchableOpacity onPress={handleUpdateProfile}>
                    <Text style={styles.updateText}>Cập nhật thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton}>
                    <Button onPress={async () => { await dispatch(logout()) }}>
                        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                    </Button>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appColor.blackblue,
        height: '30%',
    },
    detailsSection: {
        flex: 1,
        marginBottom: 50,
    },
    logoutButton: {
        backgroundColor: appColor.blackblue,
        margin: 20,
        borderRadius: 20,
    },
    logoutButtonText: {
        color: 'white',
        padding: 10,
    },
    updateText: {
        textAlign: 'center',
        color: appColor.blackblue,
        textDecorationLine: 'underline',
        marginTop:10,
    },
});

export default UserProfileScreen;
