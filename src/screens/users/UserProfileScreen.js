import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from '../../constants/appColor';
import { subscribeToUser } from '../../api/user-api';
import { logout, updateUsers } from '../../redux/actions/authAction';
import ProfileThumbnail from '../../components/ProfileThumbnail';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import { truncate } from '../../helpers/truncateString';

const UserProfileScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    useEffect(() => {

        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.blackblue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => {
                return (
                    <Text style={{
                        fontSize: 14,
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        Thông tin cá nhân
                    </Text>
                );
            },
        });

        
        const unsubscribe = subscribeToUser((res) => {
            if (res.error) {
                console.error("Error1", res.error);
            } else {
                dispatch(updateUsers({
                    ...res.data,
                    emailVerified: res.emailVerified,
                }))
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <Fragment>
            {!user ? <ActivityIndicator animating={true} color={appColor.blackblue} size="large" style={{ flex: 1 }} /> :
                (
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
                                title={user.emailVerified ? "Email - Đã xác thực" : "Email - Chưa xác thực"}
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
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('UserProfileEditScreen');
                            }}>
                                <Text style={styles.updateText}>Cập nhật thông tin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoutButton}>
                                <Button onPress={async () => { await dispatch(logout()) }}>
                                    <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                                </Button>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )
            }
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#8A8A8A",
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
        marginTop: 10,
    },
});

export default UserProfileScreen;
