import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    UserHistoryScreen,
    UserHomeScreen,
    UserChatScreen,
    UserProfileScreen
} from '../screens';

const Tab = createBottomTabNavigator();

export default function UserBottomNavigation({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            screenOptions={() => ({
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    borderRadius: 5,
                    height: 60,
                },
                tabBarItemStyle: {
                    marginBottom: 5,
                    paddingTop: 5
                },
                tabBarActiveTintColor: "#0071ff",
                tabBarInactiveTintColor: "gray",
            })}
            barStyle={{
                backgroundColor: 'white',
            }}
        >
            <Tab.Screen
                name="Home"
                component={UserHomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserHistoryScreen"
                component={UserHistoryScreen}
                options={{
                    tabBarLabel: 'Lịch sử đặt',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="history" color={color} size={26} />
                    ),
                }}
            />
             <Tab.Screen
                name="UserChatScreen"
                component={UserChatScreen}
                options={{
                    tabBarLabel: 'Thông báo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{
                    tabBarLabel: 'Cá nhân',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
           
        </Tab.Navigator>
    )
}