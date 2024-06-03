import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { appColor } from '../../constants/appColor';
import { Card, Avatar, Button, Menu, Provider, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
export default ManagePitchesScreen = ({ navigation }) => {
    const [pitches, setPitches] = useState([]);
    const [filteredPitches, setFilteredPitches] = useState([]);
    const [selectedPitch, setSelectedPitch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const mockPitches = [
        {
            id: '1',
            name: 'Sân A',
            user: 'Anh Tú',
            status: '0',
            date: '2024-06-03',
            startTime: '16:30',
            endTime: '18:00',
            imageURL: require('../../assets/background1.jpg'),
        },
        {
            id: '2',
            name: 'Sân B',
            user: 'Văn Đức',
            status: '0',
            date: '2024-06-04',
            startTime: '17:00',
            endTime: '18:30',
            imageURL: require('../../assets/background2.jpg'),
        },
        {
            id: '3',
            name: 'Sân C',
            user: 'Phúc Hiếu',
            status: '1',
            date: '2024-06-05',
            startTime: '18:00',
            endTime: '19:30',
            imageURL: require('../../assets/background3.jpg'),
        },
    ];

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
        });

        setPitches(mockPitches);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [selectedPitch, selectedStatus, startDate, endDate]);

    const applyFilters = () => {
        let filtered = pitches;

        if (selectedPitch) {
            filtered = filtered.filter((pitch) => pitch.name === selectedPitch);
        }

        setFilteredPitches(filtered);
        console.log(filtered);
    };

    const handleCancel = () => {
        console.log('Đã hủy');
    };

    const handleConfirm = () => {
        console.log('Đã xác nhận');
    };

    const handleStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    const handleEndDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

    return (
        <Provider>
            <ScrollView style={styles.container}>
                <View style={styles.filterContainer}>
                    <Picker
                        selectedValue={selectedPitch}
                        onValueChange={(itemValue, itemIndex) => setSelectedPitch(itemValue)}
                        style={styles.pickerselect}
                       
                    >
                        {mockPitches.map((pitch) => (
                            <Picker.Item key={pitch.id} label={pitch.name} value={pitch.name} />
                        ))}
                    </Picker>
                    <View style={{ width: 200 }}>
                        <Picker
                            selectedValue={selectedStatus}
                            onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
                            style={{
                                backgroundColor: '#FCFCFC',
                                flex: 1,
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
                            }}
                        >
                            <Picker.Item label="Chưa thanh toán" value="0" />
                            <Picker.Item label="Đã thanh toán" value="1" />
                        </Picker>
                    </View>
                    <View style={styles.datePickerContainer}>
                        <Button
                            icon={({ size, color }) => (
                                <MaterialCommunityIcons name="calendar" size={size} color="blue" />
                            )}
                            onPress={() => setShowStartDatePicker(true)}
                        >
                            Từ ngày
                        </Button>
                        {startDate && <Text>{startDate.toDateString()}</Text>}
                    </View>
                    <View style={styles.datePickerContainer}>
                        <Button
                            icon={({ size, color }) => (
                                <MaterialCommunityIcons name="calendar" size={size} color="blue" />
                            )}
                            onPress={() => setShowEndDatePicker(true)}
                        >
                            Đến ngày
                        </Button>

                        {endDate && <Text>{endDate.toDateString()}</Text>}
                    </View>
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleStartDateChange}
                        />
                    )}
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleEndDateChange}
                        />
                    )}
                </View>
                {filteredPitches.map((pitch) => (
                    <Card key={pitch.id} style={{ width: '90%', margin: 10 }}>
                        <View style={styles.imageContainer}>
                            <Card.Cover source={pitch.imageURL} style={styles.coverImage} />
                            <View style={styles.overlay}>
                                <Card.Title
                                    title={pitch.user}
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
                                        <Text style={styles.pitchbookinglable}>Ngày đặt: </Text>
                                        <Text style={styles.pitchbooking}>{pitch.date}</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.pitchbookinglable}>Thời gian đặt: </Text>
                                        <Text style={styles.pitchbooking}>
                                            Từ {pitch.startTime} - {pitch.endTime}{' '}
                                        </Text>
                                    </View>
                                </Card.Content>
                            </View>
                        </View>
                        <Card.Actions style={styles.iconContainer}>
                            <Button
                                icon={({ size, color }) => (
                                    <MaterialCommunityIcons name="cancel" size={size} color="red" />
                                )}
                                onPress={handleCancel}
                            >
                                Hủy
                            </Button>
                            <Button
                                style={{ marginRight: 30, backgroundColor: 'green' }}
                                icon={({ size, color }) => (
                                    <MaterialCommunityIcons name="check" size={size} color="white" />
                                )}
                                onPress={handleConfirm}
                            >
                                Xác nhận
                            </Button>
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    pickerselect:{
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
        margin: 10,
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
        fontSize: 16,
        marginRight: 5,
        color: 'white',
    },
    pitchbooking: {
        fontSize: 16,
        color: 'lightblue',
    },
    iconContainer: {
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
});
