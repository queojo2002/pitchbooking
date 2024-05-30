import firestore, { doc } from '@react-native-firebase/firestore';

const db = firestore();

export const loadAllPith = (callback) => {
    try {
        return db
            .collection('pitches')
            .orderBy('name')
            .onSnapshot(
                (snapshot) => {
                    const pitchCollection = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    callback({ error: null, data: pitchCollection, idDoc: doc.id });
                },
                (error) => {
                    callback({ error: error.message });
                },
            );
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
};

export const checkPitchIsConflict = async (id, timeStart, timeEnd, callback) => {
    try {
        const snapshot = await db.collection('pitchesBooking').where('pitches.id', '==', id).get();

        const pitchCollection = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        const conflictingPitches = pitchCollection.filter((pitch) => {
            return pitch.timeStart < timeEnd && pitch.timeEnd > timeStart;
        });

        callback({ error: null, data: conflictingPitches });
    } catch (error) {
        callback({ error: error.message });
    }
};

export const loadPitchesBookingByEmail = (status, email, callback) => {
    try {
        return db
            .collection('pitchesBooking')
            .where('user.email', '==', email)
            .where('statusBooking', '==', status)
            .onSnapshot(
                (snapshot) => {
                    const pitchCollection = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    callback({ error: null, data: pitchCollection });
                },
                (error) => {
                    callback({ error: error.message });
                },
            );
    } catch (error) {
        callback({ error: error.message });
    }
};

export const loadPitchesBookingByID = (id, callback) => {
    try {
        return db
            .collection('pitchesBooking')
            .where('pitches.id', '==', id)
            .onSnapshot(
                (snapshot) => {
                    const pitchCollection = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    callback({ error: null, data: pitchCollection });
                },
                (error) => {
                    callback({ error: error.message });
                },
            );
    } catch (error) {
        callback({ error: error.message });
    }
};

export const loadPitchesBookingAll = (status, callback) => {
    try {
        return db
            .collection('pitchesBooking')
            .where('statusBooking', '==', status)
            .onSnapshot(
                (snapshot) => {
                    const pitchCollection = snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    });
                    callback({ error: null, data: pitchCollection });
                },
                (error) => {
                    callback({ error: error.message });
                },
            );
    } catch (error) {
        callback({ error: error.message });
    }
};
