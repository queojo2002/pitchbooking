// ProfileEditItem.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileEditItem = ({ icon, title, editable, value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <Icon name={icon} size={24} style={{ color: "black", marginRight: 20 }} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {editable ? (
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={onChangeText}
                    />
                ) : (
                    <Text style={styles.value}>{value}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 10,
        marginVertical: 5,
        borderColor: 'black',
        borderBottomWidth: 1,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 16,
        paddingVertical: 5,
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
});

export default ProfileEditItem;
