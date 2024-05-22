import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import ProfileThumbnail from '../../components/ProfileThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import { logout } from '../../redux/actions/authAction';
import { truncate } from '../../helpers/truncateString';


export default UserProfileScreen = () => {

    /* const {
        name = 'Đức Anh',
        phone = '0326393540',
        avatar = 'https://randomuser.me/api/portraits/men/98.jpg',
        textColor = 'blue',
        onPress = null
    } = props; */
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ProfileThumbnail name={user.name} phone={user.phone}/>
            </View>
            <ScrollView style={styles.detailsSection}>
                <ProfileDetailItem icon="mail" title="Email" subtitle={user.email}></ProfileDetailItem>
                <ProfileDetailItem icon="phone" title="Số điện thoại" subtitle={user.phone}></ProfileDetailItem>
                <ProfileDetailItem icon="location-on" title="Địa chỉ" subtitle={truncate(user.address, 15)}></ProfileDetailItem>

                <TouchableOpacity style={{
                    backgroundColor: '#10B3C4',
                    margin: 20,
                    borderRadius: 20
                }}>
                    <Button onPress={async () => { await dispatch(logout()) }}>
                        <Text style={{ color: 'white', padding: 10 }}>Đăng xuất</Text>
                    </Button>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#10B3C4",
        height: '30%',

    },
    detailsSection: {
        flex: 1,
        marginBottom: 50,
    },
});
