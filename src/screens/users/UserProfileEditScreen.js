import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { appColor } from '../../constants/appColor';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

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
            navigation.goBack();
            Alert.alert(
                'Thông báo',
                'Cập nhật thông tin thành công.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
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
                    source={{ uri: avatar || "https://ui-avatars.com/api/?name=" + name + "&size=128"}}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            </View>
            <View style={styles.detailsSection}>
            <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập tên của bạn"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Số điện thoại:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="00000000"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Địa chỉ:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Địa chỉ của bạn"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
            </View>
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
    label: {
        fontWeight: "bold"
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    text: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    saveButton: {
        backgroundColor: appColor.blackblue,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
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
