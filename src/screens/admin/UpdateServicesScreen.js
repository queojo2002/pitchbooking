import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function UpdateServicesScreen({ route, navigation }) {
    const { serviceId } = route.params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [isNewIMG, setisNewIMG] = useState(false);

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
                        <Text style={{ fontSize: 20, color: "white" }}>Update services</Text>
                    </View>
                );
            },
        })
    }, [])

    useEffect(() => {
        // Fetch service details from Firestore based on serviceId
        firestore()
            .collection('services')
            .doc(serviceId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const { name, price, imageUrl } = documentSnapshot.data();
                    setName(name);
                    setPrice(price);
                    setImageUri(imageUrl);
                }
            })
            .catch((error) => {
                console.log('Error fetching service details: ', error);
            });
    }, [serviceId]);

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
                setisNewIMG(true)
            }
        });
    };

    const updateService = async () => {
        if (name === '' || price === '') {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        let imageUrl = imageUri;

        if (isNewIMG) {
            imageUrl = await uploadImage();
        }

        firestore()
            .collection('services')
            .doc(serviceId)
            .update({
                name: name,
                price: price,
                imageUrl: imageUrl,
                timeUpdate: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                Alert.alert('Success', 'Service updated successfully');
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Service Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Service Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button title="Select Image" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Button title="Update Service" onPress={updateService} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 20,
    },
});
