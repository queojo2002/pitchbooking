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
import { ArchiveAdd } from 'iconsax-react-native';
import { appColor } from '../../constants/appColor';

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
            { text: 'Xóa', onPress: () => Alert.alert('Thông báo', 'Tính năng đang phát triển') },
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
                backgroundColor: appColor.blackblue,
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert('Xác nhận hành động', 'Bạn có chắc chắn muốn đăng xuất?', [
                            { text: 'Hủy bỏ', style: 'cancel' },
                            {
                                text: 'Xác nhận',
                                onPress: onLogoutPressed,
                            },
                        ]);
                    }}
                >
                    <Icon name="logout" size={24} color="#FFF" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{user.fullname}</Text>
                </View>
            ),
        });
    }, [navigation]);

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
                        <Text style={styles.pitchType}>
                            Loại sân:{' '}
                            {item.type == 0
                                ? 'Sân 5'
                                : item.type == 1
                                ? 'Sân 7'
                                : item.type == 2
                                ? 'Sân 11'
                                : 'Liên hệ chủ sân để biết thêm chi tiết'}
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
                <View style={styles.header}>
                    <Image source={require('../../assets/logodth.png')} style={styles.logo} />
                </View>
                <Text style={styles.pitchListTitle}>Danh sách sân bóng</Text>
                <FlatList
                    style={styles.flatList}
                    data={pitches}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity style={styles.addButton} onPress={navigateToAddNewPitches}>
                    <ArchiveAdd size={50} variant="Bulk" color="#FFF" />
                </TouchableOpacity>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
    },
    addButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#0288D1',
        borderRadius: 20,
        elevation: 5,
    },
    pitchListTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0288D1',
        textAlign: 'center',
        marginVertical: 20,
    },
    flatList: {
        flex: 1,
    },
    flatListContainer: {
        paddingBottom: 70,
    },
    pitchItem: {
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },
    detail: {
        marginLeft: 20,
        flex: 1,
    },
    pitchName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0288D1',
    },
    pitchType: {
        fontSize: 16,
        color: '#757575',
        marginTop: 5,
    },
    pitchPrice: {
        fontSize: 16,
        color: '#0288D1',
        marginTop: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    rightActionsContainer: {
        flexDirection: 'row',
    },
    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        flexDirection: 'column',
        marginRight: 10,
    },
    editAction: {
        backgroundColor: '#FF9800',
    },
    deleteAction: {
        backgroundColor: '#F44336',
    },
    actionText: {
        color: 'white',
        marginTop: 5,
    },
    headerTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFF',
    },
});
