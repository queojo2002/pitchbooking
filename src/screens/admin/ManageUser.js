import { ArrowRight } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { appColor } from '../../constants/appColor';

export default ManagerUser = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        Quản lý người dùng
                    </Text>
                );
            },
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {!loading ? (
                users.map((user, index) => {
                    return (
                        <Card
                            key={index}
                            onPress={() => {
                                alert(index);
                            }}
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            <Card.Title
                                title={<Text style={{ fontSize: 14, fontWeight: 'bold' }}>{user.name}</Text>}
                                subtitle={<Text style={{ fontSize: 14, fontStyle: 'italic' }}>{user.email}</Text>}
                                left={() => {
                                    return (
                                        <Image
                                            style={{
                                                width: 40,
                                                height: 40,
                                            }}
                                            source={{
                                                uri: user.avatar || 'https://www.w3schools.com/howto/img_avatar.png',
                                            }}
                                        />
                                    );
                                }}
                                right={() => {
                                    return (
                                        <View style={{ paddingRight: 10 }}>
                                            <ArrowRight size={30} color="red" />
                                        </View>
                                    );
                                }}
                            />
                        </Card>
                    );
                })
            ) : (
                <ActivityIndicator size="large" color={appColor.blackblue} />
            )}
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginBottom: 50,
    },
});
