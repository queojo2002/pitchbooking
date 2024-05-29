
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';

export default SettingsScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, []);



    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f06292',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: () => {
                return (
                    <View style={{ height: 30, justifyContent: "center", alignItems: "center", alignSelf: "center", alignContent: "center" }}>
                        <Text style={{ fontSize: 20, color: "white" }}>{user.name}</Text>
                    </View>
                );
            },
        });
    }, []);


    if (!user) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text>Test sử dụng lấy dữ liệu Redux</Text>
            <Text>Xin chào {user.name}</Text>

            <TouchableOpacity onPress={() => dispatch(logout())}>
                <Text style={{ color: 'red' }}>Nhấn vào đây để Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

