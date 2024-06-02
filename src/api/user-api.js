import firestore, { doc } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { axiosApis } from '.';

const db = firestore();

export const loadUser = async () => {
    try {
        const user = await axiosApis.get('/userApi.php');
        if (user.status === 200 && user.data) {
            return user.data;
        } else {
            throw new Error('Không thể lấy dữ liệu người dùng.');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (user) => {
    try {
        const userUpdate = await axiosApis.post('/userApi.php', user);
        if (userUpdate.status === 200) {
            if (userUpdate.data.status === 1) {
                return userUpdate.data;
            } else {
                throw new Error(userUpdate.data.message);
            }
        } else {
            throw new Error('Không thể cập nhật người dùng.');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
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
