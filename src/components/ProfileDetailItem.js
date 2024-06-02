import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailListItem = (props) => {
    const { title = 'Email', subtitle = 'ducln339@gmail.com', editable, onChangeText, icon } = props;
    const [text, setText] = useState(subtitle);

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
        padding: 5,
        borderRadius: 5,
    },
    value: {
        fontSize: 16,
    },
});

export default DetailListItem;
