import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen,SettingsScreen,AdminChatScreen, ManagePitchesScreen 
} from '../screens';


const Tab = createBottomTabNavigator();

export default function AdminBottomNavigation({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            screenOptions={({ route }) => ({
                headerStyle: {
                    height: 50,
                },
                headerTitleAlign: 'center',
                headerRight: () => {},
                headerTitle: () => {
                    return (
                        <View
                            style={{
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                alignContent: 'center',
                            }}
                        >
                            <Text>{route.name}</Text>
                        </View>
                    );
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    height: 60,
                },
                tabBarItemStyle: {
                    marginBottom: 5,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: '#0071ff',
                tabBarInactiveTintColor: 'gray',
            })}
            barStyle={{
                backgroundColor: 'white',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={ManagePitchesScreen}
                options={{
                    tabBarLabel: 'Quản lý đặt sân',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bank" color={color} size={26} />,
                }}
            />
            {/* <Tab.Screen
                name="ManagerUser"
                component={ManagerUser}
                options={{
                    tabBarLabel: 'Quản lý người dùng',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
                }}
            /> */}
             <Tab.Screen
                name="AdminChatScreen"
                component={AdminChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="application-cog" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
