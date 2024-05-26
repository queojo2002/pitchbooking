import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { appColor } from '../../constants/appColor';


const data = [
    {
        id: '001',
        title: '@@@@',
        img: 'https://reactnative.dev/img/tiny_logo.png',
        username: 'David',
        notification: 'sent a photo, please check your message',
        time: 'May 23, 2024 at 10:53:19 PM UTC+7',
    },
    {
        id: '002',
        title: '@@@@',
        img: 'https://reactnative.dev/img/tiny_logo.png',
        username: 'Tom',
        notification: 'ashud usdh dhasd asdhaj sjd ashdj sj ajsd adj jnđs djasđ án nlsdaj',
        time: 'May 18, 2024 at 08:30:00 AM UTC+7',
    },
];

export default UserNotificationScreen = ({ navigation }) => {


    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: appColor.blackblue },
            headerTintColor: '#fff',
            headerTitle: 'Thông báo',
            headerRight: () => (
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<IconButton icon="menu" iconColor="#fff" onPress={openMenu} />}
                    contentStyle={styles.menu}
                >
                    <Menu.Item
                        onPress={() => { }}
                        title="Mark all read"
                        leadingIcon="check"
                        style={styles.menuItem}
                        titleStyle={styles.menuItemText}
                        iconColor={appColor.darkGray}

                    />
                    <View style={styles.line}></View>
                    <Menu.Item
                        onPress={() => { }}
                        title="Remove all"
                        leadingIcon="delete-outline"
                        style={styles.menuItem}
                        titleStyle={styles.menuItemText}
                        iconColor={appColor.darkGray}
                    />
                </Menu>
            ),
        });
    })

    formatTimeDifference = (timestamp) => {
        const formattedTimeString = timestamp.replace('at ', '');
        const time = moment.utc(formattedTimeString, 'MMMM DD, YYYY hh:mm:ss A Z');
        const now = moment();
        const diffMinutes = now.diff(time, 'minutes');
        const diffHours = now.diff(time, 'hours');
        const diffDays = now.diff(time, 'days');

        if (diffMinutes < 60) {
            return `${diffMinutes} phút trước`;
        } else if (diffHours < 24) {
            return `${diffHours} giờ trước`;
        } else if (diffDays < 7) {
            return `${diffDays} ngày trước`;
        } else {
            return time.format('DD MMM, YYYY');
        }
    }



    return (
        <View style={{ flex: 1, backgroundColor: appColor.blackblue }}>
            {data.length === 0 ? (
                <View style={styles.noNotificationContainer}>
                    <Image
                        source={require('../../assets/no_notification.png')}
                        style={styles.noNotificationImage}
                    />
                    <Text style={styles.noNotificationText}>No Notification</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Image style={styles.headerLeftImg} source={{ uri: item.img }} />
                            <View style={styles.contentContainer}>
                                <View style={styles.userInfoContainer}>
                                    <Text style={styles.usernameText}>{item.username}</Text>
                                    <Text style={styles.timeText}>{this.formatTimeDifference(item.time)}</Text>
                                </View>
                                <Text style={styles.notificationText}>{item.notification}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: appColor.blackblue,
    },
    headerLeftImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
    contentContainer: {
        flex: 1,
        marginLeft: 10,
    },
    userInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    usernameText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold',
    },
    timeText: {
        color: "#fff",
        fontSize: 15,
    },
    notificationText: {
        color: "#fff",
        fontWeight: 'normal',
        fontSize: 15,
        marginTop: 5,
    },
    noNotificationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotificationImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    noNotificationText: {
        fontSize: 20,
        color: '#fff',
    },
});
