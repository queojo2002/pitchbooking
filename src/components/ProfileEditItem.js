import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileEditItem = ({ icon, value, editable, onChangeText }) => {
    const [text, setText] = useState(value);

    const handleChangeText = (newValue) => {
        setText(newValue);
        onChangeText(newValue);
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={25} />
            </View>
            <View style={styles.inputContainer}>
                {editable ? (
                    <TextInput style={styles.input} value={text} onChangeText={handleChangeText} />
                ) : (
                    <Text style={styles.value}>{text}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconContainer: {
        marginRight: 10,
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 7,
        borderRadius: 5,
    },
    value: {
        fontSize: 16,
    },
});

export default ProfileEditItem;
