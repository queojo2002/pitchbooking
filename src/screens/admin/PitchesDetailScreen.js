import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { IconButton, Menu, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/vi';
import { appColor } from '../../constants/appColor';
import { adminLoadPitchesByID } from '../../api/pitch-api';
import { formatDateToVND } from '../../helpers/formatDateToVND';
import { useFocusEffect } from '@react-navigation/native';

export default function PitchesDetailScreen({ route, navigation }) {
    const { pitchId } = route.params;
    const [pitch, setPitch] = useState(null);

    moment.locale('vi');

    const loadPitchByID = async () => {
        try {
            const pitchesData = await adminLoadPitchesByID(pitchId);
            if (pitchesData.status === 1) {
                setPitch(pitchesData.data);
            } else {
                throw new Error(pitchesData.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPitchByID();
        }, []),
    );

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.blackblue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => <HeaderActions navigation={navigation} pitchId={pitchId} />,
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: 20, color: 'white' }}>Chi tiết sân</Text>
                </View>
            ),
        });
    }, [navigation, pitchId]);

    const renderPitchType = (pitchType) => {
        switch (pitchType) {
            case '0':
                return 'Sân 5';
            case '1':
                return 'Sân 7';
            case '2':
                return 'Sân 11';
            default:
                return 'Unknown';
        }
    };

    const renderStatus = (status) => {
        switch (status) {
            case '0':
                return 'Đang mở cửa';
            case '1':
                return 'Đang đóng cửa';
            default:
                return 'Unknown';
        }
    };

    return (
        <ScrollView style={styles.container}>
            {pitch ? (
                <Fragment>
                    {pitch.imageURL && <Image source={{ uri: pitch.imageURL }} style={styles.image} />}
                    <Text style={styles.label}>
                        <Text style={styles.labelBold}>Tên sân:</Text> {pitch.name}
                    </Text>
                    <Text style={styles.label}>
                        <Text style={styles.labelBold}>Giá:</Text> {pitch.price}
                    </Text>
                    <Text style={styles.label}>
                        <Text style={styles.labelBold}>Loại sân:</Text> {renderPitchType(pitch.type)}
                    </Text>
                    <Text style={styles.label}>
                        <Text style={styles.labelBold}>Trạng thái:</Text> {renderStatus(pitch.status)}
                    </Text>
                    <View style={styles.PitchesContainer}>
                        <Text style={styles.label}>
                            <Text style={styles.labelBold}>Thời gian cập nhật gần đây:</Text>{' '}
                            {pitch.timeUpdate ? formatDateToVND(pitch.timeUpdate * 1000) : 'Unknown'}
                        </Text>
                    </View>
                </Fragment>
            ) : (
                <Text>Đợi một xíu nghen...</Text>
            )}
        </ScrollView>
    );
}

function HeaderActions({ navigation, pitchId }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const handleEdit = () => {
        navigation.navigate('UpdatePitchesScreen', { pitchId: pitchId });
        closeMenu();
    };

    const handleDelete = () => {
        Alert.alert('Xóa sân', 'Bạn có chắc muốn xóa sân này không ?', [
            { text: 'Cancel', style: 'cancel', onPress: closeMenu },
            { text: 'Confirm', onPress: deletePitch, style: 'destructive' },
        ]);
    };

    const deletePitch = () => {
        alert('Tính năng đang phát triển, vui lòng thử lại sau');
    };

    return (
        <Menu
            style={{ position: 'absolute', top: 60 }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <IconButton
                    size={22}
                    style={{ paddingLeft: 23 }}
                    icon="dots-vertical"
                    color="#fff"
                    onPress={openMenu}
                />
            }
        >
            <Menu.Item onPress={handleEdit} title="Sửa" />
            <Divider />
            <Menu.Item onPress={handleDelete} title="Xóa" />
        </Menu>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    labelBold: {
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    PitchesContainer: {
        marginTop: 20,
        backgroundColor: '#FCFCFC',
        width: '100%',
        height: '100%',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
