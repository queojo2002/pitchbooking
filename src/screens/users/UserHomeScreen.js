import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserHomeScreen extends Component {
    render() {
        return (
            <View style={{marginTop: 30, marginLeft: 10}}>
                <Text>Welcome to the Home Screen!</Text>
            </View>
        );
    }
}

export default UserHomeScreen;