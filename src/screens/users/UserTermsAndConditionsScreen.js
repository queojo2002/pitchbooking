
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserTermsAndConditionsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Điều khoản và Quy định</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default UserTermsAndConditionsScreen;
