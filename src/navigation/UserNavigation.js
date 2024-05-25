import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserBookingScreen, UserHomeScreen, UserNotificationScreen } from '../screens';
import UserBottomNavigation from './UserBottomNavigation';
import { appColor } from '../constants/appColor';
import { IconButton, Menu, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';


const Stack = createNativeStackNavigator();

const UserNavigation = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Stack.Navigator
            initialRouteName='UserBottomNavigation'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="UserBottomNavigation" component={UserBottomNavigation} />
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
            <Stack.Screen
                name="UserNotificationScreen"
                component={UserNotificationScreen}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: appColor.blackblue },
                    headerTintColor: '#fff',
                    headerTitle: 'Notification',
                    headerRight: () => (
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={<IconButton icon="menu" iconColor="#fff" onPress={openMenu} />}
                            contentStyle={styles.menu}
                        >
                            <Menu.Item
                                onPress={() => {}}
                                title="Mark all read"
                                leadingIcon="check"
                                style={styles.menuItem}
                                titleStyle={styles.menuItemText}
                                iconColor={appColor.darkGray}

                            />
                            <View style={styles.line}></View>
                            <Menu.Item
                                onPress={() => {}}
                                title="Remove all"
                                leadingIcon="delete-outline"
                                style={styles.menuItem}
                                titleStyle={styles.menuItemText}
                                iconColor={appColor.darkGray}
                            />
                        </Menu>
                    ),
                }}
            />
            <Stack.Screen name="UserBookingScreen" component={UserBookingScreen} />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    menu: {
        backgroundColor: '#E0E0E0',
        height:"90%",
        justifyContent:"center"
    },
    menuItem: {
        paddingHorizontal: 10,
    },
    menuItemText: {
        fontSize: 16,
        color: appColor.darkGray,
    },
    line: {
        borderBottomWidth: 0.5,
      },
});

export default UserNavigation;
