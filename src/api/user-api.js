import firestore, { doc } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = firestore();

export const loadAllUsers = (callback) => {
    try {
        return db
            .collection('users')
            .where('email', '!=', auth().currentUser.email)
            .onSnapshot(
                (snapshot) => {
                    const userCollection = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    callback({ error: null, data: userCollection });
                },
                (error) => {
                    callback({ error: error.message });
                },
            );
    } catch (error) {
        callback({ error: error.message });
    }
};

/* 
export const loadAllUsers = async () => {
    try {
        const snapshot = await db.collection('users').where('email', '!=', auth().currentUser.email).get();

        const userCollection = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        return { error: null, data: userCollection };
    } catch (error) {
        return { error: error.message };
    }
}; */
export const loadUser = async () => {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('Bạn chưa đang nhập vào hệ thống.');
        }
        const snapshot = await db.collection('users').where('email', '==', currentUser.email).get();
        if (snapshot.empty) {
            throw new Error('Email của bạn không tồn tại trong hệ thống.');
        }
        return snapshot.docs[0].data();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const subscribeToUser = (callback) => {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            throw new Error('Bạn chưa đang nhập vào hệ thống.');
        }
        return db
            .collection('users')
            .where('email', '==', currentUser.email)
            .onSnapshot(
                (snapshot) => {
                    if (snapshot.empty) {
                        callback({ error: 'Email của bạn không tồn tại trong hệ thống.' });
                    } else {
                        callback({
                            error: null,
                            data: snapshot.docs[0].data(),
                            emailVerified: currentUser.emailVerified,
                        });
                    }
                },
                (error) => {
                    callback({ error: error.message });
                },
            );
    } catch (error) {
        throw new Error('Bạn chưa đang nhập vào hệ thống.');
    }
};
