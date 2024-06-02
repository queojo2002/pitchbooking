import firestore from '@react-native-firebase/firestore';
import { axiosApis } from '.';

const db = firestore();

export const loadAllPith = async () => {
    try {
        const load = await axiosApis.get('/pitchesApi.php');
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(userUpdate.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const addNewPitchesBooking = async (data) => {
    try {
        const load = await axiosApis.post('/pitchesBookingApi.php', data);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(userUpdate.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const loadPitchesBookingByID = async (id) => {
    try {
        const load = await axiosApis.get(`/pitchesBookingApi.php?cmd=getPitchesBookingByID&id=${id}`);
        console.log(load.data);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(userUpdate.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const loadPitchesBookingByEmail = async () => {
    try {
        const load = await axiosApis.get(`/pitchesBookingApi.php?cmd=getPitchesBookingByUserID`);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(userUpdate.data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};
