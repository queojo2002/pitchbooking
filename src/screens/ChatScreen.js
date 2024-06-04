import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native';
import { appColor } from '../constants/appColor';

const ChatScreen = ({ navigation, route }) => {
    const { item } = route.params;
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.auth.userData);

    const onSend = useCallback(
        (newMessage = []) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
            firestore()
                .collection('messages')
                .add({
                    _id: newMessage[0]._id,
                    text: newMessage[0].text,
                    createdAt: newMessage[0].createdAt,
                    recipient: item.email,
                    user: {
                        _id: user.email,
                        avatar: user.imageURL,
                        name: user.fullname,
                    },
                });
        },
        [item.email, user.email, user.fullname, user.imageURL],
    );

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: appColor.blackblue },
            headerTintColor: '#fff',
            headerTitle: item.fullname,
        });
    }, [item.fullname, navigation]);

    useLayoutEffect(() => {
        const unsubscribe = firestore()
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const list = snapshot.docs
                    .map((doc) => ({
                        _id: doc.data()._id,
                        text: doc.data().text,
                        createdAt: doc.data().createdAt.toDate(),
                        recipient: doc.data().recipient,
                        user: {
                            _id: doc.data().user._id,
                            name: doc.data().user.name,
                            avatar: doc.data().user.avatar,
                        },
                    }))
                    .filter(
                        (msg) =>
                            (msg.user._id === user.email && msg.recipient === item.email) ||
                            (msg.user._id === item.email && msg.recipient === user.email),
                    );
                setMessages(list);
            });
        return () => unsubscribe();
    }, [item.email, user.email]);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#0000FF', // Màu nền của tin nhắn bên phải
                    },
                    left: {
                        backgroundColor: '#cccccc', // Màu nền của tin nhắn bên trái
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff', // Màu chữ của tin nhắn bên phải
                    },
                    left: {
                        color: '#000', // Màu chữ của tin nhắn bên trái
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <MaterialCommunityIcons name="send-circle" size={32} color="#0000FF" />
                </View>
            </Send>
        );
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessage) => onSend(newMessage)}
            user={{
                _id: user.email,
                name: user.fullname,
                avatar: user.imageURL,
            }}
            renderBubble={renderBubble}
            renderSend={renderSend}
            placeholder="Nhập tin nhắn..."
            alwaysShowSend
            renderAvatarOnTop
            containerStyle={styles.chatContainer}
        />
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        backgroundColor: '#F0F0F0', 
        backgrou: 'green',
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 5,
    },
});

export default ChatScreen;
