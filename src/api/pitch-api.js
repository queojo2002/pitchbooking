import firestore, { doc } from '@react-native-firebase/firestore';

const db = firestore();

export const loadAllPith = (callback) => {
    try {
        return db.collection('pitches').onSnapshot((snapshot) => {
            const pitchCollection = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            
            });
            callback({ error: null, data: pitchCollection, idDoc: doc.id });
        }, (error) => {
            callback({ error: error.message });
        });
    } catch (error) {
        callback({ error: error.message });
    }
};
