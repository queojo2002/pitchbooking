// UserChatScreen.js

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

class UserChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [
                { id: 1, name: 'Admin 1' },
                { id: 2, name: 'Admin 2' },
                // Thêm các thông tin về các admin khác nếu cần
            ],
        };
    }

    handleAdminPress = (admin) => {
        // Chuyển hướng đến màn hình chat giữa người dùng và admin được chọn
        this.props.navigation.navigate('ChatScreen', { admin: admin });
    };

    renderAdminItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.adminItem} onPress={() => this.handleAdminPress(item)}>
                <Text style={styles.adminName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        const { admins } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Chọn admin để chat</Text>
                <FlatList
                    data={admins}
                    renderItem={this.renderAdminItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    adminItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    adminName: {
        fontSize: 16,
    },
});

export default UserChatScreen;
