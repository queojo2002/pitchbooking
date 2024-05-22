import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { Menu, Divider, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/vi';


export default function ServicesDetailScreen({ route, navigation }) {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);
    moment.locale('vi');
    
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
            headerRight: () => (
                <HeaderActions navigation={navigation} serviceId={serviceId} />
            ),
            headerTitle: () => {
                return (
                    <View>
                        <Text style={{ fontSize: 20, color: "white" }}>Services Detail</Text>
                    </View>
                );
            },
        });
    }, [navigation, serviceId]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('services')
            .doc(serviceId)
            .onSnapshot((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setService(documentSnapshot.data());
                }
            });

        return () => unsubscribe();
    }, [serviceId]);

    return (
        <View style={styles.container}>
            {service ? (
                <>
                    <Text><Text style={{fontWeight: "bold"}}>Service Name:</Text> {service.name}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Service Price:</Text> {service.price}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Created by:</Text> {service.creator}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Time Created:</Text> {service.timeMake ? moment(service.timeMake.toDate()).format('LLL') : 'Unknown'}</Text>
                    <Text><Text style={{fontWeight: "bold"}}>Time Updated:</Text> {service.timeUpdate ? moment(service.timeUpdate.toDate()).format('LLL') : 'Unknown'}</Text>
                    {service.imageUrl && <Image source={{ uri: service.imageUrl }} style={{
                        width: 300,
                        height: 300,
                        marginTop: 10,
                        marginBottom: 20,
                    }} />}

                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

function HeaderActions({ navigation, serviceId }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const handleEdit = () => {
        navigation.navigate('UpdateServicesScreen', { serviceId: serviceId });
        closeMenu();
    };

    const handleDelete = () => {
        Alert.alert(
            'Xác nhận hành động xóa',
            'Bạn có chắc chắn muốn xóa hành động này không?',
            [
                { text: 'Hủy bỏ', style: 'cancel', onPress: closeMenu },
                { text: 'Xác nhận xóa', onPress: deleteService, style: 'destructive' },
            ]
        );
    };

    const deleteService = () => {
        firestore()
            .collection('services')
            .doc(serviceId)
            .delete()
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton  size={22} style={{
                paddingLeft: 23
            }} icon="dots-vertical" color="#fff" onPress={openMenu} 
            />
            }
        >
            <Menu.Item onPress={handleEdit} title="Edit" />
            <Divider />
            <Menu.Item onPress={handleDelete} title="Delete" />
        </Menu>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
