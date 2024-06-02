import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default DetailListItem = (props) => {
    const { title = 'Email', subtitle = 'ducln339@gmail.com' } = props;

    return (
        <TouchableHighlight underlayColor="#606060">
            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.name}>
                        {title}
                        <Text style={styles.required}>*</Text>
                    </Text>
                    <Text style={styles.phoneNumber}>{subtitle}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginVertical: 5,
        borderBottomColor: '#dcdcdc',
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    phoneNumber: {
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        color: 'gray',
    },
    required: {
        color: 'red',
    },
});
