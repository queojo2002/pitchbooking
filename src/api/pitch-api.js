import firestore, { doc } from '@react-native-firebase/firestore';

const db = firestore();

export const loadAllPith = (callback) => {
    try {
        return db.collection('pitches').orderBy('name').onSnapshot((snapshot) => {
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



export const addNewPitchBooking = async (pitch, callback) => {
    try {
        const newDocRef = await db.runTransaction(async (transaction) => {
            const newDoc = db.collection('pitchesBooking').doc();
            transaction.set(newDoc, pitch);
            return newDoc;
        });
        callback({ error: null, idDoc: newDocRef.id });
    } catch (error) {
        callback({ error: error.message });
    }
}


export const checkPitchIsConflict = async (timeStart, timeEnd, callback) => {
    try {
        const snapshot = await db.collection('pitchesBooking').get();

        const pitchCollection = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });

        const conflictingPitches = pitchCollection.filter(pitch => {
            return pitch.timeStart < timeEnd && pitch.timeEnd > timeStart;
        });

        callback({ error: null, data: conflictingPitches });
    } catch (error) {
        callback({ error: error.message });
    }
}

export const LoadPitchesBooking = (email, callback) => {
    try {
        return db.collection('pitchesBooking').where('userBooking', '==', email).onSnapshot((snapshot) => {
            const pitchCollection = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            callback({ error: null, data: pitchCollection });
        }, (error) => {
            callback({ error: error.message });
        });
    } catch (error) {
        callback({ error: error.message });
    }
}