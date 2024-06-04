import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Slides from '../../components/Slides';
import { Pitches } from '../../model/Pitches';
import { adminAddNewPitches } from '../../api/pitch-api';

export default function AddNewPitchesScreen({ navigation }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [pitchType, setPitchType] = useState('');
    const [status, setStatus] = useState('');
    const [imageUri, setImageUri] = useState(null);
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
                        <Text style={{ fontSize: 20, color: 'white' }}>Thêm sân bóng</Text>
                    </View>
                );
            },
        });
    }, []);

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
            }
        });
    };

    const uploadImage = async () => {
        if (imageUri) {
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
        return null;
    };

    const addPitch = async () => {
        if (name === '' || price === '' || pitchType === '' || status === '' || !imageUri) {
            Alert.alert('Lỗi', 'Vui lòng điền vào tất cả các ô và chọn một hình ảnh');
            return;
        }
        const imageURL = await uploadImage();
        if (imageURL) {
            try {
                const response = await adminAddNewPitches({
                    name,
                    type: pitchType,
                    price,
                    imageURL,
                    status,
                });
                if (response.status === 1) {
                    Alert.alert('Thành công', 'Sân đã được thêm thành công');
                    setName('');
                    setPrice('');
                    setPitchType('');
                    setStatus('');
                    setImageUri(null);
                } else {
                    Alert.alert('Error', response.message);
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
                    <Picker.Item label="Sân 5" value="1" />
                    <Picker.Item label="Sân 7" value="2" />
                </Picker>

                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                    style={styles.select}
                    mode="dropdown"
                >
                    <Picker.Item label="Tình trạng" value="" />
                    <Picker.Item label="Sân đang mở" value="1" />
                    <Picker.Item label="Sân đang đóng" value="2" />
                </Picker>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            </ScrollView>
            <Button mode="contained" icon="camera" onPress={selectImage} style={styles.button}>
                Chọn ảnh
            </Button>
            <Button mode="contained" onPress={addPitch} style={styles.button_add}>
                Thêm sân bóng
            </Button>
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
        width: '100%',
        height: 200,
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
