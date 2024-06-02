import firestore from '@react-native-firebase/firestore';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
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

                        // dòng này có nghĩa là:
                        // chỉ lấy các tin nhận có người gửi là user hiện tại và người nhận là item.email
                        // hoặc ngược lại, người gửi là item.email và người nhận là user hiện tại
                    );
                setMessages(list);
            });
        return () => unsubscribe();
    }, [item.email, user.email]);

    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessage) => onSend(newMessage)}
            user={{
                _id: user.email,
                name: user.fullname,
                avatar: user.imageURL,
            }}
        />
    );
};

export default ChatScreen;
