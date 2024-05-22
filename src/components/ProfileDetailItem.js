import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default DetailListItem = (props) => {

    const {
        icon = "mail",
        title = "Email",
        subtitle = "ducln339@gmail.com"
    } = props;


    return (
        <TouchableHighlight underlayColor="#606060">
            <View style={styles.container}>
                <Icon name={icon} size={24} style={{ color: "black", marginRight: 20 }} />
                <View style={styles.details}>
                    <Text style={styles.name}>{title}</Text>
                    <Text style={styles.phoneNumber}>{subtitle}</Text>
                </View>
            </View>
        </TouchableHighlight>

    );

}




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
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 3,
    },
    phoneNumber: {
        fontSize: 16,
        color: '#555',
    },
});