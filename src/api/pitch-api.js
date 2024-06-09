import { axiosApis } from '.';

///////////////////////// user //////////////////////////
export const loadAllPith = async () => {
    try {
        const load = await axiosApis.get('/pitchesApi.php');
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
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
            throw new Error(load.message);
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
            throw new Error(load.message);
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
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const checkIsBooking = async (id) => {
    try {
        const load = await axiosApis.get(`/vnpay_callback_pitchesbooking.php?pitchesBookingID=${id}`);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

///////////////////////// admin //////////////////////////

export const adminAddNewPitches = async (data) => {
    try {
        const load = await axiosApis.post('/admin/pitchesApi.php', data);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const adminLoadAllPitches = async () => {
    try {
        const load = await axiosApis.get('/admin/pitchesApi.php');
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const adminLoadPitchesByID = async (id) => {
    try {
        const load = await axiosApis.get(`/admin/pitchesApi.php?id=${id}`);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const adminUpdatePitches = async (data) => {
    try {
        const load = await axiosApis.put('/admin/pitchesApi.php', data);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const adminFilterPitchesBooking = async (data) => {
    try {
        const load = await axiosApis.get(`/admin/pitchesBookingApi.php${data}`);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const adminSetStatusPitchesBooking = async (data) => {
    try {
        const load = await axiosApis.put('/admin/pitchesBookingApi.php', data);
        if (load.status === 200) {
            return load.data;
        } else {
            throw new Error(load.message);
        }
    } catch (error) {
        throw new Error(error);
    }
};
