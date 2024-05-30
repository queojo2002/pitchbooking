import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appColor } from '../../constants/appColor';

export default ManagePitchesScreen = ({ navigation }) => {
    const [pitches, setPitches] = useState([]);

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
    });

    return (
        <View style={styles.container}>
            <Text>TransactionScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
