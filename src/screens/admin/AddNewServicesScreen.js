import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';

export default function AddServiceScreen({ navigation }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const user = useSelector(state => state.auth.userData);


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
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
                        <Text style={{ fontSize: 20, color: "white" }}>Add new Services</Text>
                    </View>
                );
            },
        })
    }, [])





    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
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
            const storageRef = storage().ref(`services/${fileName}`);
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

    const addService = async () => {
        if (name === '' || price === '' || !imageUri) {
            Alert.alert('Error', 'Please fill all fields and select an image');
            return;
        }
        const imageUrl = await uploadImage();
        if (imageUrl) {
            firestore()
                .collection('services')
                .add({
                    name: name,
                    price: price,
                    imageUrl: imageUrl,
                    creator: user.email,
                    timeMake: firestore.FieldValue.serverTimestamp(),
                    timeUpdate: firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                    Alert.alert('Success', 'Service added successfully');
                    setName('');
                    setPrice('');
                    setImageUri(null);
                })
                .catch((error) => {
                    Alert.alert('Error', error.message);
                });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Service Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                mode="outlined"
                label="Service Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button
                mode="contained"
                icon="camera"
                onPress={selectImage}
                style={styles.button}
            >
                Select Image
            </Button>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Button
                mode="contained"
                onPress={addService}
                style={styles.button}
            >
                Add Service
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
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
});