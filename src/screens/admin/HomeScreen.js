import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { formatPriceToVND } from '../../helpers/formatPriceToVND';
import { adminLoadAllPitches } from '../../api/pitch-api';
import { Swipeable } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
    const [pitches, setPitches] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    const onLogoutPressed = async () => {
        await dispatch(logout());
    };
    const handleDelete = () => {
        Alert.alert('Xóa sân', 'Bạn có chắc muốn xóa sân này không ?', [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Xóa', onPress: Alert.alert('Thông báo', 'Tính năng đang phát triển') },
        ]);
    };
    const loadPitches = async () => {
        try {
            const pitchesData = await adminLoadAllPitches();
            if (pitchesData.status === 1) {
                setPitches(pitchesData.data);
            } else {
                throw new Error(pitchesData.message);
            }
        } catch (error) {
            console.log(error, 1);
        }
    };
    useFocusEffect(
        useCallback(() => {
            loadPitches();
        }, []),
    );

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#090210',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => (
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Xác nhận hành động', 'Bạn có chắc chắn muốn đăng xuất?', [
                                {
                                    text: 'Hủy bỏ',
                                    onPress: () => console.log('No Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Xác nhận',
                                    onPress: () => {
                                        onLogoutPressed();
                                    },
                                },
                            ]);
                        }}
                    >
                        <Icon name="logout" size={30} color="#fff" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: () => (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: 16, color: 'white' }}>{user.name}</Text>
                </View>
            ),
        });
    }, []);

    const navigateToAddNewPitches = () => {
        setMenuVisible(false);
        navigation.navigate('AddNewPitchesScreen');
    };

    const renderItem = ({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
            <TouchableOpacity onPress={() => navigation.navigate('PitchesDetailScreen', { pitchId: item.id })}>
                <View style={styles.pitchItem}>
                    <Image source={{ uri: item.imageURL }} style={styles.image} />
                    <View style={styles.detail}>
                        <Text style={styles.pitchName}>{item.name}</Text>
                        <Text>
                            Loại sân:
                            {item.type == 0 ? (
                                <Text> Sân 5</Text>
                            ) : item.type == 1 ? (
                                <Text> Sân 7</Text>
                            ) : item.type == 2 ? (
                                <Text> Sân 11</Text>
                            ) : (
                                <Text style={{ color: 'green' }}>Liên hệ chủ sân để biết thêm chi tiết</Text>
                            )}
                        </Text>
                        <Text style={styles.pitchPrice}>{formatPriceToVND(parseFloat(item.price))}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );

    const renderRightActions = (item) => (
        <View style={styles.rightActionsContainer}>
            <TouchableOpacity
                style={[styles.rightAction, styles.editAction]}
                onPress={() => navigation.navigate('UpdatePitchesScreen', { pitchId: item.id })}
            >
                <Icon name="edit" size={20} color="white" />
                <Text style={styles.actionText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rightAction, styles.deleteAction]} onPress={handleDelete}>
                <Icon name="delete" size={20} color="white" />
                <Text style={styles.actionText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <Fragment>
            <View style={styles.container}>
                <Image source={require('../../assets/logodth.png')} style={styles.logo} />
                <View style={styles.headerRow}>
                    <Text style={styles.pitchListTitle}>Danh sách sân bóng</Text>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={<Icon name="add-circle" size={30} color="green" onPress={() => setMenuVisible(true)} />}
                    >
                        <Menu.Item onPress={navigateToAddNewPitches} title="Thêm sân bóng" />
                    </Menu>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={pitches}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    logo: {
        alignContent: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 120,
        resizeMode: 'contain',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    pitchListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pitchList: {
        paddingHorizontal: 10,
    },
    pitchItem: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingStart: 20,
        paddingHorizontal: 110,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1,
        borderRadius: 15,
    },
    detail: {
        marginLeft: 30,
    },
    control: {
        marginLeft: 10,
    },
    controlButton: {
        alignItems: 'center',
        padding: 2,
        margin: 2,
        backgroundColor: '#f7f7fa',
        borderRadius: 5,
        flexDirection: 'row',
    },
    controlButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666',
    },
    pitchName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    pitchPrice: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    addButton: {
        marginRight: 10,
    },
    image: {
        width: 80,
        height: 70,
        borderRadius: 15,
    },
    flatListContainer: {
        paddingBottom: 70,
    },
    rightActionsContainer: {
        flexDirection: 'row',
    },
    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 7,
        borderRadius: 8,
        flexDirection: 'column',
        marginRight: 10,
    },
    editAction: {
        backgroundColor: '#2196F3',
    },
    deleteAction: {
        backgroundColor: '#F44336',
    },
    actionText: {
        color: 'white',
    },
});
