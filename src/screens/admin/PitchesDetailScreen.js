import React, { useEffect, useState, Fragment } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { IconButton, Menu, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/vi';
import { appColor } from '../../constants/appColor';

export default function PitchesDetailScreen({ route, navigation }) {
    const { pitchId } = route.params;
    const [pitch, setPitch] = useState(null);

    moment.locale('vi');

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
            headerRight: () => (
                <HeaderActions navigation={navigation} pitchId={pitchId} />
            ),
            headerTitle: () => (
                <View>
                    <Text style={{ fontSize: 20, color: "white" }}>Chi tiết sân</Text>
                </View>
            ),
        });
    }, [navigation, pitchId]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('pitches')
            .doc(pitchId)
            .onSnapshot((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    setPitch(documentSnapshot.data());
                }
            });

        return () => unsubscribe();
    }, [pitchId]);

    const renderPitchType = (pitchType) => {
        switch(pitchType) {
            case 1:
                return 'Sân 5';
            case 2:
                return 'Sân 7';
            default:
                return 'Unknown';
        }
    };

    const renderStatus = (status) => {
        switch(status) {
            case 1:
                return 'Đang mở cửa';
            case 2:
                return 'Đang đóng cửa';
            default:
                return 'Unknown';
        }
    };

    return (
        <ScrollView style={styles.container}>
            {pitch ? (
                <Fragment>
                    {pitch.imageURL && (
                        <Image source={{ uri: pitch.imageURL }} style={styles.image} />
                    )}
                    <Text style={styles.label}><Text style={styles.labelBold}>Tên sân:</Text> {pitch.name}</Text>
                    <Text style={styles.label}><Text style={styles.labelBold}>Giá:</Text> {pitch.price}</Text>
                    <Text style={styles.label}><Text style={styles.labelBold}>Loại sân:</Text> {renderPitchType(pitch.pitchType)}</Text>
                    <Text style={styles.label}><Text style={styles.labelBold}>Trạng thái:</Text> {renderStatus(pitch.status)}</Text>
                    <View style={styles.PitchesContainer}>
                    <Text style={styles.label}><Text style={styles.labelBold}>Người thêm:</Text> {pitch.creator}</Text>
                    <Text style={styles.label}><Text style={styles.labelBold}>Người cập nhật:</Text> {pitch.updatedBy}</Text>
                    <Text style={styles.label}><Text style={styles.labelBold}>Thời gian tạo:</Text> {pitch.timeMake ? moment(pitch.timeMake.toDate()).format('LLL') : 'Unknown'}</Text>
                    <Text style={styles.label}><Text style={styles.labelBold}>Thời gian cập nhật:</Text> {pitch.updatedAt ? moment(pitch.updatedAt.toDate()).format('LLL') : 'Unknown'}</Text>
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
        Alert.alert(
            'Xóa sân',
            'Bạn có chắc muốn xóa sân này không ?',
            [
                { text: 'Cancel', style: 'cancel', onPress: closeMenu },
                { text: 'Confirm', onPress: deletePitch, style: 'destructive' },
            ]
        );
    };

    const deletePitch = () => {
        firestore()
            .collection('pitches')
            .doc(pitchId)
            .delete()
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <Menu style={{position: 'absolute', top: 60}}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton size={22} style={{ paddingLeft: 23 }} icon="dots-vertical" color="#fff" onPress={openMenu} />}
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
        backgroundColor: "#FCFCFC",
        width: '100%',
        height: '100%',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
