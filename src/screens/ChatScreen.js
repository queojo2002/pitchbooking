import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({ route }) => {
    const { admin } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = auth().currentUser;
            if (user) {
                setCurrentUser(user);
                console.log(user);
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser && admin) {
            const conversationId = `${currentUser.uid}_${admin.id}`;
            const messagesRef = firestore().collection('messages').where('conversationId', '==', conversationId);
            const unsubscribe = messagesRef.onSnapshot(querySnapshot => {
                const fetchedMessages = [];
                querySnapshot.forEach(doc => {
                    fetchedMessages.push(doc.data());
                });
                setMessages(fetchedMessages);
            });
    
            return () => unsubscribe();
        }
    }, [currentUser, admin]);
    

    const sendMessage = () => {
        if (newMessage.trim()) {
            firestore()
                .collection('messages')
                .add({
                    senderId: currentUser.uid,
                    receiverId: admin.id,
                    content: newMessage,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    conversationId: `${currentUser.uid}_${admin.id}`,
                })
                .then(() => {
                    setNewMessage('');
                })
                .catch(error => {
                    console.error('Error sending message: ', error);
                });
        }
    };

    const renderMessageItem = ({ item }) => (
        <View style={styles.messageItem}>
            <Text style={styles.messageText}>
                {item.senderId === currentUser.uid ? 'You' : admin.name}: {item.content}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Nhập tin nhắn của bạn..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    messageItem: {
        marginBottom: 10,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChatScreen;
