import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ProfileEditItem = ({title, editable, value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}<Text style={styles.required}>*</Text></Text>
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
        paddingVertical: 5,
        marginVertical: 5,
        borderColor: 'black',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color:"black",
    },
    input: {
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    required: {
        color: 'red',
    },
});

export default ProfileEditItem;
