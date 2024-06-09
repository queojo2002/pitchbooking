import { useFocusEffect } from '@react-navigation/native';
import { CloseSquare, SearchNormal1 } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { loadPitchesBookingByEmail } from '../../api/pitch-api';
import { appColor } from '../../constants/appColor';
import { formatDateToVND } from '../../helpers/formatDateToVND';
const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 3;

export default UserHistoryScreen = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [bookingDataTemp, setBookingDataTemp] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [pitchesNameData, setPitchesNameData] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState('TimTheoSan');
    const [visible, setVisible] = useState(false);
    const hideModal = () => setVisible(false);
    const [searchText, setSearchText] = useState('');
    const user = useSelector((state) => state.auth.userData);
    const [filters, setFilters] = useState([
        { id: 1, status: 0, label: 'Chờ thanh toán' },
        { id: 2, status: 1, label: 'Đặt thành công' },
        { id: 3, status: 2, label: 'Đã hủy' },
    ]);

    const renderFilterItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.filterItem]} onPress={() => handleItemPress(item)}>
                <Text style={styles.filterText}>{item.label}</Text>
                {selectedFilter === item.id && <View style={styles.selectedFilterItem} />}
            </TouchableOpacity>
        );
    };

    const handleItemPress = (item) => {
        setSelectedFilter(item.id);
    };

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
            headerTitleAlign: 'center',
            headerTitle: () => {
                return (
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Lịch sử đặt sân
                    </Text>
                );
            },
        });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await loadPitchesBookingByEmail();
                    console.log(response.data);
                    if (response.status !== 1) {
                        console.log('Lỗi không thể load được dữ liệu', response.error);
                    }
                    const filteredData = response.data.filter((item) => {
                        return item.status === filters[selectedFilter - 1].status && item.name.includes(searchText);
                    });
                    setBookingData(filteredData);
                } catch (error) {
                    console.log('Lỗi không thể load được dữ liệu', error);
                }
            };

            fetchData();
        }, [selectedFilter, searchText]),
    );

    const handleDetailsPress = (booking) => {
        setSelectedBooking(booking);
        setModalVisible(true);
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchNormal1 name="search" size={20} color="#C8C8C8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập gì đó ..."
                        placeholderTextColor="gray"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {searchText.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                            <CloseSquare name="close" size={20} color="black" />
                        </TouchableOpacity>
                    )}
                </View>
                <FlatList
                    data={filters}
                    renderItem={renderFilterItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                />
            </View>

            <View
                style={{
                    height: 400,
                    marginBottom: 50,
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {bookingData.length > 0 ? (
                        bookingData.map((booking, index) => (
                            <View key={index} style={styles.bookingItem}>
                                <Image
                                    source={{ uri: booking.imageURL }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <View style={styles.row}>
                                        <MaterialCommunityIcons name="soccer-field" size={20} style={styles.icon} />
                                        <Text style={styles.labelBold}>Tên sân:</Text>
                                        <Text style={styles.label}>{booking.name}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <MaterialCommunityIcons name="calendar" size={20} style={styles.icon} />
                                        <Text style={styles.labelBold}>Ngày đặt:</Text>
                                    </View>
                                    <Text style={{ paddingLeft: 10, paddingBottom: 5 }}>
                                        {formatDateToVND(booking.timeCreate * 1000)}
                                    </Text>
                                    <View style={styles.row}>
                                        <MaterialCommunityIcons
                                            name={
                                                {
                                                    0: 'reload-alert',
                                                    1: 'check-circle',
                                                    2: 'cancel',
                                                }[booking.status]
                                            }
                                            size={20}
                                            style={{
                                                ...styles.icon,
                                                color: {
                                                    0: 'blue',
                                                    1: 'green',
                                                    2: 'red',
                                                }[booking.status],
                                            }}
                                        />
                                        <Text style={styles.labelBold}>Trạng thái:</Text>
                                        <Text
                                            style={{
                                                ...styles.label,
                                                color: {
                                                    0: 'blue',
                                                    1: 'green',
                                                    2: 'red',
                                                }[booking.status],
                                            }}
                                        >
                                            {booking.status === 0
                                                ? 'Chờ thanh toán'
                                                : booking.status === 1
                                                ? 'Đặt thành công'
                                                : 'Đã hủy'}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        paddingRight: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => handleDetailsPress(booking)}
                                >
                                    <Text style={styles.link}>Chi tiết</Text>
                                    {booking.status === 0 && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('UserConfirmBooking', {
                                                    data: {
                                                        id: booking.id,
                                                        url: booking.URLPayment,
                                                    },
                                                });
                                            }}
                                        >
                                            <Text style={styles.link}>Thanh toán</Text>
                                        </TouchableOpacity>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                            }}
                        >
                            Không có dữ liệu...
                        </Text>
                    )}
                </ScrollView>
            </View>

            {selectedBooking && (
                <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chi tiết đặt sân</Text>
                        <Text style={styles.labelBold}>Trạng thái: </Text>
                        <Text style={styles.label}>
                            {selectedBooking.status === 0
                                ? 'Chờ thanh toán'
                                : selectedBooking.status === 1
                                ? 'Đã đặt'
                                : 'Đã hủy'}
                        </Text>
                        <Text style={styles.labelBold}>Thời gian bắt đầu:</Text>
                        <Text style={styles.label}> {formatDateToVND(selectedBooking.timeStart * 1000)} </Text>
                        <Text style={styles.labelBold}>Thời gian kết thúc:</Text>
                        <Text style={styles.label}> {formatDateToVND(selectedBooking.timeEnd * 1000)}</Text>
                        <Text style={styles.labelBold}>Người đặt</Text>
                        <Text style={styles.label}> {selectedBooking.email}</Text>
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )}

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        height: 350,
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40,
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 14, marginBottom: 10 }}>
                        Nhấn ra bên ngoài để có thể THOÁT.
                    </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {type === 'TimTheoSan' ? (
                            pitchesNameData.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#B3B3B3',
                                        borderRadius: 15,
                                        marginBottom: 10,
                                    }}
                                    onPress={() => {
                                        handleSearchPress('TimTheoSan', item);
                                    }}
                                >
                                    <Text>{item.pitches.name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>Không có dữ liệu...</Text>
                        )}
                    </ScrollView>
                </Modal>
            </Portal>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#FCFCFC',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 10,
        height: 40,
        margin: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        paddingVertical: 0,
    },
    filterContainer: {
        backgroundColor: '#FCFCFC',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    filterItem: {
        width: itemWidth,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedFilterItem: {
        width: 40,
        height: 2,
        backgroundColor: 'black',
        alignItems: 'stretch',
    },
    filterText: {
        color: 'black',
        padding: 5,
    },
    clearButton: {
        marginLeft: 10,
    },
    bookingItem: {
        margin: 7,
        flexDirection: 'row',
        alignItems: 'left',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#fefefe',
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    labelBold: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    link: {
        marginTop: 10,
        color: 'blue',
        textDecorationLine: 'underline',
        marginRight: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
        color: 'blue',
        fontSize: 18,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 5,
        color: 'green',
    },
});
