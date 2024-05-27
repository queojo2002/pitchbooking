import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { appColor } from '../../constants/appColor';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfileEditItem from '../../components/ProfileEditItem';
import ProfileDetailItem from '../../components/ProfileDetailItem';

const UserProfileEditScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.userData);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [avatar, setAvatar] = useState(user.avatar);

    const handleSaveChanges = async () => {
        try {
            await firestore().collection('users').doc(user.email).update({
                name: name,
                phone: phone,
                address: address,
                avatar: avatar
            });
            Alert.alert(
                'Thông báo',
                'Cập nhật thông tin thành công.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
            navigation.goBack();
        } catch (error) {
            console.log("Error updating profile: ", error);
            Alert.alert(
                'Thông báo',
                'Có lỗi xảy ra. Vui lòng thử lại sau.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }
    };

    const handleImageUpload = async () => {
        try {
            const options = {
                mediaType: 'photo',
                quality: 0.5,
                allowsEditing: true,
                aspect: [1, 1]
            };
            launchImageLibrary(options, async (response) => {
                console.log("ImagePicker response:", response);
                if (!response.didCancel) {
                    const { uri } = response.assets[0];
                    const imageName = `avatar_${user.uid}`;
                    const storageRef = storage().ref().child(`avatars/${imageName}`);
                    await storageRef.putFile(uri);
                    const downloadURL = await storageRef.getDownloadURL();
                    console.log("Download URL:", downloadURL);
                    setAvatar(downloadURL);
                }
            });
        } catch (error) {
            console.log('Error uploading image: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <TouchableOpacity onPress={handleImageUpload}>
                    <Image
                        source={{ uri: avatar || `https://ui-avatars.com/api/?name=${name}&size=128` }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.detailsSection}>
                <ProfileDetailItem
                    icon="mail"
                    title={user.emailVerified ? "Email - Đã xác thực" : "Email - Chưa xác thực"}
                    subtitle={user.email}
                            />
                <ProfileEditItem
                    icon="person"
                    title="Tên"
                    editable
                    value={name}
                    onChangeText={setName}
                />
                <ProfileEditItem
                    icon="location-on"
                    title="Địa chỉ"
                    editable
                    value={address}
                    onChangeText={setAddress}
                />
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
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
        marginHorizontal: 20,
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: appColor.blackblue,
        padding: 10,
        borderRadius: 5,
        marginHorizontal:30,
        borderRadius: 20,
        marginBottom: 10,
        alignItems:'center',
        justifyContent:'center',
        height:'10%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
});

export default UserProfileEditScreen;
