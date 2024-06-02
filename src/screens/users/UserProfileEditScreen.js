import storage from '@react-native-firebase/storage';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../api/user-api';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import ProfileEditItem from '../../components/ProfileEditItem';
import { appColor } from '../../constants/appColor';
import { User } from '../../model/User';
import { loginSuccess } from '../../redux/actions/authAction';

const UserProfileEditScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.userData);
    const [fullname, setFullName] = useState(user.fullname);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [imageURL, setImageURL] = useState(user.imageURL);
    const [loadingImageURL, setLoadingImageURL] = useState(false);
    const dispatch = useDispatch();

    const handleSaveChanges = async () => {
        try {
            const modelUpdateUser = new User(fullname, '', '', phone, address, imageURL, '');
            await updateUser(modelUpdateUser.toObjectUpdate());
            await dispatch(
                loginSuccess({
                    ...user,
                    fullname: modelUpdateUser.fullname,
                    phone: modelUpdateUser.phone,
                    address: modelUpdateUser.address,
                    imageURL: modelUpdateUser.imageURL,
                }),
            );
            Alert.alert(
                'Thông báo',
                'Cập nhật thông tin thành công.',
                [{ text: 'OK', onPress: () => navigation.goBack() }],
                { cancelable: false },
            );
        } catch (error) {
            console.log('Error updating profile: ', error);
            Alert.alert('Thông báo', error.message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
                cancelable: false,
            });
        }
    };

    const handleImageUpload = async () => {
        setLoadingImageURL(true);
        try {
            ImageCropPicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                cropperCircleOverlay: true,
                compressImageQuality: 0.5,
            })
                .then(async (image) => {
                    const uri = image.path;
                    const imageName = `avatar_${user.email}`;
                    const storageRef = storage().ref().child(`avatars/${imageName}`);
                    await storageRef.putFile(uri);
                    const downloadURL = await storageRef.getDownloadURL();
                    console.log('Download URL:', downloadURL);
                    setImageURL(downloadURL);
                    setLoadingImageURL(false);
                })
                .catch((error) => {
                    setLoadingImageURL(false);
                    console.log('Error picking image: ', error);
                });
        } catch (error) {
            setLoadingImageURL(false);
            console.log('Error uploading image: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <TouchableOpacity onPress={handleImageUpload} style={styles.avatarContainer}>
                    <Image
                        source={{ uri: imageURL || `https://ui-avatars.com/api/?name=${fullname}&size=128` }}
                        style={styles.avatar}
                    />
                    <View style={styles.editTextContainer}>
                        <Text style={styles.editText}>Sửa</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.detailsSection}>
                <ProfileDetailItem title="Email" subtitle={user.email} icon="email" />
                <ProfileEditItem
                    icon="account"
                    title="Họ và tên"
                    editable
                    value={fullname}
                    onChangeText={setFullName}
                />
                <ProfileEditItem
                    icon="map-marker-radius"
                    title="Địa chỉ"
                    editable
                    value={address}
                    onChangeText={setAddress}
                />
                <ProfileEditItem icon="phone" title="Số điện thoại" editable value={phone} onChangeText={setPhone} />
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges} disabled={loadingImageURL}>
                {loadingImageURL ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.saveButtonText}>Cập nhật</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    avatarSection: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColor.lightBlue,
        height: '30%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 10,
    },
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderColor: 'white',
        borderWidth: 3,
    },
    editTextContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(16, 179, 196, 0.4)',
        alignItems: 'center',
        paddingVertical: 4,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    editText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsSection: {
        flex: 1,
        marginHorizontal: 20,
        paddingVertical: 5,
    },
    saveButton: {
        backgroundColor: appColor.lightBlue,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserProfileEditScreen;
