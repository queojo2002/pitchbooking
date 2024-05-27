import { ArrowDown } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { IconButton, Text, TextInput } from 'react-native-paper';


export default function UserBookingScreen({ navigation, route }) {

    const { item } = route.params;
    const [selectedFilter, setSelectedFilter] = useState(1);
    const [fromTime, setFromTime] = useState(new Date())
    const [toTime, setToTime] = useState(new Date())
    const [openFromTime, setOpenFromTime] = useState(false)
    const [openToTime, setOpenToTime] = useState(false)



    const handleTab = (tab) => {
        setSelectedFilter(tab);
    };



    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1 }} >
                <ImageBackground
                    source={{ uri: item.imageURL }}
                    style={{
                        alignSelf: 'center',
                        width: '100%',
                        height: 200,
                        resizeMode: "cover"
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgba(193, 193, 193, 0.1)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }} />
                </ImageBackground>

                <View style={{
                    position: 'absolute',
                    top: StatusBar.currentHeight + 5,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                    <TouchableOpacity
                        style={{
                            left: 10,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'transparent',
                            backgroundColor: 'rgba(193, 193, 193, 0.5)',
                            shadowColor: '#2D2D2D',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 50,
                        }}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <IconButton icon="arrow-left" size={20} iconColor='white' style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            right: 10,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'transparent',
                            backgroundColor: 'rgba(193, 193, 193, 0.5)',
                            shadowColor: '#2D2D2D',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 50,
                        }}
                        onPress={() => {
                            Alert.alert('Booking', 'Chia sẽ cho tui đi nào!')
                        }}>
                        <IconButton icon="share" size={20} iconColor='white' style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flex: 1,
                marginTop: StatusBar.currentHeight + 150,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: "white",
                position: 'absolute',
                width: '100%',
                height: '100%',
                padding: 15
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(193, 193, 193, 0.5)',
                    height: 35,
                    alignItems: 'center',
                    borderRadius: 30,
                }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 20
                        }}
                        onPress={() => {
                            handleTab(1);
                        }}>
                        <Text style={{ fontSize: 13, marginBottom: 3 }}>Đặt sân</Text>
                        {selectedFilter === 1 && <View style={styles.underline} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 20
                        }}
                        onPress={() => {
                            handleTab(2);
                        }}>
                        <Text style={{ fontSize: 13, marginBottom: 3 }}>Khung giờ đã được đặt</Text>
                        {selectedFilter === 2 && <View style={styles.underline} />}
                    </TouchableOpacity>


                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10, marginLeft: 3 }}>
                    {selectedFilter == 1 ? (
                        <View>


                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                                margin: 10
                            }}>
                                <Text variant="titleSmall"
                                    style={{
                                        paddingBottom: 2,
                                        fontSize: 15,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                        width: '100%',
                                        textAlign: 'center',
                                        paddingBottom: 10,
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto-Bold',
                                    }}>Vui lòng chọn khung giờ muốn đặt: </Text>

                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                    }}
                                    onPress={() => {
                                        setOpenFromTime(true)
                                    }}>
                                    <TextInput
                                        style={{
                                            height: 40,
                                            fontSize: 14,
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#E1E1E1',
                                            fontWeight: 'bold',

                                        }}
                                        value={
                                            fromTime.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' - ' +
                                            `${fromTime.getHours().toString().padStart(2, '0')}:${fromTime.getMinutes().toString().padStart(2, '0')}`}
                                        disabled={true}
                                        textColor='#006B83'
                                    />
                                </TouchableOpacity>

                                <ArrowDown size={20} color='#006B83' style={{
                                    marginTop: 10,
                                    marginLeft: 10,
                                    marginRight: 10
                                }} />

                                <TouchableOpacity
                                    onPress={() => {
                                        setOpenToTime(true)
                                    }}
                                    style={{
                                        width: '100%',
                                    }}>
                                    <TextInput
                                        style={{
                                            height: 40,
                                            fontSize: 14,
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#E1E1E1',
                                            fontWeight: 'bold',

                                        }}
                                        value={
                                            toTime.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' - ' +
                                            `${toTime.getHours().toString().padStart(2, '0')}:${toTime.getMinutes().toString().padStart(2, '0')}`
                                        }
                                        disabled={true}
                                        textColor='#006B83'
                                    />
                                </TouchableOpacity>


                                <DatePicker
                                    modal
                                    title={"Chọn khung giờ bắt đầu đá"}
                                    open={openFromTime}
                                    date={fromTime}
                                    mode="datetime"
                                    onConfirm={(fromTime) => {
                                        setOpenFromTime(false)
                                        setFromTime(fromTime)
                                    }}
                                    onCancel={() => {
                                        setOpenFromTime(false)
                                    }}
                                    locale='vi-VN'
                                />


                                <DatePicker
                                    modal
                                    title={"Chọn khung giờ kết thúc đá"}
                                    open={openToTime}
                                    date={toTime}
                                    mode="datetime"
                                    onConfirm={(toTime) => {
                                        setOpenToTime(false)
                                        setToTime(toTime)
                                    }}
                                    onCancel={() => {
                                        setOpenToTime(false)
                                    }}
                                    locale='vi-VN'
                                    minimumDate={fromTime}
                                />
                            </View>


                        </View>

                    ) : (
                        <Text>Khung giờ đã được đặt</Text>
                    )

                    }

                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    underline: {
        width: 40,
        height: 2,
        backgroundColor: 'green',
        alignItems: 'stretch',
        alignItems: 'center',
    },
});