import { Picker } from '@react-native-picker/picker';
import { ArrowRight, FilterSearch, FilterTick, Information, Refresh2, TickCircle, Xrp } from 'iconsax-react-native';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Modal, PaperProvider, Paragraph, Portal } from 'react-native-paper';
import { adminFilterPitchesBooking, adminLoadAllPitches, adminSetStatusPitchesBooking } from '../../api/pitch-api';
import HeaderSearch from '../../components/HeaderSearch';
import { appColor } from '../../constants/appColor';
import { formatDateTimeToHM } from '../../helpers/formatDateTimeToHM';
import { formatDateToVND } from '../../helpers/formatDateToVND';
import { adminSendNotification } from '../../api/user-api';

export default ManagePitchesScreen = ({ navigation }) => {
    const [pitchesIDS, setPitchesIDS] = useState([
        {
            label: 'Tắt cả sân',
            value: null,
        },
    ]);
    const [filters, setFilters] = useState([
        { id: 1, status: 0, label: 'Chờ thanh toán' },
        { id: 2, status: 1, label: 'Đặt thành công' },
        { id: 3, status: 2, label: 'Đã hủy' },
    ]);
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [pitches, setPitches] = useState([]);
    const [filteredPitches, setFilteredPitches] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [pitchesID, setPitchesID] = useState();
    const [visible, setVisible] = React.useState(false);
    const showModalFilter = () => setVisible(true);
    const hideModalFilter = () => setVisible(false);
    const [openFromTime, setOpenFromTime] = useState(false);
    const [openToTime, setOpenToTime] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');

    const fetchDataPitchesName = async () => {
        const response = await adminLoadAllPitches();
        if (response.status === 1) {
            const data = response.data.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setPitchesIDS([
                {
                    label: 'Tất cả sân',
                    value: null,
                },
                ...data,
            ]);
        }
    };

    const sendNotification = async (body, id, imageURL) => {
        try {
            const res = await adminSendNotification('Thông báo từ ADMIN', body, imageURL, id);
            if (res.status === 1) {
                console.log('OK');
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.blackblue,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => {
                return (
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Quản lý đặt sân
                    </Text>
                );
            },
            headerRight: () => {
                return (
                    <TouchableOpacity
                        style={{
                            marginRight: 15,
                        }}
                        onPress={showModalFilter}
                    >
                        <FilterSearch size={26} color="white" />
                    </TouchableOpacity>
                );
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        style={{
                            marginLeft: 15,
                        }}
                    >
                        <Refresh2 size={25} color="white" />
                    </TouchableOpacity>
                );
            },
        });

        fetchDataPitchesName();
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchText]);

    useEffect(() => {
        try {
            const response = async () => {
                const statusBooking = filters[selectedFilter - 1].status;
                const textSearch = searchText ? '&searchText=' + searchText : '';
                console.log(textSearch);
                const response = await adminFilterPitchesBooking('?statusBooking=' + statusBooking + textSearch);
                if (response.status === 1) {
                    setFilteredPitches(response.data);
                } else {
                    setFilteredPitches([]);
                }
            };
            response();
        } catch (error) {
            console.log(error);
        }
    }, [debouncedSearchText, selectedFilter]);

    const handleFilter = async () => {
        const fromDate1 = new Date(fromDate);
        const toDate1 = new Date(toDate);
        fromDate1.setHours(0, 0, 0, 0);
        toDate1.setHours(23, 59, 59, 999);
        const statusBooking = filters[selectedFilter - 1].status;
        try {
            const response = await adminFilterPitchesBooking(
                '?fromDate=' +
                    Math.floor(fromDate1.getTime() / 1000) +
                    '&toDate=' +
                    Math.floor(toDate1.getTime() / 1000) +
                    '&statusBooking=' +
                    statusBooking +
                    '&pitchesID=' +
                    pitchesID +
                    '&searchText=' +
                    searchText,
            );
            if (response.status === 1) {
                setFilteredPitches(response.data);
            } else {
                setFilteredPitches([]);
                console.log(response.message);
            }
            hideModalFilter();
        } catch (error) {
            Alert.alert(error);
            hideModalFilter();
        }
    };

    const handleCancel = async (pitch) => {
        Alert.alert('Đổi trạng thái sân sang ĐÃ HỦY', 'Bạn SURE chưa?', [
            { text: 'Hủy bỏ', style: 'cancel' },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    try {
                        const response = await adminSetStatusPitchesBooking({
                            id: pitch.id,
                            status: 2,
                        });
                        console.log(response);
                        if (response.status === 1) {
                            await sendNotification(
                                'Đã đổi chuyển thái sân ' + pitch.name + ' sang <b>HỦY</b>',
                                pitch.userID,
                                pitch.imageURL,
                            );

                            setSelectedFilter(3);
                        } else {
                            Alert.alert('Thông báo', response.message);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                },
            },
        ]);
    };

    const handleConfirm = (pitch) => {
        Alert.alert('Đổi trạng thái sân sang ĐẶT THÀNH CÔNG', 'Bạn SURE chưa?', [
            { text: 'Hủy bỏ', style: 'cancel' },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    try {
                        const response = await adminSetStatusPitchesBooking({
                            id: pitch.id,
                            status: 1,
                        });
                        console.log(response);
                        if (response.status === 1) {
                            await sendNotification(
                                'Đã đổi chuyển thái sân ' + pitch.name + ' sang <b>ĐÃ ĐẶT THÀNH CÔNG</b>',
                                pitch.userID,
                                pitch.imageURL,
                            );
                            setSelectedFilter(2);
                        } else {
                            Alert.alert('Thông báo', response.message);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                },
            },
        ]);
    };

    const handleDetails = (pitchesBooking) => {
        navigation.navigate('AdminPitchesBookingDetail', { pitchesBooking });
    };

    return (
        <PaperProvider>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModalFilter}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 10,
                        width: '95%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 100,
                    }}
                >
                    <Paragraph
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 18,
                            marginBottom: 20,
                        }}
                    >{`Bộ Lọc Tìm Kiếm`}</Paragraph>
                    <View>
                        <Paragraph
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 13,
                                marginBottom: 10,
                            }}
                        >{`Chọn từ ngày -> đến ngày cần lọc \n (Có thể bỏ trống)`}</Paragraph>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenFromTime(true);
                                }}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Text
                                    style={{
                                        width: 150,
                                        height: 40,
                                        fontSize: 14,
                                        backgroundColor: '#E1E1E1',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        color: '#006B83',
                                    }}
                                >
                                    {fromDate.toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Text>
                            </TouchableOpacity>

                            <ArrowRight size={25} color="black" />

                            <TouchableOpacity
                                onPress={() => {
                                    setOpenToTime(true);
                                }}
                                style={{
                                    height: 40,
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        width: 150,
                                        height: 40,
                                        fontSize: 14,
                                        backgroundColor: '#E1E1E1',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        color: '#006B83',
                                    }}
                                >
                                    {toDate.toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Paragraph
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 13,
                                marginBottom: 10,
                                marginTop: 10,
                            }}
                        >{`Chọn sân mà bạn muốn lọc \n (Có thể bỏ trống)`}</Paragraph>

                        <View
                            style={{
                                borderRadius: 5,
                                height: 40,
                                justifyContent: 'center',
                                alignContent: 'center',
                                borderWidth: 1,
                                borderColor: '#E1E1E1',
                            }}
                        >
                            <Picker
                                selectedValue={pitchesID}
                                onValueChange={(itemValue, itemIndex) => setPitchesID(itemValue)}
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                {pitchesIDS.map((pitch, index) => {
                                    return <Picker.Item label={pitch.label} value={pitch.value} key={index} />;
                                })}
                            </Picker>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: 20,
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <Button
                                style={{ backgroundColor: '#A2A2A2' }}
                                icon={() => {
                                    return <FilterTick size={24} color="black" />;
                                }}
                                onPress={handleFilter}
                            >
                                <Text
                                    style={{
                                        color: '#353535',
                                    }}
                                >
                                    Thực hiện tìm kiếm
                                </Text>
                            </Button>
                        </View>

                        <DatePicker
                            modal
                            title={'Từ ngày'}
                            open={openFromTime}
                            date={fromDate}
                            mode="date"
                            onConfirm={(fromDate) => {
                                setFromDate(fromDate);
                                setOpenFromTime(false);
                            }}
                            onCancel={() => {
                                setOpenFromTime(false);
                            }}
                            locale="vi-VN"
                        />

                        <DatePicker
                            modal
                            title={'Đến ngày'}
                            open={openToTime}
                            date={toDate}
                            mode="date"
                            onConfirm={(toDate) => {
                                setToDate(toDate);
                                setOpenToTime(false);
                            }}
                            onCancel={() => {
                                setOpenToTime(false);
                            }}
                            locale="vi-VN"
                            minimumDate={fromDate}
                        />
                    </View>
                </Modal>
            </Portal>

            <HeaderSearch
                searchText={searchText}
                setSearchText={setSearchText}
                filters={filters}
                setFilters={setFilters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {filteredPitches.length > 0 ? (
                    filteredPitches.map((pitch, index) => (
                        <Card key={pitch.id} style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
                            <View style={styles.imageContainer}>
                                <Card.Cover
                                    source={{
                                        uri: pitch.imageURL,
                                    }}
                                    style={styles.coverImage}
                                />
                                <View style={styles.overlay}>
                                    <Card.Title
                                        title={pitch.fullname}
                                        titleStyle={styles.titleStyle}
                                        left={(props) => (
                                            <Avatar.Icon {...props} icon="account" style={styles.avatarIcon} />
                                        )}
                                        style={styles.cardTitle}
                                    />
                                    <Card.Content style={styles.cardContent}>
                                        <View style={styles.rowContainer}>
                                            <Text style={styles.pitchbookinglable}>Sân đặt: </Text>
                                            <Text style={styles.pitchbooking}>{pitch.name}</Text>
                                        </View>
                                        <View style={styles.rowContainer}>
                                            <Text style={styles.pitchbookinglable}>Ngày đặt:</Text>
                                            <Text style={styles.pitchbooking}>
                                                {formatDateToVND(pitch.timeCreate * 1000)}
                                            </Text>
                                        </View>
                                        <View style={styles.rowContainer}>
                                            <Text style={styles.pitchbookinglable}>Thời gian đặt: </Text>
                                            <Text style={styles.pitchbooking}>
                                                Từ {formatDateTimeToHM(Number(pitch.timeStart * 1000))} -{' '}
                                                {formatDateTimeToHM(Number(pitch.timeEnd * 1000))}
                                            </Text>
                                        </View>
                                    </Card.Content>
                                </View>
                            </View>

                            {pitch.statusBooking === 0 ? (
                                <Fragment></Fragment>
                            ) : filters[selectedFilter - 1].status === 1 ? (
                                <Card.Actions style={styles.iconContainer}>
                                    <Button
                                        style={{ backgroundColor: 'red' }}
                                        icon={() => {
                                            return <Xrp size={16} color="white" />;
                                        }}
                                        onPress={() => {
                                            return handleCancel(pitch);
                                        }}
                                    >
                                        <Text style={{ color: 'white' }}>Hủy</Text>
                                    </Button>
                                    <Button
                                        style={{ marginRight: 25, backgroundColor: 'blue' }}
                                        icon={() => {
                                            return <Information size={16} color="white" />;
                                        }}
                                        onPress={() => {
                                            return handleDetails(pitch);
                                        }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Card.Actions>
                            ) : (
                                <Card.Actions style={styles.iconContainer}>
                                    <Button
                                        style={{ backgroundColor: 'green', width: '100%' }}
                                        icon={() => {
                                            return <TickCircle size={16} color="white" />;
                                        }}
                                        onPress={() => {
                                            return handleConfirm(pitch);
                                        }}
                                    >
                                        <Text style={{ color: 'white' }}>Xác nhận Đặt thành công</Text>
                                    </Button>
                                </Card.Actions>
                            )}
                        </Card>
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
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        marginBottom: 60,
    },
    pickerselect: {
        backgroundColor: '#FCFCFC',
        flex: 1,
        marginRight: 10,
        width: '48%',
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
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    input: {
        width: '48%',
        marginVertical: 10,
    },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderWidth: 1,
        borderColor: '#FCFCFC',
        borderRadius: 5,
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
    },
    imageContainer: {
        position: 'relative',
    },
    coverImage: {
        height: 130,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 10,
    },
    cardTitle: {
        paddingTop: 100,
    },
    titleStyle: {
        color: 'white',
    },
    avatarIcon: {
        backgroundColor: 'transparent',
        marginLeft: 12,
    },
    cardContent: {
        padding: 8,
        borderRadius: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pitchbookinglable: {
        fontSize: 14,
        marginRight: 5,
        color: 'white',
    },
    pitchbooking: {
        fontSize: 14,
        color: 'lightblue',
    },
    iconContainer: {
        justifyContent: 'center',
        width: '100%',
    },
});
