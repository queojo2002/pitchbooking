import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Slides from '../../components/Slides';
import { adminLoadPitchesByID, adminUpdatePitches } from '../../api/pitch-api';

export default function UpdatePitchesScreen({ route, navigation }) {
    const { pitchId } = route.params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [pitchType, setPitchType] = useState('');
    const [status, setStatus] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [initialImageUri, setInitialImageUri] = useState(null);
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: '#090210',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: () => {
                return (
                    <View
                        style={{
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20, color: 'white' }}>Cập nhật sân bóng</Text>
                    </View>
                );
            },
        });
        const fetchPitchData = async () => {
            try {
                const pitchData = await adminLoadPitchesByID(pitchId);
                if (pitchData.status === 1) {
                    setName(pitchData.data.name);
                    setPrice(String(pitchData.data.price));
                    setPitchType(String(pitchData.data.type));
                    setStatus(String(pitchData.data.status));
                    setInitialImageUri(pitchData.data.imageURL);
                    setImageUri(pitchData.data.imageURL);
                }
            } catch (error) {
                console.log(error);
                Alert.alert('Lỗi', 'Không tìm thấy dữ liệu sân');
            }
        };

        fetchPitchData();
    }, [navigation, pitchId]);

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('Người dùng hủy chọn ảnh');
            } else if (response.error) {
                console.log('Ảnh đã chọn lỗi: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
            }
        });
    };

    const uploadImage = async () => {
        if (imageUri && imageUri !== initialImageUri) {
            const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
            const storageRef = storage().ref(`pitches/${fileName}`);
            const task = storageRef.putFile(imageUri);
            try {
                await task;
                return await storageRef.getDownloadURL();
            } catch (e) {
                console.log(e);
                return null;
            }
        }
        return initialImageUri;
    };

    const updatePitch = async () => {
        if (name === '' || price === '' || pitchType === '' || status === '' || !imageUri) {
            Alert.alert('Lỗi', 'Vui lòng điền vào tất cả các ô và chọn một hình ảnh');
            return;
        }

        const imageURL = await uploadImage();
        if (imageURL) {
            try {
                const updatedPitch = await adminUpdatePitches({
                    id: pitchId,
                    name,
                    price,
                    type: pitchType,
                    status,
                    imageURL,
                });
                if (updatedPitch.status === 1) {
                    Alert.alert('Thành công', 'Dữ liệu sân bóng đã được cập nhật');
                    navigation.goBack();
                } else {
                    Alert.alert('Error', updatedPitch.message);
                }
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ marginBottom: 10 }}>
                    <Slides />
                </View>
                <TextInput mode="outlined" label="Tên sân" value={name} onChangeText={setName} style={styles.input} />
                <TextInput
                    mode="outlined"
                    label="Giá sân / 1 tiếng"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Picker
                    selectedValue={pitchType}
                    onValueChange={(itemValue) => setPitchType(itemValue)}
                    style={styles.select}
                    mode="dropdown"
                >
                    <Picker.Item label="Chọn loại sân" value="" />
                    <Picker.Item label="Sân 5" value="0" />
                    <Picker.Item label="Sân 7" value="1" />
                    <Picker.Item label="Sân 11" value="2" />
                </Picker>

                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                    style={styles.select}
                    mode="dropdown"
                >
                    <Picker.Item label="Tình trạng" value="" />
                    <Picker.Item label="Sân đang mở" value="0" />
                    <Picker.Item label="Sân đang đóng" value="1" />
                </Picker>
                <Button mode="contained" icon="camera" onPress={selectImage} style={styles.button}>
                    Chọn ảnh
                </Button>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                <Button mode="contained" onPress={updatePitch} style={styles.button_add}>
                    Cập nhật sân bóng
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginVertical: 10,
    },
    button_add: {
        backgroundColor: '#006769',
        marginBottom: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    select: {
        height: 50,
        borderColor: 'gray',
        backgroundColor: '#DCF2F1',
        borderWidth: 1,
        marginBottom: 10,
    },
});
