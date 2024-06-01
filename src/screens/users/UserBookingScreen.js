import { ArrowDown, TimerStart } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, Card, IconButton, Paragraph, Snackbar, Text, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { addNewPitchBooking, checkPitchIsConflict, loadPitchesBookingByID } from '../../api/pitch-api';
import { convertDateTimeToVN } from '../../helpers/convertDateTimeToVN';
import { formatDateToVND } from '../../helpers/formatDateToVND';
import { formatPriceToVND } from '../../helpers/formatPriceToVND';
import { getDateTimeVN } from '../../helpers/getDateTime';
import { PitchesBooking } from '../../model/PitchesBooking';

export default function UserBookingScreen({ navigation, route }) {
    const user = useSelector((state) => state.auth.userData);
    const { item } = route.params;
    const [selectedFilter, setSelectedFilter] = useState(1); // này dùng để kiểm tra trạng thái của tab đặt sân và xem khung giờ đã đặt
    const [fromTime, setFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());
    const [openFromTime, setOpenFromTime] = useState(false); // mở modal chọn thời gian bắt đầu
    const [openToTime, setOpenToTime] = useState(false); // mở modal chọn thời gian kết thúc
    const [timeFinal, setTimeFinal] = useState(0); // thời gian cuối dùng để tính tiền - tính dưới dạng giây (ví dụ: 3600 giây là 1 tiếng)
    const [moneyFinal, setMoneyFinal] = useState(0); // tính số tiền tùy theo thời gian đặt
    const [minumumToTime, setMinumumToTime] = useState(new Date()); // thời gian tối thiểu cho người dùng chọn thời gian kết thúc
    const [visible, setVisible] = useState(false); // quản lý hiển thị snackbar
    const [notificationSB, setNotificationSB] = useState(''); // hiển thị thông báo lỗi
    const [pitchesBookingData, setPitchesBookingData] = useState([]); // dữ liệu khung giờ đã đặt [đang dùng để test thôi, chưa dùng đến
    const [loading, setLoading] = useState(true);
    const handleTab = (tab) => {
        setSelectedFilter(tab);
    };

    const handleFromTime = (fromTime) => {
        const newTime = new Date(fromTime.getTime());
        newTime.setHours(fromTime.getHours() + 1); // tự động cộng 1 tiếng cho người dùng lun
        setOpenFromTime(false);
        setFromTime(fromTime);
        setToTime(newTime);
        setTimeFinal((newTime.getTime() - fromTime.getTime()) / 1000);
        setMinumumToTime(newTime);
    };

    const handleToTime = (toTime) => {
        setOpenToTime(false);
        setToTime(toTime);
    };

    const handleAcceptBooking = () => {
        if (timeFinal < 3600) {
            setNotificationSB('Hệ thống chỉ chấp nhận đặt từ 1 tiếng trở lên, vui lòng chọn lại thời gian!');
            setVisible(true);
            return;
        }

        checkPitchIsConflict(item.id, convertDateTimeToVN(fromTime), convertDateTimeToVN(toTime), (result) => {
            if (result.error) {
                console.log(result.error);
                setNotificationSB('Đã xảy ra lỗi, vui lòng thử lại sau!. ' + result.error);
                setVisible(true);
                return;
            }
            if (result.data.length > 0) {
                setNotificationSB('Khung giờ bạn chọn đã bị đặt, vui lòng chọn khung giờ khác!');
                setVisible(true);
                return;
            }

            const pitchBooking = new PitchesBooking(
                getDateTimeVN(),
                convertDateTimeToVN(fromTime),
                convertDateTimeToVN(toTime),
                moneyFinal,
                user,
                'pending',
                item,
            );

            addNewPitchBooking(pitchBooking.toObject(), (result) => {
                if (result.error) {
                    console.log(result.error);
                    setNotificationSB('Đã xảy ra lỗi, vui lòng thử lại sau!. ' + result.error);
                    setVisible(true);
                    return;
                }
                navigation.navigate('UserHistoryScreen');
            });
        });
    };

    useEffect(() => {
        let diff = toTime.getTime() - fromTime.getTime();
        let hours = Math.floor(diff / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (seconds >= 30) {
            minutes++;
        }
        if (minutes < 0) {
            hours--;
            minutes = 60 + minutes;
        }
        if (hours < 0 || minutes < 0) {
            setTimeFinal(0);
        } else {
            setTimeFinal(hours * 3600 + minutes * 60);
        }
    }, [toTime]);

    useEffect(() => {
        setMoneyFinal(item.price * (timeFinal / 3600));
    }, [timeFinal]);

    useEffect(() => {
        loadPitchesBookingByID(item.id, (result) => {
            if (result.error) {
                console.log(result.error);
                return;
            }
            setLoading(false);
            setPitchesBookingData(result.data);
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={{ uri: item.imageURL }}
                    style={{
                        alignSelf: 'center',
                        width: '100%',
                        height: 200,
                        resizeMode: 'cover',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(193, 193, 193, 0.1)',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                    />
                </ImageBackground>

                <View
                    style={{
                        position: 'absolute',
                        top: StatusBar.currentHeight + 5,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
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
                            navigation.goBack();
                        }}
                    >
                        <IconButton icon="arrow-left" size={20} iconColor="white" style={{ width: 20, height: 20 }} />
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
                            Alert.alert('Booking', 'Chia sẽ cho tui đi nào!');
                        }}
                    >
                        <IconButton icon="share" size={20} iconColor="white" style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    marginTop: StatusBar.currentHeight + 120,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: 'white',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    padding: 15,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(193, 193, 193, 0.5)',
                        height: 35,
                        alignItems: 'center',
                        borderRadius: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 20,
                        }}
                        onPress={() => {
                            handleTab(1);
                        }}
                    >
                        <Text style={{ fontSize: 13, marginBottom: 3 }}>Đặt sân</Text>
                        {selectedFilter === 1 && <View style={styles.underline} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 20,
                        }}
                        onPress={() => {
                            handleTab(2);
                        }}
                    >
                        <Text style={{ fontSize: 13, marginBottom: 3 }}>Khung giờ đã được đặt</Text>
                        {selectedFilter === 2 && <View style={styles.underline} />}
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10, marginLeft: 3 }}>
                    {selectedFilter == 1 ? (
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                            >
                                <Text
                                    variant="titleSmall"
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
                                    }}
                                >
                                    Vui lòng chọn khung giờ muốn đặt: {'\n'} (Lưu ý: Hệ thống chỉ chấp nhận đặt từ 1
                                    tiếng trở đi, dưới 1 tiếng sẽ không nhận)
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                    }}
                                    onPress={() => {
                                        setOpenFromTime(true);
                                    }}
                                >
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
                                            fromTime.toLocaleDateString('vi-VN', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }) +
                                            ' - ' +
                                            `${fromTime.getHours().toString().padStart(2, '0')}:${fromTime
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, '0')}`
                                        }
                                        disabled={true}
                                        textColor="#006B83"
                                    />
                                </TouchableOpacity>

                                <ArrowDown
                                    size={20}
                                    color="#006B83"
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        marginRight: 10,
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={() => {
                                        setOpenToTime(true);
                                    }}
                                    style={{
                                        width: '100%',
                                    }}
                                >
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
                                            toTime.toLocaleDateString('vi-VN', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }) +
                                            ' - ' +
                                            `${toTime.getHours().toString().padStart(2, '0')}:${toTime
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, '0')}`
                                        }
                                        disabled={true}
                                        textColor="#006B83"
                                    />
                                </TouchableOpacity>

                                <DatePicker
                                    modal
                                    title={'Chọn khung giờ bắt đầu đá'}
                                    open={openFromTime}
                                    date={fromTime}
                                    mode="datetime"
                                    onConfirm={(fromTime) => {
                                        handleFromTime(fromTime);
                                    }}
                                    onCancel={() => {
                                        setOpenFromTime(false);
                                    }}
                                    locale="vi-VN"
                                    minimumDate={new Date()}
                                />

                                <DatePicker
                                    modal
                                    title={'Chọn khung giờ kết thúc đá'}
                                    open={openToTime}
                                    date={toTime}
                                    mode="datetime"
                                    onConfirm={(toTime) => {
                                        handleToTime(toTime);
                                    }}
                                    onCancel={() => {
                                        setOpenToTime(false);
                                    }}
                                    locale="vi-VN"
                                    minimumDate={minumumToTime}
                                />
                            </View>

                            <Paragraph>
                                Bạn đang đặt <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.name}</Text> với
                                thời gian là: {'\n'}
                                <Paragraph
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}
                                >
                                    {fromTime.toLocaleDateString('vi-VN', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }) +
                                        ' lúc ' +
                                        `${fromTime.getHours().toString().padStart(2, '0')}:${fromTime
                                            .getMinutes()
                                            .toString()
                                            .padStart(2, '0')}`}
                                </Paragraph>
                                {'\n'}
                                đến
                                {'\n'}
                                <Paragraph
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                    }}
                                >
                                    {toTime.toLocaleDateString('vi-VN', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }) +
                                        ' lúc ' +
                                        `${toTime.getHours().toString().padStart(2, '0')}:${toTime
                                            .getMinutes()
                                            .toString()
                                            .padStart(2, '0')}`}
                                </Paragraph>
                                {'\n'}
                                Với tổng thời gian là:
                                {'\n'}
                                <Paragraph
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'blue',
                                    }}
                                >
                                    {`${Math.floor(timeFinal / 3600)} giờ ${Math.floor(
                                        (timeFinal % 3600) / 60,
                                    )} phút - ${formatPriceToVND(moneyFinal)} VNĐ`}
                                </Paragraph>
                            </Paragraph>
                            <Button
                                style={{
                                    marginTop: 20,
                                    backgroundColor: 'green',
                                }}
                                icon="arrow-right"
                                mode="contained"
                                onPress={handleAcceptBooking}
                            >
                                Đặt sân
                            </Button>

                            <Snackbar
                                visible={visible}
                                onDismiss={() => {
                                    setVisible(false);
                                }}
                                action={{ label: 'Tắt' }}
                            >
                                {notificationSB}
                            </Snackbar>
                        </View>
                    ) : (
                        <ScrollView
                            style={{
                                height: '100%',
                                marginBottom: 140,
                                showsVerticalScrollIndicator: false,
                            }}
                        >
                            {!loading
                                ? pitchesBookingData.map((item, index) => {
                                      let today = new Date();
                                      let startDay = new Date(item.timeStart);
                                      if (
                                          startDay.getDate() !== today.getDate() ||
                                          startDay.getMonth() !== today.getMonth() ||
                                          startDay.getFullYear() !== today.getFullYear()
                                      ) {
                                          return null;
                                      }
                                      return (
                                          <Card style={{ marginBottom: 10 }} key={index}>
                                              <Card.Title
                                                  title={
                                                      <Text
                                                          style={{
                                                              fontSize: 13,
                                                          }}
                                                      >
                                                          {item.user.name}
                                                      </Text>
                                                  }
                                                  subtitle={
                                                      <Text style={{ fontSize: 11, color: 'blue' }}>
                                                          {formatPriceToVND(item.pitches.price)}
                                                      </Text>
                                                  }
                                                  left={() => {
                                                      return <TimerStart size={32} color="green" />;
                                                  }}
                                                  right={() => {
                                                      return (
                                                          <Text
                                                              style={{
                                                                  fontSize: 11,
                                                                  width: 170,
                                                                  textAlign: 'center',
                                                                  paddingRight: 5,
                                                              }}
                                                              numberOfLines={6}
                                                          >
                                                              {formatDateToVND(item.timeStart)}
                                                              {'\n'}
                                                              {formatDateToVND(item.timeEnd)}
                                                          </Text>
                                                      );
                                                  }}
                                              />
                                          </Card>
                                      );
                                  })
                                : null}
                        </ScrollView>
                    )}
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
