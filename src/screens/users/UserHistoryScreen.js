import { CloseSquare, SearchNormal1 } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { loadPitchesBookingByEmail } from '../../api/pitch-api';
import { appColor } from '../../constants/appColor';
import { formatDateToVND } from '../../helpers/formatDateToVND';

const windowWidth = Dimensions.get('window').width;
const itemWidth = windowWidth / 3;

export default UserHistoryScreen = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [bookingData, setBookingData] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [filters, setFilters] = useState([
        { id: 1, status: 'pending', label: 'Chờ duyệt' },
        { id: 2, status: 'success', label: 'Đặt thành công' },
        { id: 3, status: 'cancel', label: 'Đã hủy' },
    ]);
    const user = useSelector((state) => state.auth.userData);

    const [searchText, setSearchText] = useState('');

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

        loadPitchesBookingByEmail(filters[selectedFilter - 1].status, user.email, (response) => {
            if (response.error) {
                console.log('Lỗi không thể load được dữ liệu', response.error);
            } else {
                setBookingData(response.data || []);
            }
        });
    }, [user.email, selectedFilter]);

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

            <View style={{ flex: 1, backgroundColor: '#F3F3F3', paddingTop: 10, paddingLeft: 5, marginBottom: 50 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {bookingData.length > 0 ? (
                        bookingData.map((booking, index) => (
                            <View key={index} style={styles.bookingItem}>
                                <Image
                                    source={{ uri: booking.pitches.imageURL }}
                                    style={{ width: 80, height: 80, borderRadius: 5, backgroundColor: 'red' }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.labelBold}>Tên sân:</Text>
                                    <Text style={styles.label}>{booking.pitches.name}</Text>
                                    <Text style={styles.labelBold}>Ngày đặt:</Text>
                                    <Text style={styles.label}>{formatDateToVND(booking.timeBooking)}</Text>
                                    <Text style={styles.labelBold}>Trạng thái:</Text>
                                    <Text
                                        style={{
                                            ...styles.label,
                                            color: booking.statusBooking === 'paid' ? 'green' : 'red',
                                        }}
                                    >
                                        {booking.statusBooking.toUpperCase()}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        paddingRight: 5,
                                    }}
                                    onPress={() => handleDetailsPress(booking)}
                                >
                                    <Text style={styles.link}>Chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text>Không có dữ liệu...</Text>
                    )}
                </ScrollView>
            </View>

            {selectedBooking && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Chi tiết đặt sân</Text>
                            <Text style={styles.labelBold}>Trạng thái: </Text>
                            <Text style={styles.label}> {selectedBooking.statusBooking}</Text>
                            <Text style={styles.labelBold}>Thời gian bắt đầu:</Text>
                            <Text style={styles.label}> {formatDateToVND(selectedBooking.timeStart)} </Text>
                            <Text style={styles.labelBold}>Thời gian kết thúc:</Text>
                            <Text style={styles.label}> {formatDateToVND(selectedBooking.timeEnd)}</Text>
                            <Text style={styles.labelBold}>Người đặt</Text>
                            <Text style={styles.label}> {selectedBooking.user.email}</Text>
                            <Button title="Close" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
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
        flexDirection: 'row',
        alignItems: 'left',
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    labelBold: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    label: {
        marginBottom: 5,
    },
    link: {
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
});
